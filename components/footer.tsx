import Image from 'next/image'
import React from 'react'
import BlueIcon from './BlueIcon'

export default function Footer() {
    return (
        <div>
            <footer className="bg-[#101828] rounded-base shadow-xs border border-default p-4 ">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <BlueIcon/>
                            <span className="text-heading self-center text-2xl font-semibold whitespace-nowrap">BiziCount</span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-body sm:mb-0">
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">About</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-default sm:mx-auto lg:my-8" />
                    <span className="block text-sm text-body sm:text-center">© 2023 <a href="https://flowbite.com/" className="hover:underline">BiziCount™</a>. All Rights Reserved.</span>
                </div>
            </footer>


        </div>
    )
}
