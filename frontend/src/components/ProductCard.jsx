import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/products/${product._id}`} className='block product-card bg-white rounded-lg shadow-md overflow-hidden'>
            <div className="text-center">
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

                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
