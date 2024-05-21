import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from 'axios';
import { server } from "../Routes/server";
import ProductCard from './../components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/bundle';

import image1 from '../assets/hero1.jpg';
import image2 from '../assets/hero2.jpg';
import image3 from '../assets/hero3.jpg';

const Home = () => {
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        axios.get(`${server}/api/products`)
            .then(response => {
                setLatestProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching latest products:', error);
            });
    }, []);

    return (
        <div className="animatee">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation
                pagination={{ clickable: true }}
            >
                <SwiperSlide>
                    <div
                        className="bg-cover bg-center h-[70%] flex justify-center items-center"
                        style={{ backgroundImage: `url(${image1})` }}
                    >
                        <div className="max-w-3xl  my-60 bg-black text-white bg-opacity-50 p-8 rounded-lg shadow-md">
                            <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Items and Ideas</h1>
                            <p className="text-lg mb-8 text-center">Explore our collection of products and find what you need.</p>
                            <div className="flex justify-center mb-8">
                                <Link to="/products" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out flex items-center">
                                    Explore Products
                                    <FiArrowRight className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="bg-cover bg-center h-[70%] flex justify-center items-center"
                        style={{ backgroundImage: `url(${image2})` }}
                    >
                        <div className="max-w-3xl my-60 bg-white bg-opacity-75 p-8 rounded-lg shadow-md text-gray-900">
                            <h1 className="text-4xl font-bold mb-6 text-center">Find the Best Products Here</h1>
                            <p className="text-lg mb-8 text-center">Our store offers a wide variety of products that cater to all your needs.</p>
                            <div className="flex justify-center mb-8">
                                <Link to="/products" className="inline-flex items-center justify-center bg-green-500 text-white rounded-md text-lg font-semibold px-8 py-3 hover:bg-green-600 transition duration-300 ease-in-out">
                                    Shop Now
                                    <FiArrowRight className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="bg-cover bg-center h-[70%] flex justify-center items-center"
                        style={{ backgroundImage: `url(${image3})` }}
                    >
                        <div className="max-w-3xl my-60 bg-white bg-opacity-75 p-8 rounded-lg shadow-md text-gray-900">
                            <h1 className="text-4xl font-bold mb-6 text-center">Discover Our New Collection</h1>
                            <p className="text-lg mb-8 text-center">Stay ahead with the latest trends and enjoy exclusive offers.</p>
                            <div className="flex justify-center mb-8">
                                <Link to="/products" className="inline-flex items-center justify-center bg-red-500 text-white rounded-md text-lg font-semibold px-8 py-3 hover:bg-red-600 transition duration-300 ease-in-out">
                                    Discover Now
                                    <FiArrowRight className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            <div className="container mx-auto py-8">
                <h2 className="text-3xl font-semibold mb-4">Latest Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestProducts.slice(1).map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
