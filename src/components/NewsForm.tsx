'use client';

import uploadFile from '@/lib/uploadFile';
import { Upload } from 'lucide-react';
import { useState, ChangeEvent, FormEvent } from 'react'
import { ToastContainer, toast } from 'react-toastify';

interface FormData {
    title: string;
    description: string;
    place: string;
    category: string;
    imageUrl: string;
}

type NewsFormProps = {
    _id: string | null;
}

const NewsForm = (props: NewsFormProps) => {

    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        place: '',
        category: '',
        imageUrl: ''
    })
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        
        if (selectedFile) {
        setFile(selectedFile)
        }
    }

        
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
        
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const imgLink = await uploadFile(file);

        if(imgLink) {
            formData.imageUrl=imgLink;
            setFormData(formData);
        } else {
            //toast error
        }
        console.log(formData);
        const i = await postSheet(formData)
        if (i) {
            setFormData({
                title: '',
                description: '',
                place: '',
                category: '',
                imageUrl: ''
            });
            setFile(null);
        }
    }

    const postSheet = async (formData: FormData): Promise<boolean> => {
        const url = "/api/v1/news";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
        
            const data: any = await response.json();
        
            if (response.status != 201) {
                toast.error(data.msg || "Something went wrong");
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                toast.success("Post created successfully");
            }
            return true;
        } catch(e: any) {
            toast.error("Something went wrong");
            return false;
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 rounded-lg shadow-md space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-white mb-1">
                    Title
                    </label>
                    <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-slate-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter title"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
                    Description
                    </label>
                    <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter description"
                    />
                </div>

                <div>
                    <label htmlFor="place" className="block text-sm font-medium text-white mb-1">
                    Place
                    </label>
                    <input
                    type="text"
                    id="place"
                    name="place"
                    value={formData.place}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-slate-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter place"
                    />
                </div>

                <div>
                    <span className="block text-sm font-medium text-white mb-1">Category</span>
                    <div className="space-y-2">
                    {["Activities", "Sports", "Educational", "Welfare", "Other"].map((num) => (
                        <div key={num} className="flex items-center">
                        <input
                            type="radio"
                            id={`category-${num}`}
                            name="category"
                            value={num.toString()}
                            checked={formData.category === num.toString()}
                            onChange={handleInputChange}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            required
                        />
                        <label htmlFor={`category-${num}`} className="ml-2 block text-sm text-white">
                            {num}
                        </label>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="w-full max-w-md mx-auto p-6">
                    <label htmlFor="file-upload" className="block text-sm font-medium text-white mb-2">
                        Upload Image
                    </label>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                        <input
                            type="file"
                            id="file-upload"
                            className="sr-only"
                            onChange={handleFileChange}
                            aria-describedby="file-upload-description"
                        />
                        <label
                            htmlFor="file-upload"
                            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                        >
                            <Upload className="w-5 h-5 mr-2" />
                            Choose file
                        </label>
                        </div>
                    </div>
                    {file && (
                        <p id="file-upload-description" className="mt-2 text-sm text-gray-500">
                        Selected file: {file.name}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                >
                    {
                        props._id ? "Update" : "Create"
                    }
                </button>
            </form>
        </div>
    )
}

export default NewsForm