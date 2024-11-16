"use client"

import Link from 'next/link';
import React, {  useEffect, useState } from 'react'

type LiveStartButtonProps = {
    isLive: boolean;
};

const LiveStartButton = (props: LiveStartButtonProps) => {
    // const [isLive, setLive] = useState(false);

    // const getData = async () => {
    //     const response = await fetch(
    //         `/api/v1/live`
    //     );
    //     const data = await response.json();
    //     console.log(data.data[0].isLive);
        
    //     setLive(data.data[0].isLive);
        
        
    // };

    // useEffect(() => {
    //     getData();
        
    // }, []);

    return (
        <Link 
        className="lg:max-w-96 w-4/5 text-center bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        href={props.isLive? '/live/running' : '/live'} >
            {props.isLive? "Update Live Score":"Start a Live"}
        </Link>
    )
}

export default LiveStartButton