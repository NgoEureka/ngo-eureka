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
        <Link className="bg-cyan-950 p-4 rounded-md shadow-lg hover:bg-emerald-950" href={props.isLive? '/live/running' : '/live'} >
            {props.isLive? "Update Live Score":"Start a Live"}
        </Link>
    )
}

export default LiveStartButton