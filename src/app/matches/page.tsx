"use client";
import { CircularLoader } from "@/components/Loader";
import { Match } from "@/models/MatchesModel";
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

export default function AllMatchesPage() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        const response = await fetch(
            `/api/v1/matches`
        );
        const data = await response.json();

        const updatedMatches = [...matches, ...data.data];
        setMatches(updatedMatches);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDeleteMatch = async (_id: string) => {
        const data = { _id: _id }
        const response = await fetch(`/api/v1/matches`, {
        method: "DELETE",
        body: JSON.stringify(data)
        });

        if (response.ok) {
            const updatedMatches = matches.filter(
                (match) => match._id.toString() !== _id.toString()
            );
            setMatches(updatedMatches);
            toast("Match deleted successfully!!!")
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
                All Matches
            </h1>

        </div>

        <div className="grid grid-flow-row d md:grid-cols-3 gap-6 my-4">
            {matches.map((match) => (
            <div
                key={match._id.toString()}
                className="p-2 bg-slate-700 rounded-md gap-2 flex flex-col"
            >
                <div className="">
                <div className="flex flex-row justify-evenly my-4">
                    <div className="flex flex-col">
                        <img src={match.teamALogo} alt={"Team Logo"} width={100} height={100} className="mx-auto rounded-full"/>
                        <h3
                            className={ibmPlexSerif.className + " text-lg font-bold m-1 mx-auto"}
                        >
                            {match.teamA}
                        </h3>
                        <p className={nunitoSans.className + " text-lime-500 mx-auto"}>
                            {match.teamAScore}
                        </p>
                    </div>
                    <h1 className={ibmPlexSerif.className + " my-auto pb-10 font-bold"}>VS</h1>
                    <div className="flex flex-col">
                        <img src={match.teamBLogo} alt={"Team Logo"} width={100} height={100} className="mx-auto rounded-full"/>
                        <h3
                            className={ibmPlexSerif.className + " text-lg font-bold m-1 mx-auto"}
                        >
                            {match.teamB}
                        </h3>
                        <p className={nunitoSans.className + " text-lime-500 mx-auto"}>
                            {match.teamBScore}
                        </p>
                    </div>
                </div>
                <div className={nunitoSans.className + " text-amber-700 text-sm font-bold ml-2"}>
                    *Played on {match.date} -- Started at {match.time}
                </div>
                </div>

                <hr />
                <div className="flex flex-row justify-end p-2">
                <button
                    onClick={() => handleDeleteMatch(match._id.toString())}
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