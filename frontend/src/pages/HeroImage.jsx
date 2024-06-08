import { useForm } from "react-hook-form";
import axios from 'axios';
import { server } from "../Routes/server";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const HeroImage = () => {
    const { register, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hero, setHero] = useState([]);

    useEffect(() => {
        getHero();
    }, []);

    const getHero = async () => {

        try {
            const response = await axios.get(`${server}/api/hero`);
            setHero(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const onUpdate = async (data) => {
        try {
            setIsLoading(true);

            const imageUrls = await uploadImages(data.images);
            const heroData = {
                images: imageUrls,
            };

            const heroId = data.id;
            const response = await axios.put(`${server}/api/hero/${hero[0]?._id}`, heroData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            if (response.status === 200) {
                toast.success("Hero images updated successfully!");
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
            for (const image of Array.from(images)) {
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

    if (loading) {
        return <Loader />
    }


    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit(onUpdate)} className="w-full max-w-lg mt-10">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-xl">
                    <div className="mb-4">
                        <label htmlFor="id" className="text-2xl font-medium text-gray-700">Hero</label>
                        <input {...register("id")} value={hero[0]?._id} disabled type="text" name="id" className="w-full h-10 border px-3 border-black rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="images" className="text-lg font-medium text-gray-700">Hero Images</label>
                        <input {...register("images")} type="file" multiple name="images" className="py-1 w-full h-10 border px-3 border-black rounded-lg" />
                    </div>
                    {isLoading && <div className="mb-4 text-center">Uploading images...</div>}
                    <button type="submit" className="mt-5 w-full h-10 bg-gray-800 hover:bg-gray-500 text-white text-lg rounded-lg">
                        Update Images
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HeroImage;
