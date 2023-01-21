import React from "react";

export default function Footer() {
    return (
        <div className={"lg:px-24 px-5 fixed bottom-0 w-full bg-white text-black"} id="contact">
            <hr className="mt-4" />
            <footer className="flex items-center sm:justify-between justify-center text-sm font-normal py-4">
                <h1 className="font-extrabold text-xl hidden sm:block">Portfolio</h1>
                <p className="font-semibold">Copyright © Unique Group, Inc</p>
                <p className="hidden sm:block">Unique Group</p>
            </footer>
        </div>
    )
}