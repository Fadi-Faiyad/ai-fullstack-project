//layouts is like a tempatent 
// were its baslicai

import { UserButton } from "@clerk/nextjs"
import { Fragment } from "react"
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link"
import download from "../imgUrl.jpg"
const links = [
    { href: '/', label: 'Home' },
    { href: '/journal', label: 'Jornal' },
    { href: '/history', label: 'History' }
]


const DashboardLayout = ({ children }) => {
    return <div className="  pb-2 pr-6 w-auto  lg:h-screen lg:w-screen lg:relative bg-amber-500  ">
        <aside className=" absolute lg:w-[200px] lg:top-2 lg:left-0 h-full">
            
            
            <ul className="flex space-x-1 lg:space-x-4 gap-2 lg:gap-4 flex-nowrap items-center px-5 ml-52 lg:pb-4">
                {links.map((link) => (
                    <li key={link.href} className="mt-5 ml-6 lg:mt-2 px-2 py-1 lg: text-xl text-amber-500 rounded-3xl bg-amber-50 lg:shadow-sm  lg:shadow-cyan-500/100 ">
                        <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
            </ul>
          
        </aside>
        <div className="ml-[20px] flex-1">
            <header className="h-[60px] border-b border-amber-50 flex items-center justify-end pr-6">
                <h3 className="flex flex-nowrap pr-80 pt-4 lg:pt-0 lg:pr-8 text-amber-50 lg:text-center ">Lets Start are Jornely</h3>
                <div className="flex items-center space-x-4">
                    <UserButton />
                </div>
            </header>
            <div className="h-[calc(100vh-60px)]">{children}</div>
        </div>
    </div>
}

export default DashboardLayout