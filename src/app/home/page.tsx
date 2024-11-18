'use client';  

import React, { useState, useRef, useEffect } from 'react';  
import Image from 'next/image';  

const Home = () => {  
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const menuRef = useRef<HTMLUListElement>(null);  

  const handleClickOutside = (event: MouseEvent) => {  
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {  
      setIsMenuOpen(false);  
    }  
  };  

  useEffect(() => {  
    if (isMenuOpen) {  
      document.addEventListener('mousedown', handleClickOutside);  
    } else {  
      document.removeEventListener('mousedown', handleClickOutside);  
    }  

    return () => {  
      document.removeEventListener('mousedown', handleClickOutside);  
    };  
  }, [isMenuOpen]);  

  return (  
    <div className="min-h-screen flex flex-col items-start justify-center bg-gradient-to-b from-[#0B0225] to-[#2B004E] p-8 relative">  
      <header className="w-full flex justify-between items-center">  
        <h1 className="text-[135px] font-bold" style={{ color: '#EA95C4', lineHeight: '1' }}>IACM</h1>  
        <button  
          className="text-[#EA95C4] text-3xl focus:outline-none"  
          onClick={() => setIsMenuOpen(!isMenuOpen)}  
        >  
          ☰  
        </button>  
      </header>  

      {/* Menú desplegable */}  
      {isMenuOpen && (  
        <nav  
          ref={menuRef}  
          className="absolute top-16 right-8 bg-[#2B004E] rounded-lg shadow-lg p-5 text-white"  
        >  
          <ul className="flex flex-col gap-3">  
            <li className="hover:text-[#EA95C4] cursor-pointer">Iniciar Sesión</li>  
            <li className="hover:text-[#EA95C4] cursor-pointer">Registrarse</li>  
            <li className="hover:text-[#EA95C4] cursor-pointer">Sobre Nosotros</li>  
            <li className="hover:text-[#EA95C4] cursor-pointer">Nuestra Misión</li>  
          </ul>  
        </nav>  
      )}  

      <main className="flex flex-1 w-full flex-col md:flex-row items-center justify-between mt-12">  
        <div className="text-white space-y-4">  
          <h2 className="text-[80px] font-bold" style={{ color: '#EA95C4', lineHeight: '1' }}>  
            Patólogos:  
          </h2>  
          <h3 className="text-[70px] font-bold" style={{ lineHeight: '1' }}>  
            Bienvenidos a <br />  
            <span style={{ lineHeight: '1' }}>IACM</span>  
          </h3>  
          <p className="text-lg">Somos la plataforma que busca ayudarlos día a día.</p>  
          <button className="mt-4 px-6 py-2 bg-[#EA95C4] text-white font-semibold rounded-lg hover:bg-[#EA95C4]">  
            Ingresar  
          </button>  
        </div>  

        <div className="mt-10 md:mt-0">  
          {/* Aquí puedes agregar la cinta rosa */}  
          <div className="relative w-120 h-120">  
            <img src="/imagenes/cinta.png" alt="Cinta Rosa" />  
          </div>  
        </div>  
      </main>  
    </div>  
  );  
};  

export default Home;