import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
    return (
        <div className="bg-gray-600 min-h-screen flex justify-center items-center">
            <div className="max-w-3xl bg-white p-8 rounded-lg shadow-md text-gray-900">
                <h1 className="text-4xl font-bold mb-6">Welcome to Your Online Store</h1>
                <p className="text-lg mb-8">Explore our curated collection of products and find what you need.</p>
                <div className="flex justify-center mb-8">
                    <Link to="/products" className="inline-flex items-center justify-center bg-blue-500 text-white rounded-md text-lg font-semibold px-8 py-3 hover:bg-blue-600 transition duration-300 ease-in-out">
                        Explore Products
                        <FiArrowRight className="ml-2" />
                    </Link>
                </div>
                <div className="text-sm text-gray-700">
                    Can&apos;t decide where to start? Check out our <Link to="/categories" className="text-blue-500 hover:underline">categories</Link> or <Link to="/best-sellers" className="text-blue-500 hover:underline">best sellers</Link>.
                </div>
            </div>
        </div>
    );
}

export default Home;
