import { useForm } from "react-hook-form";
import axios from 'axios';
import { server } from "../Routes/server";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const AddProduct = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${server}/api/product`, data);

            if (response.status === 201) {
                toast.success("Product added successfully!");
                navigate("/adminn");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="text-lg font-medium text-gray-700">Name</label>
                        <input {...register("name")} type="text" name="name" id="name" className="w-full h-10 border border-black rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="text-lg font-medium text-gray-700">Price</label>
                        <input {...register("price")} type="number" name="price" id="price" className="w-full h-10 border border-black rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="categories" className="text-lg font-medium text-gray-700">Categories</label>
                        <input {...register("categories")} type="text" name="categories" id="categories" className="w-full h-10 border border-black rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="desc" className="text-lg font-medium text-gray-700">Description</label>
                        <textarea {...register("desc")} type="text" name="desc" id="desc" className="w-full h-10 border border-black rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="images" className="text-lg font-medium text-gray-700">Images</label>
                        <input {...register("images")} type="text" name="images" id="images" className="w-full h-10 border border-black rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="link" className="text-lg font-medium text-gray-700">Link</label>
                        <input {...register("link")} type="text" name="link" id="link" className="w-full h-10 border border-black rounded-lg" />
                    </div>
                    <button type="submit" className="mt-5 w-full h-10 bg-gray-800 hover:bg-gray-500 text-white text-lg rounded-lg">
                        Add Product
                    </button>
                    <Link to='/adminn' className="inline-block text-center mt-5 w-full py-2 bg-red-800 hover:bg-gray-500 text-white text-lg rounded-lg">
                        Go back
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
