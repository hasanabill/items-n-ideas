import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 flex flex-col justify-center items-center py-6 h-[200px]">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">

                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
                    <Link to="/" className="hover:text-white">Home</Link>
                    <Link to="/products" className="hover:text-white">Products</Link>
                </div>
                <div className="flex space-x-4">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <FaFacebook size={20} />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <FaTwitter size={20} />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <FaInstagram size={20} />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <FaLinkedin size={20} />
                    </a>
                </div>
            </div>
            <div className="text-center mt-16">
                <p className="text-center md:text-left mb-4 md:mb-0">&copy; 2024 Items & Ideas. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
