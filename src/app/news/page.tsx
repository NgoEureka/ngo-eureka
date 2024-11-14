"use client";
import { CircularLoader } from "@/components/Loader";
import { News } from "@/models/NewsModel";
import { TrashIcon } from "@heroicons/react/24/solid";
import { IBM_Plex_Serif, Nunito_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ibmPlexSerif = IBM_Plex_Serif({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700", "800"],
});

export default function AllNewsPage() {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [fullDescription, showFullDescription] = useState(false);

    const getData = async () => {
        const response = await fetch(
            `/api/v1/news`
        );
        const data = await response.json();

        const updatedNews = [...news, ...data.data];
        setNews(updatedNews);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDeleteNews = async (_id: string) => {
        const data = { _id: _id }
        const response = await fetch(`/api/v1/news`, {
        method: "DELETE",
        body: JSON.stringify(data)
        });

        if (response.ok) {
            const updatedNews = news.filter(
                (post) => post._id.toString() !== _id.toString()
            );
            setNews(updatedNews);
            toast("Post deleted successfully!!!")
        }
    };

    return (
        <div className="mx-8">
        <div className="flex flex-row py-8 justify-between items-center">
            <h1
                className={
                    ibmPlexSerif.className + " text-white text-5xl font-semibold"
                }
                >
                All Posts
            </h1>

        </div>

        <div className="grid grid-flow-row sm:grid-cols-2 md:grid-cols-3 gap-6 my-4">
            {news.map((post) => (
            <div
                key={post._id.toString()}
                className="p-2 bg-slate-700 rounded-lg gap-2 flex flex-col"
            >
                <div className="">
                    <div className="flex flex-col my-4">
                        <img src={post.imageUrl} alt={"Image"} className="mx-4 rounded-md"/>
                        <h3
                            className={ibmPlexSerif.className + " text-lg font-bold m-1 mx-auto"}
                        >
                            {post.title}
                        </h3>
                        <p className={nunitoSans.className + " text-lime-500 mx-auto"}>
                            {post.category}
                        </p>
                    </div>
                    {
                        !fullDescription ?
                        <div className={nunitoSans.className + " text-amber-700 text-sm font-bold ml-2"}>
                            {post.description.slice(0,45)}
                            <span 
                            className="hover:cursor-pointer text-amber-600"
                            onClick={()=>showFullDescription(true)}>
                                ...Read more
                            </span>
                        </div>
                        :
                            <div className={nunitoSans.className + " text-amber-700 text-sm font-bold ml-2"}>
                                {post.description}
                                <span 
                                className="hover:cursor-pointer text-amber-600"
                                onClick={()=>showFullDescription(false)}>
                                    ...Read less
                                </span>
                        </div>
                    }
                    
                    <div className={nunitoSans.className + " text-amber-700 text-sm font-bold ml-2"}>
                        -- at {post.place}
                    </div>
                </div>

                <hr className="mt-auto"/>
                <div className="flex flex-row justify-end p-2">
                <button
                    onClick={() => handleDeleteNews(post._id.toString())}
                    className="hover:bg-cyan-800 p-1 rounded-sm"
                >
                    <TrashIcon className="h-5 w-5 text-red-700 " />
                </button>
                </div>
            </div>
            ))}
        </div>

        {loading && <CircularLoader/>}
        </div>
    );
}