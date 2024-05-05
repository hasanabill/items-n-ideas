import { useState, useEffect } from "react";
import axios from 'axios';
import { server } from "../Routes/server";

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const handleEdit = (productId) => {
        console.log('Edit product with ID:', productId);
    };

    const handleDelete = (productId) => {
        axios.delete(`${server}/api/product/${productId}`)
            .then(response => {
                console.log(response.data);
                setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-8">
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
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={() => handleEdit(product._id)}>Edit</button>
                                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
