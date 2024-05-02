import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const sampleProduct = {
            id: id,
            name: "Product Name",
            price: 50.99,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a odio vel odio viverra ultricies nec sit amet magna. In non ex id dolor ultrices tempus ac et libero.",
            images: [
                `https://via.placeholder.com/500x500?text=${id}`,
                "https://via.placeholder.com/500x500?text=Product+Image+2",
                "https://via.placeholder.com/500x500?text=Product+Image+3"
            ],

        };

        setProduct(sampleProduct);
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={product.images[0]} alt={product.name} className="w-full" />
                </div>

                <div>
                    <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-lg font-semibold mb-4">${product.price}</p>
                    <p className="text-lg font-semibold mb-4">id: {product.id}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
