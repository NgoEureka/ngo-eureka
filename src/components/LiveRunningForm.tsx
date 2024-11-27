'use client';

import mongoose from 'mongoose';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Match } from '@/models/MatchesModel';

export interface MatchRunning  {
    _id: mongoose.Types.ObjectId;
    teamAScore: string;
    teamBScore: string;
    overs: string;
    status: string;
    isLive: boolean;
    isBreak: boolean;
    isABowling: boolean;
}



const LiveRunningForm = () => {

    const [data, setData] = useState<MatchRunning>({
        _id: Object("6736efc7a8a00628ca1c0229"),
        isLive: true,
        isABowling: false,
        isBreak: false,
        overs: '0.0',
        status: 'Match yet to be started',
        teamAScore: '0/0',
        teamBScore: '0/0'
    });
    const [teamName, setTeamName] = useState({
        teamA: "Team A",
        teamB: "Team B"
    });
    const router = useRouter()


    const getData = async () => {
            const response = await fetch(
                `/api/v1/live`
            );
            const data = await response.json();
            if(data.data) {
                console.log(data.data[0]);
                
                setData(data.data[0]);
                setTeamName(data.data[0]);
            }
            
        };
    
        useEffect(() => {
            getData();
            
        }, []);

        
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        if(e.target.value===teamName.teamA) {
            data.isABowling = true;
            setData(data);
        } else {
            data.isABowling = false;
            setData(data);
        }
    }
        
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Match: ",data);
        data.isLive = false;

        const isUploaded = await updateLiveDetails(data);
        const resLive = await fetch(
            `/api/v1/live`
        );
        const liveData = await resLive.json();
        console.log(liveData);
        if (isUploaded) {
            await saveMatch(liveData.data[0]);
            router.replace('/matches');
        }
    }


    const saveMatch = async (liveData: Match): Promise<boolean> => {
        const url = "/api/v1/matches";
        const {teamA,teamB,teamALogo,teamBLogo,teamAScore,teamBScore,date,time,overs,status,isBreak,isLive,isABowling} = liveData;
        try {

            const response = await fetch(url, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({teamA,teamB,teamALogo,teamBLogo,teamAScore,teamBScore,date,time,overs,status,isBreak,isLive,isABowling}),
            });
        
            const data: any = await response.json();
        
            if (response.status != 201) {
                toast.error(data.msg || "Something went wrong");
                throw new Error(`HTTP error! status: ${response.status} ${data.msg}`);
            } else {
                toast.success("Saved successfully");
            }
            return true;
        } catch(e: any) {
            console.log(e);
            toast.error("Something went wrong");
            return false;
        }
    }


    const updateLiveDetails = async (liveData: MatchRunning): Promise<boolean> => {
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
                toast.success("Updated successfully");
            }
            return true;
        } catch(e: any) {
            console.log(e);
            toast.error("Something went wrong");
            return false;
        }
    }

    const refreshLiveData = async() => {
        await getData();
        toast.success("Refreshed successfully")
    }

    const updateLiveData = async() => {
        const isUpdated = await updateLiveDetails(data)
        if(!isUpdated) {
            toast.error("Unable to Update");
        }
        await getData();
    }

    return (
        <div>
            <div className='text-red-600 text-sm flex justify-center'>{data.isLive? "Match is Live": "Live Ended! Try Starting a Live Again"}</div>
            {
                data.isLive &&
                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 rounded-lg shadow-md space-y-6">
                <div>
                    <label htmlFor="overs" className="block text-sm font-medium text-white mb-1">
                        Overs
                    </label>
                    <input
                    type="text"
                    id="overs"
                    name="overs"
                    value={data.overs}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-slate-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    placeholder="Enter Current Over"
                    />
                </div>

                <div>
                    <span className="block text-sm font-medium text-white mb-2">Bowling Team</span>
                    <div className='flex gap-9'>
                    <div className="flex flex-row items-center">
                        <input
                            type="radio"
                            id={`isABowling`}
                            name="isABowling"
                            value={teamName.teamA}
                            onChange={handleRadioChange}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            required
                        />
                        <label htmlFor={`isABowling`} className="ml-2 block text-sm text-white">
                            {teamName.teamA}
                        </label>
                    </div>
                    <div className="flex flex-row items-center">
                        <input
                            type="radio"
                            id={`isABowling`}
                            name="isABowling"
                            value={teamName.teamB}
                            onChange={handleRadioChange}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            required
                        />
                        <label htmlFor={`isABowling`} className="ml-2 block text-sm text-white">
                            {teamName.teamB}
                        </label>
                    </div>
                    </div>
                </div>

                <div className='flex flex-row gap-6'>
                <div>
                    <label htmlFor="teamAScore" className="block text-sm font-medium text-white mb-1">
                        {teamName.teamA} Score
                    </label>
                    <input
                    type="text"
                    id="teamAScore"
                    name="teamAScore"
                    value={data.teamAScore}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-slate-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    placeholder="Enter Current Score"
                    />
                </div>

                <div>
                    <label htmlFor="teamBScore" className="block text-sm font-medium text-white mb-1">
                        {teamName.teamB} Score
                    </label>
                    <input
                    type="text"
                    id="teamBScore"
                    name="teamBScore"
                    value={data.teamBScore}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-slate-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    placeholder="Enter Current Score"
                    />
                </div>
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-white mb-1">
                        Update Current Status
                    </label>
                    <textarea
                    id="status"
                    name="status"
                    value={data.status}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    placeholder="Enter here"
                    />
                </div>


                <div className='flex flex-row gap-10 pb-10'>
                    <button
                        type='button'
                        onClick={refreshLiveData}
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                    >
                        Refresh
                    </button>
                    <button
                        type='button'
                        onClick={updateLiveData}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                    >
                        Update
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                >
                    End Live
                </button>
            </form>
            }
        </div>
    )
}

export default LiveRunningForm