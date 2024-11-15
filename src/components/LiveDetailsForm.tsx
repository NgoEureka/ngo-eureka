'use client';

import { LiveMatch } from '@/models/LiveModel';
import uploadFile from '@/lib/uploadFile';
import { Upload } from 'lucide-react';
import { useState, ChangeEvent, FormEvent } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const LiveDetailsForm = () => {

    const [data, setData] = useState<LiveMatch>({
        _id: Object("6736efc7a8a00628ca1c0229"),
        teamA: '',
        teamB: '',
        teamALogo: '',
        teamBLogo: '',
        date: '',
        time: '',
        ytLink: '',
        isLive: true,
        isABowling: false,
        isBreak: false,
        overs: '0.0',
        status: 'Match yet to be started',
        teamAScore: '0/0',
        teamBScore: '0/0'
    })
    const [fileA, setFileA] = useState<File | null>(null)
    const [fileB, setFileB] = useState<File | null>(null)
    const router = useRouter()

    const handleFileChangeA = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        
        if (selectedFile) {
        setFileA(selectedFile)
        }
    }

    const handleFileChangeB = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        
        if (selectedFile) {
        setFileB(selectedFile)
        }
    }

        
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }
        
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const imgLinkA = await uploadFile(fileA);

        if(imgLinkA) {
            data.teamALogo=imgLinkA;
            setData(data);
        } else {
            toast.error("Unable to set the logo")
        }

        const imgLinkB = await uploadFile(fileB);

        if(imgLinkB) {
            data.teamBLogo=imgLinkB;
            setData(data);
        } else {
            toast.error("Unable to set the Logo");
        }
        console.log(data);
        const i = await postLiveDetails(data);
        if (i) {
            router.replace('/live/running');
        }
    }

    const postLiveDetails = async (liveData: LiveMatch): Promise<boolean> => {
        const url = "/api/v1/live";
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(liveData),
            });
        
            const data: any = await response.json();
        
            if (response.status != 200) {
                toast.error(data.msg || "Something went wrong");
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                toast.success("Live started successfully");
            }
            return true;
        } catch(e: any) {
            console.log(e);
            toast.error("Something went wrong");
            return false;
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 rounded-lg shadow-md space-y-6">
                <div>
                    <label htmlFor="teamA" className="block text-sm font-medium text-white mb-1">
                        Team A
                    </label>
                    <input
                    type="text"
                    id="teamA"
                    name="teamA"
                    value={data.teamA}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-slate-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    placeholder="Enter Team Name"
                    />
                </div>

                <div className="w-full max-w-md mx-auto px-6">
                    <label htmlFor="fileA-upload" className="block text-sm font-medium text-white mb-2">
                        Upload Team A Logo
                    </label>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                        <input
                            type="file"
                            id="fileA-upload"
                            className="sr-only"
                            onChange={handleFileChangeA}
                            aria-describedby="file-upload-description"
                        />
                        <label
                            htmlFor="fileA-upload"
                            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                        >
                            <Upload className="w-5 h-5 mr-2" />
                            Choose file
                        </label>
                        </div>
                    </div>
                    {fileA && (
                        <p id="file-upload-description" className="mt-2 text-sm text-gray-500">
                        Selected file: {fileA.name}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="teamB" className="block text-sm font-medium text-white mb-1">
                        Team B
                    </label>
                    <input
                    type="text"
                    id="teamB"
                    name="teamB"
                    value={data.teamB}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-slate-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    placeholder="Enter Team Name"
                    />
                </div>

                <div className="w-full max-w-md mx-auto px-6">
                    <label htmlFor="fileB-upload" className="block text-sm font-medium text-white mb-2">
                        Upload Team B Logo
                    </label>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                        <input
                            type="file"
                            id="fileB-upload"
                            className="sr-only"
                            onChange={handleFileChangeB}
                            aria-describedby="file-upload-description"
                        />
                        <label
                            htmlFor="fileB-upload"
                            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                        >
                            <Upload className="w-5 h-5 mr-2" />
                            Choose file
                        </label>
                        </div>
                    </div>
                    {fileB && (
                        <p id="file-upload-description" className="mt-2 text-sm text-gray-500">
                        Selected file: {fileB.name}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-white mb-1">
                        Date
                    </label>
                    <input
                    type="text"
                    id="date"
                    name="date"
                    value={data.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-slate-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    placeholder="Enter date"
                    />
                </div>

                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-white mb-1">
                        Starting Time
                    </label>
                    <input
                    type="text"
                    id="time"
                    name="time"
                    value={data.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-slate-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    placeholder="Enter time"
                    />
                </div>

                <div>
                    <label htmlFor="ytLink" className="block text-sm font-medium text-white mb-1">
                        YouTube Link
                    </label>
                    <input
                    type="text"
                    id="ytLink"
                    name="ytLink"
                    value={data.ytLink}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    placeholder="Paste the Link here"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                >
                    Go Live
                </button>
            </form>
        </div>
    )
}

export default LiveDetailsForm