import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-1 items-center justify-items-center p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link className="bg-cyan-950 p-4 rounded-md shadow-lg hover:bg-emerald-950" href={"/news/create"}>Create a post</Link>
      <Link className="bg-cyan-950 p-4 rounded-md shadow-lg hover:bg-emerald-950" href={"/news"}>All posts</Link>
      <Link className="bg-cyan-950 p-4 rounded-md shadow-lg hover:bg-emerald-950" href={"/teams"}>All Teams</Link>
    </div>
  );
}
