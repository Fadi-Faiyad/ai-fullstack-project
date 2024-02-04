import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth()

  let href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-amber-500 flex justify-center items-center 
    text-white">
      <div className="w-full  max-w-[600px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4" >
          <h1 className="ml-2 text-5xl  lg:text-6xl mb-4"> Start your own Journney.</h1>
          <p className=" text-lg lg:text-4x1 text-white/60 mb-4">This is the best app for tracking your mood through out your life.
            All you have to do is be honest.
          </p>
        </div>
        <div>
          <Link href={href}>
            <button className="bg-amber-50 text-amber-500 px-4 rounded-lg  ml-60 lg:ml-4 mb-4 text-lg lg:text-xl ">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
