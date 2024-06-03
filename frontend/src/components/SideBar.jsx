import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 h-screen  flex flex-col items-start py-6 px-4  border-r-2 border-teal-900">
            <Link to={`manageproducts`} className="w-full px-5 py-3 bg-teal-600 hover:bg-teal-900 text-white rounded-lg">
                Manage Product
            </Link>
            <Link to={`manageuser`} className="w-full px-5 py-3 my-2 bg-teal-600 hover:bg-teal-900 text-white rounded-lg">
                Manage User
            </Link>
        </div>
    );
};

export default Sidebar;
