import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        navigate('/getin');
    };

    const isAuthenticated = () => {
        return !!localStorage.getItem('accessToken');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const links = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Products",
            path: "/products",
        },
        {
            name: "About",
            path: "/about",
        }

    ];

    return (
        <nav className="bg-teal-900 py-2 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        <Link
                            to="/"
                            className="flex items-center py-4 px-2 text-gray-300 hover:text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                            <span className="font-semibold">Items & Ideas</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                to={link.path}
                                className="py-2 px-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                            >
                                {link.name}
                            </Link>
                        ))}
                        {isAuthenticated() && (
                            <>
                                <Link
                                    className="block py-2 px-3 text-base font-medium text-white rounded-md hover:bg-gray-900" to='adminn'>Admin</Link>
                                <button
                                    onClick={handleLogout}
                                    className="py-2 px-3  bg-red-500 hover:text-white hover:bg-red-900 rounded-md"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute w-full transition-all duration-300 ease-in z-[21] ${isOpen
                    ? " top-[50px] opacity-100"
                    : "opacity-0 top-[-550px]"
                    }`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            className="block py-2 px-3 text-base font-medium text-white rounded-md hover:bg-gray-900"
                            onClick={toggleMenu}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {isAuthenticated() && (
                        <>
                            <Link
                                className="block py-2 px-3 text-base font-medium text-white rounded-md hover:bg-gray-900" to='adminn'>Admin</Link>
                            <button
                                onClick={handleLogout}
                                className="py-4 px-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
