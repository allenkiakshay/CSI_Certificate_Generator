import Image from 'next/image'
import React from 'react';

const Navbar = () => {
    

  return (
<header className="text-gray-400 bg-black body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <Image width={63} height={50} src="/vitapLogo.png" alt=""/>
            <span className="ml-3 text-xl">Cerficate Generator</span>
            </a>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-white">Home</a>
            <a className="mr-5 hover:text-white">About</a>
            <a className="mr-5 hover:text-white">Contact</a>
            </nav>
        </div>
    </header>
  );
};

export default Navbar;
