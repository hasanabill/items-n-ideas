import { useForm } from "react-hook-form";
import axios from 'axios';
import { server } from "../Routes/server";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const AddProduct = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true); // Start loading

            const imageUrls = await uploadImages(data.images);
            const productData = {
                name: data.name,
                price: data.price,
                categories: data.categories,
                desc: data.desc,
                images: imageUrls,
                link: data.link
            };

            const response = await axios.post(`${server}/api/product`, productData);

            if (response.status === 201) {
                toast.success("Product added successfully!");
                navigate("/adminn");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const uploadImages = async (images) => {
        try {
            const imageUrls = [];
            for (const image of images) {
                const formData = new FormData();
                formData.append('image', image);

                const response = await axios.post('https://api.imgbb.com/1/upload?key=a9e96cffb01065e5efdb260580e31b2a', formData);

                if (response.status === 200 && response.data.data.url) {
                    imageUrls.push(response.data.data.url);
                }
            }
            return imageUrls;
        } catch (error) {
            throw new Error('Failed to upload images to imgbb');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="text-lg font-medium text-gray-700">Name</label>
                        <input {...register("name")} type="text" name="name" className="w-full h-10 border border-black rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="text-lg font-medium text-gray-700">Price</label>
                        <input {...register("price")} type="number" name="price" className="w-full h-10 border border-black rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="categories" className="text-lg font-medium text-gray-700">Categories</label>
                        <input {...register("categories")} type="text" name="categories" className="w-full h-10 border border-black rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="desc" className="text-lg font-medium text-gray-700">Description</label>
                        <textarea {...register("desc")} type="text" name="desc" className="w-full h-10 border border-black rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="images" className="text-lg font-medium text-gray-700">Images</label>
                        <input {...register("images")} type="file" multiple name="images" className="py-1 px-2 w-full h-10 border border-black rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="link" className="text-lg font-medium text-gray-700">Link</label>
                        <input {...register("link")} type="text" name="link" className="w-full h-10 border border-black rounded-lg" />
                    </div>
                    {isLoading && <div className="mb-4 text-center">Uploading images...</div>}
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
