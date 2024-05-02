import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortType, setSortType] = useState('name');
    const [filterType, setFilterType] = useState('All Products');
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);

    useEffect(() => {
        const sampleProducts = [
            { id: 1, name: "Product 1", price: 10, category: "electronics" },
            { id: 2, name: "Product 2", price: 20, category: "clothing" },
            { id: 3, name: "Product 3", price: 30, category: "electronics" },
            { id: 4, name: "Product 4", price: 15, category: "clothing" },
            { id: 5, name: "Product 4", price: 15, category: "Sneakers" },
            { id: 6, name: "Product 5", price: 25, category: "electronics" },
            { id: 7, name: "Product 6", price: 75, category: "SmartPhone" },
            { id: 8, name: "Product 7", price: 40, category: "electronics" },
            { id: 9, name: "Product 8", price: 50, category: "clothing" },
            { id: 10, name: "Product 9", price: 60, category: "electronics" },
            { id: 11, name: "Product 10", price: 70, category: "clothing" },
            { id: 12, name: "Product 11", price: 80, category: "Sneakers" },
            { id: 13, name: "Product 12", price: 90, category: "electronics" },
            { id: 14, name: "Product 13", price: 100, category: "SmartPhone" },
            { id: 15, name: "Product 14", price: 110, category: "electronics" },
            { id: 16, name: "Product 15", price: 120, category: "clothing" },
            { id: 17, name: "Product 16", price: 130, category: "electronics" },
            { id: 18, name: "Product 17", price: 140, category: "clothing" },
            { id: 19, name: "Product 18", price: 150, category: "Sneakers" },
            { id: 20, name: "Product 19", price: 160, category: "electronics" },
            { id: 21, name: "Product 20", price: 170, category: "SmartPhone" },
        ];

        setProducts(sampleProducts);
        setFilteredProducts(sampleProducts);

        const uniqueCategories = [...new Set(sampleProducts.map(product => product.category))];
        setCategories(['All Products', ...uniqueCategories]);
    }, []);

    useEffect(() => {
        if (filterType === 'All Products') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.category === filterType);
            setFilteredProducts(filtered);
        }
    }, [filterType, products]);

    const sortProducts = (products, sortType) => {
        return [...products].sort((a, b) => {
            if (sortType === 'name') {
                return a.name.localeCompare(b.name);
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

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-semibold my-4 text-center">All Products</h1>
            <div className="flex flex-col md:flex-row justify-center items-center mb-4">
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border p-2 mb-2 md:mb-0 md:mr-2"
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className="border p-2"
                >
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(sortedProducts.length / productsPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className="mx-1 py-2 px-4 border rounded">{index + 1}</button>
                ))}
            </div>
        </div>
    );
};

export default Products;
