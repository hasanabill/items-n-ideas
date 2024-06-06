import { Link } from "react-router-dom";


const FeaturedCard = ({ product }) => {
    return (
        <Link to={`/products/${product._id}`} className="product-card bg-[rgba(251, 246, 239, 0.859)] rounded-lg shadow-lg overflow-hidden">
            <div className="text-center">
                {product.images && product.images.length > 0 ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover object-center" />
                ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        No Image Available
                    </div>
                )}
                <div className="p-4 flex flex-col justify-center items-center">
                    <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                    <p className="text-gray-600 mt-2">Price: ${product.price}</p>
                    <p className="text-gray-600">Categories: {product.categories}</p>
                    <div className="mt-4 flex justify-end">
                        <Link to={`products/${product._id}`} className="text-white bg-teal-600 hover:bg-teal-900 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out">Details</Link>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default FeaturedCard