'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importar useRouter

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const router = useRouter(); // Inicializar useRouter

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
    <div
      className="h-screen flex flex-col items-start justify-start p-8 overflow-hidden relative"
      style={{
        background: `
          radial-gradient(circle at top right, #EA95C4 -100%, transparent 40%), 
          radial-gradient(circle at bottom left, #EA95C4 -40%, transparent 40%), 
          #121139
        `,
      }}
    >
      <header className="w-full flex justify-between items-center">
        <button
          className="relative flex flex-col justify-center items-center space-y-[8px] bg-transparent p-2 rounded-lg focus:outline-none"
          style={{
            marginTop: '22px',
            marginLeft: 'auto',
            marginRight: '35px',
            width: '52px',
            height: '59px',
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span
            className="block w-full h-[3px] bg-[#EA95C4] transition-all duration-300"
            style={{ transform: isMenuOpen ? 'rotate(45deg) translateY(8px)' : 'rotate(0)' }}
          />
          <span
            className={`block w-full h-[3px] bg-[#EA95C4] transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className="block w-full h-[3px] bg-[#EA95C4] transition-all duration-300"
            style={{ transform: isMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'rotate(0)' }}
          />
        </button>
      </header>

      {isMenuOpen && (
        <nav
          ref={menuRef}
          className="absolute top-16 right-8 bg-[#2B004E] rounded-lg shadow-lg p-5 text-white z-10"
        >
          <ul className="flex flex-col gap-3">
          <li className="hover:text-[#EA95C4] cursor-pointer"
            onClick={() => router.push('/home')} // Redirigir a home
          >Home
          </li>
            <li
              className="hover:text-[#EA95C4] cursor-pointer"
              onClick={() => router.push('/login')} // Redirigir a Iniciar Sesión
            >
              Iniciar Sesión
            </li>
            <li
              className="hover:text-[#EA95C4] cursor-pointer"
              onClick={() => router.push('/registro')} // Redirigir a Registrarse
            >
              Registrarse
            </li>
            <li className="hover:text-[#EA95C4] cursor-pointer"
            onClick={() => router.push('/sobrenosotros')} // Redirigir a sobrenosotros
            >
            Sobre Nosotros
            </li>
          
          </ul>
        </nav>
      )}

      <h1
        className="absolute text-[200px] md:text-[144px] font-bold"
        style={{
          color: '#EA95C4',
          lineHeight: '1',
          top: '75px',
          left: '5%',
          letterSpacing: '-5px',
        }}
      >
        IACM
      </h1>

      <main className="flex flex-1 w-full items-center justify-between mt-16 gap-8">
        <div className="flex flex-col items-start text-white ml-16">
          <div
            className="text-left"
            style={{
              marginLeft: '3%',
              position: 'relative',
            }}
          >
            <h2
              className="font-bold bg-gradient-to-r from-[#EA95C4] to-[#FFC8F9] text-transparent bg-clip-text"
              style={{
                fontSize: '100px',
                lineHeight: '1.1',
                position: 'relative',
                top: '-20px',
                left: '20px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                letterSpacing: '-5px',
              }}
            >
              Nuestra
            </h2>
            <h3
              className="font-bold leading-tight mt-2"
              style={{
                fontSize: '90px',
                position: 'relative',
                top: '-30px',
                left: '20px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                letterSpacing: '-5px',
              }}
            >
              Misión.
            </h3>
          </div>
        </div>

        {/* Cuadrado Rosa con Texto */}
        <div
          className="flex items-center justify-center rounded-2xl"
          style={{
            width: '1300px',
            height: '260px',
            backgroundColor: '#EA95C4',
            color: 'white',
            fontFamily: 'Poppins, sans-serif',
            padding: '20px',
            marginBottom:"60px"
          }}
        >
          <p style={{ textAlign: 'center', fontSize: '32px' }}>
          IACM quiere agilizar el proceso de conteo de Ki-67, repercutiendo de forma directa, en el tiempo desde que se hace la biopsia y se comienza el tratemiento. Esta ideado para anatomopatólogos, a quienes buscamos ayudar para que su labor se aliviane, y pueda ser mas eficiente.

          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
