import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axios from 'axios';
import { server } from "../Routes/server";
import Loader from "../components/Loader";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortType, setSortType] = useState('name');
    const [filterType, setFilterType] = useState('All Products');
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const url = `${server}/api/products`;
        axios.get(url)
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);
                setLoading(false);

                const uniqueCategories = [...new Set(response.data.map(product => product.categories))];
                setCategories(['All Products', ...uniqueCategories]);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let filtered = products;

        if (filterType !== 'All Products') {
            filtered = filtered.filter(product => product.categories.includes(filterType));
        }

        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [filterType, searchQuery, products]);

    const sortProducts = (products, sortType) => {
        return [...products].sort((a, b) => {
            const nameA = a.name || '';
            const nameB = b.name || '';
            if (sortType === 'name') {
                return nameA.localeCompare(nameB);
            } else if (sortType === 'price') {
                return a.price - b.price;
            }
            return 0;
        });
    };

    const sortedProducts = sortProducts(filteredProducts, sortType);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="container min-h-screen mx-auto px-4">
            <h1 className="text-3xl font-semibold my-8 text-center">All Products</h1>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-teal-950 rounded-xl p-2 mb-2 md:mb-0 md:mr-4 w-full md:w-1/3"
                />
                <div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="border border-teal-950 rounded-xl p-2 mb-2 md:mb-0 md:mr-4 w-full md:w-auto"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="border border-teal-950 rounded-xl p-2 w-full md:w-auto"
                    >
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                {Array.from({ length: Math.ceil(sortedProducts.length / productsPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className="mx-1 py-2 px-4 border rounded hover:bg-gray-200"
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Products;
