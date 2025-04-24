import React from 'react';
import logo from '../../assets/logo.png';

export default function Header() {
  return (
    <header >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <img src={logo} alt="Nitzani Music Logo" className="w-24 " />
        </h1>

        <nav className="space-x-4 text-sm">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
      </div>
      
    </header>
  );
}
