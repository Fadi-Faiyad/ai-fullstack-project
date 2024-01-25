//layouts is like a tempatent 
// were its baslicai

import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import download from "../imgUrl.jpg"
const links = [
    { href: '/', label: 'Home' },
    { href: '/journal', label: 'Jornal' },
    { href: '/history', label: 'History' }
]


const DashboardLayout = ({ children }) => {
    return <div className="h-screen w-screen relative bg-amber-500  ">
        <aside className="absolute w-[200px] top-0 left-0 h-full border-r
     border-black/10">
            <div className=" px-2 py-6  text-2xl rounded-full  bg-amber-50 text-amber-500 text-center shadow-lg shadow-cyan-500/100 ">
                Mood
            </div>
            <div className="mt-6">
            <ul className="grid grid-rows-4 grid-flow-col gap-4">
                {links.map((link) => (
                    <li key={link.href} className="px-2 py-6 text-xl text-amber-500 rounded-3xl bg-amber-50 shadow-lg  shadow-cyan-500/100  grid grid-flow-col gap-4">
                        <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
            </ul>
            </div>
        </aside>
        <div className="ml-[200px] flex-1">
            <header className="h-[60px] border-b border-amber-50 flex items-center justify-end pr-6">
                <h3 className="pr-8 text-amber-50 text-center ">Lets Start are Jornely</h3>
                <div className="flex items-center space-x-4">
                    <UserButton />
                </div>
            </header>
            <div className="h-[calc(100vh-60px)]">{children}</div>
        </div>
    </div>
}

export default DashboardLayout