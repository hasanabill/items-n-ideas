import { useForm } from "react-hook-form";
import axios from 'axios';
import { server } from "../Routes/server";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loader from "../components/Loader";

const EditProduct = () => {
    const { id } = useParams();
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const [description, setDescription] = useState(''); // State for React Quill

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${server}/api/product/${id}`);
                const productData = response.data;

                setProduct(productData);

                // Prefill form with existing product data
                setValue('name', productData.name);
                setValue('price', productData.price);
                setValue('categories', productData.categories);
                setDescription(productData.desc); // Set React Quill description
                setValue('link', productData.link);
            } catch (error) {
                toast.error('Error fetching product details');
            }
        };

        fetchProduct();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);

            const imageUrls = await uploadImages(data.images);
            const productData = {
                name: data.name,
                price: data.price,
                categories: data.categories,
                desc: description,
                images: imageUrls.length ? imageUrls : product.images, // Use existing images if no new images are uploaded
                link: data.link
            };

            const response = await axios.put(`${server}/api/product/${id}`, productData);

            if (response.status === 200) {
                toast.success("Product updated successfully!");
                navigate("/adminn");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
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

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-xl">
                    <div className="mb-4">
                        <label htmlFor="name" className="text-lg font-medium text-gray-700">Name</label>
                        <input {...register("name")} type="text" name="name" className="w-full h-10 border px-3 border-black rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="text-lg font-medium text-gray-700">Price</label>
                        <input {...register("price")} type="number" name="price" className="w-full h-10 border px-3 border-black rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="categories" className="text-lg font-medium text-gray-700">Categories</label>
                        <input {...register("categories")} type="text" name="categories" className="w-full h-10 border px-3 border-black rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="desc" className="text-lg font-medium text-gray-700">Description</label>
                        <ReactQuill value={description} onChange={setDescription} className="w-full  p-3 rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="images" className="text-lg font-medium text-gray-700">Images</label>
                        <input {...register("images")} type="file" multiple name="images" className="py-1 w-full h-10 border px-3 border-black rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="link" className="text-lg font-medium text-gray-700">Link</label>
                        <input {...register("link")} type="text" name="link" className="w-full h-10 border px-3 border-black rounded-lg" />
                    </div>
                    {isLoading && <div className="mb-4 text-center">Uploading images...</div>}
                    <button type="submit" className="mt-5 w-full h-10 bg-gray-800 hover:bg-gray-500 text-white text-lg rounded-lg">
                        Update Product
                    </button>
                    <Link to='/adminn' className="inline-block text-center mt-5 w-full py-2 bg-red-800 hover:bg-gray-500 text-white text-lg rounded-lg">
                        Go back
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
