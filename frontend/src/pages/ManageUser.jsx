import { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from "../Routes/server";
import { toast } from 'react-toastify';
import DeleteConfirmationModal from '../components/DeleteConfirmModal';
import RegisterUserModal from '../components/RegisterUserModal'; // Import the new modal
import Loader from '../components/Loader';

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${server}/api/user`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            if (response.status === 200) {
                setUsers(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Error fetching users');
        }
    };

    const handleDeleteClick = (userId) => {
        setSelectedUserId(userId);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`${server}/api/user/${selectedUserId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            toast.success('User deleted successfully');
            fetchUsers();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user');
        }
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedUserId(null);
    };

    const handleOpenRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    const handleCloseRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    if (loading) {
        return <Loader />
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold mb-4">Manage Users</h1>
                <button
                    onClick={handleOpenRegisterModal}
                    className="bg-teal-500 hover:bg-teal-900 hover:text-white font-bold py-2 px-4 rounded-xl"
                >
                    Register User
                </button>
            </div>
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Username</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleDeleteClick(user._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
            />
            <RegisterUserModal
                isOpen={isRegisterModalOpen}
                onClose={handleCloseRegisterModal}
                fetchUsers={fetchUsers}
            />
        </div>
    );
};

export default ManageUser;
