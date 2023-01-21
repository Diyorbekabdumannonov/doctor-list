import React, { useEffect, useState } from "react";
import { getStaticProps } from ".";

export default function Navbar() {
    const links = [
        { name: 'Services', href: '#service' },
        { name: 'Projects', href: '#project' },
        { name: 'Contact', href: '#contact' },
    ]
    const [isDropdownOpened, setIsDropdownOpened] = useState(false)
    return (
        <div className={"flex justify-between lg:px-24 px-5 fixed w-full top-0 z-50 bg-white text-black shadow-lg"}>
            <div className="flex items-center justify-between md:justify-start py-4 md:py-0 w-full md:w-auto">
                <h1 className="font-extrabold text-xl cursor-pointer">Portfolio</h1>
                <hr className={"w-px m-5 h-7 hidden md:block bg-black"} />
                {links.map(link => {
                    return <a
                        className={"mr-5 text-xl font-700 hidden md:block"}
                        href={link.href}
                        key={link.href}>{link.name}</a>
                })}
                <button className="md:hidden">Menu</button>
            </div>
            <div className="flex items-center">
                <h2 className="font-semibold text-xl mr-2">Your Name</h2>
                <div
                    className={"w-8 h-8 rounded-full cursor-pointer bg-black"}
                    onClick={() => setIsDropdownOpened(!isDropdownOpened)}
                ></div>
                <div className={isDropdownOpened ? 'flex fixed flex-col py-2 px-5 rounded-xl right-20 top-16 bg-black text-white' : 'hidden'}>
                    <h3 className="font-bold text-xl">Your Name</h3>
                    <p className="underline cursor-pointer text-sm font-medium">yourorganization@gmail.com</p>
                    <button
                        onClick={() => {
                            localStorage.setItem('PORT_USER', JSON.stringify(false))
                            window.location.href = '/login'
                        }} className={"mt-4 text-18 font-medium py-1 rounded-full bg-gray-900"}
                    >Log Out</button>
                </div>
            </div>
        </div>
    )
}