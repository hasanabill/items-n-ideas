import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { server } from "../Routes/server";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {

        const apiUrl = `${server}/api/product/${id}`;

        axios.get(apiUrl)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        navigation
                        pagination={{ clickable: true }}
                        className="mySwiper"
                    >
                        {product.images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img src={image} alt={product.name} className="w-full h-96 object-cover" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div>
                    <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.desc}</p>
                    <p className="text-lg font-semibold mb-4">${product.price}</p>
                    <a target="_blank" className="py-3 px-5 rounded-xl bg-gray-700 text-white" href={`${product.link}`}>Buy from Amazon</a>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
