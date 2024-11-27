"use client"
import LiveStartButton from "@/components/LiveStartButton";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
export default function Home() {

  const [pw, setPw] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);


  useEffect(()=>{
    setPw(localStorage.getItem("code"));
  },[])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      if(pw === "ngo#eureka") {
      const code = pw + "213";
      localStorage.setItem("code",code);
      setPw(code);
    } else {
      setMsg("*Analyzing...");
      setTimeout(()=>{setMsg("*Wrong Password Entered...")},500);
    }
  }

  return (
    <>
      {
        pw==="ngo#eureka213" ?
        <div className="grid grid-rows-1 items-center justify-items-center p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
          <Link 
          className="lg:max-w-96 w-4/5 text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          href={"/news/create"}>
            Create a Post
          </Link>
          <Link 
          className="lg:max-w-96 w-4/5 text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          href={"/news"}>
            All Posts
          </Link>
          <Link 
          className="lg:max-w-96 w-4/5 text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          href={"/userdata"}>
            User Data
          </Link>
          <Link 
          className="lg:max-w-96 w-4/5 text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          href={"/matches"}>
            All Matches
          </Link>
          
          <LiveStartButton isLive={false}/>
          <LiveStartButton isLive={true}/>
        </div>
        :
        <div>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto py-3 px-6 rounded-lg shadow-md space-y-6 mt-20">
            <div>
              <p className="block text-xs lg:text-sm font-medium text-red-600 mb-1">
                {msg}
              </p>
              <input
                    type="text"
                    id="title"
                    onChange={(e) => setPw(e.target.value)}
                    required
                    className="w-full mt-2 px-3 py-2 bg-slate-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the code"
              />
            </div>
            <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                >
                    Confirm
                </button>
          </form>
        </div>
      }
    </>
  );
}
