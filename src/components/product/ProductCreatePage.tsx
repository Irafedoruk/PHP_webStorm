import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductCreatePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category_id: id,
        images: null as FileList | null
    });

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setData({ ...data, images: files });
        }
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("quantity", data.quantity);
        formData.append("category_id", data.category_id as string);

        if (data.images) {
            Array.from(data.images).forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });
        }

        axios.post("http://localhost:8000/api/products", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(resp => {
            console.log("Server result", resp.data);
            navigate("/products/" + id);
        });
    }

    return (
        <>
            <h1 className="text-center text-4xl font-bold">Додати товар</h1>
            <div className={"mt-[20px] flex justify-center"}>
                <div className="w-full max-w-lg">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Назва
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                   id="name" name="name" onChange={handleChangeInput} value={data.name} type="text" placeholder="Назва" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Опис
                            </label>
                            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                      id="description" name="description" onChange={handleChangeInput} value={data.description} placeholder="Опис"></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Ціна
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                   id="price" name="price" onChange={handleChangeInput} value={data.price} type="number" placeholder="Ціна" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                                Кількість
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                   id="quantity" name="quantity" onChange={handleChangeInput} value={data.quantity} type="number" placeholder="Кількість" />
                        </div>
                        <div className="mb-4">
                            <label className="block">
                                <span className="sr-only">Оберіть фото</span>
                                <input type="file" multiple onChange={handleChangeFile} className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:text-neutral-500 dark:file:bg-blue-500 dark:hover:file:bg-blue-400" />
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Додати
                            </button>
                            <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={() => navigate("/products/" + id)}>
                                Скасувати
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ProductCreatePage;
