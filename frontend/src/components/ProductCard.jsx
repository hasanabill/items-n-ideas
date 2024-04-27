const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={`https://via.placeholder.com/300x200?text=${product.name}`} alt={product.name} className="w-full h-48 object-cover object-center" />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-2">Price: ${product.price}</p>
                <p className="text-gray-600">Category: {product.category}</p>
                <div className="mt-4 flex justify-end">
                    <button className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
