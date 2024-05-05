import { useState, useEffect } from "react";
import axios from 'axios';
import { server } from "../Routes/server";
import DeleteConfirmationModal from "../components/DeleteConfirmModal";
import EditProductModal from "../components/EditProductModal";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (updatedProduct) => {
        axios.put(`${server}/api/product/${updatedProduct._id}`, updatedProduct)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    setProducts(prevProducts => prevProducts.map(product => product._id === updatedProduct._id ? updatedProduct : product));
                    toast.success("Product updated successfully")
                }
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
    };

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
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <nav className="w-full h-16 bg-gray-200 flex items-center justify-between px-6">
                <Link to={`addproduct`}>Add new Product</Link>
            </nav>
            <h1 className="text-3xl font-semibold mb-4">Admin Panel</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map(product => (
                            <tr key={product._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={() => handleEdit(product)}>Edit</button>
                                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(product)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteConfirm} />

            {/* Edit Product Modal */}
            {selectedProduct && (
                <EditProductModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} product={selectedProduct} onUpdate={handleEditSubmit} />
            )}
        </div>
    );
};

export default Admin;
