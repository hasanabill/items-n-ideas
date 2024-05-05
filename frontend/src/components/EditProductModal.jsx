import { useEffect } from "react";
import { useForm } from "react-hook-form";

const EditProductModal = ({ isOpen, onClose, product, onUpdate }) => {
    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = (data) => {
        onUpdate(data);
        onClose();
    };

    useEffect(() => {
        if (product) {
            Object.entries(product).forEach(([key, value]) => {
                setValue(key, value);
            });
        }
    }, [product, setValue]);

    return (
        <div className={`${isOpen ? '' : 'hidden'} fixed inset-0 overflow-y-auto`}>
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex flex-col sm:items-start">
                                <div className="w-full">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input {...register("name")} type="text" name="name" id="name" className="w-full h-10 border border-black rounded-lg px-2" />
                                </div>
                                <div className="w-full mt-4">
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                    <input {...register("price")} type="number" name="price" id="price" className="w-full h-10 border border-black rounded-lg px-2" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="submit" className="mt-5 w-full sm:w-auto bg-gray-800 hover:bg-gray-500 text-white text-lg rounded-lg px-4 py-2 sm:ml-3">
                                Update
                            </button>
                            <button onClick={onClose} type="button" className="mt-5 w-full sm:w-auto bg-gray-800 hover:bg-gray-500 text-white text-lg rounded-lg px-4 py-2 sm:ml-3">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;
