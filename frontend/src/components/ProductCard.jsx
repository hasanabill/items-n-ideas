import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {product.images && product.images.length > 0 ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover object-center" />
            ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    No Image Available
                </div>
            )}
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-2">Price: ${product.price}</p>
                <p className="text-gray-600">Categories: {product.categories}</p>
                <div className="mt-4 flex justify-end">
                    <Link to={`${product._id}`} className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out">Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
