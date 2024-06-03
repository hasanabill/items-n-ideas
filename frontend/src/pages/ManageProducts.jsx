import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../Routes/server";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../components/DeleteConfirmModal";


const ManageProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    useEffect(() => {
        axios.get(`${server}/api/products`)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);


    const handleDelete = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedProduct) {
            axios.delete(`${server}/api/product/${selectedProduct._id}`)
                .then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        setProducts(prevProducts => prevProducts.filter(product => product._id !== selectedProduct._id));
                        toast.success("Product deleted successfully");
                    }
                    setIsDeleteModalOpen(false);
                })
                .catch(error => {
                    console.error('Error deleting product:', error);
                });
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto">
            <div className="overflow-x-auto">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold mb-4">Products</h1>
                    <Link to="/adminn/addproduct" className="bg-teal-500 hover:bg-teal-900 hover:text-white font-bold py-2 px-4 rounded-xl">Add Product</Link>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map(product => (
                            <tr key={product._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Link className="text-indigo-600 hover:text-indigo-900 mr-2" to={`/adminn/editproduct/${product._id}`}>Edit</Link>
                                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(product)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteConfirm} />


        </div>
    )
}

export default ManageProducts