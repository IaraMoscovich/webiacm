'use client';

import React, { useState, useRef, useEffect } from 'react';

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
    <div className="h-screen flex flex-col items-start justify-start bg-gradient-to-b from-[#0B0225] to-[#2B004E] p-8 overflow-hidden relative">
      <header className="w-full flex justify-between items-center">
        {/* Menú Hamburguesa */}
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

      {/* Menú desplegable */}
      {isMenuOpen && (
        <nav
          ref={menuRef}   
          className="absolute top-16 right-8 bg-[#2B004E] rounded-lg shadow-lg p-5 text-white z-10"
        >
          <ul className="flex flex-col gap-3">
            <li className="hover:text-[#EA95C4] cursor-pointer">Iniciar Sesión</li>
            <li className="hover:text-[#EA95C4] cursor-pointer">Registrarse</li>
            <li className="hover:text-[#EA95C4] cursor-pointer">Sobre Nosotros</li>
            <li className="hover:text-[#EA95C4] cursor-pointer">Nuestra Misión</li>
          </ul>
        </nav>
      )}

      {/* Texto "IACM" grande con posicionamiento ajustable */}
      <h1
        className="absolute text-[200px] md:text-[144px] font-bold"
        style={{
          color: '#EA95C4',
          lineHeight: '1',
          top: '75px',
          left: '5%',
        }}
      >
        IACM
      </h1>

      {/* Contenido Principal */}
      <main className="flex flex-1 w-full items-center justify-between mt-16 gap-8">
        {/* Sección de texto centrado */}
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
                top: '20px',
                left: '-30px',
              }}
            >
              Patólogos:
            </h2>
            <h3
              className="font-bold leading-tight mt-2"
              style={{
                fontSize: '90px',
                position: 'relative',
                top: '-10px', // Ajustado para estar más cerca de "Bienvenidos a"
                left: '-30px',
              }}
            >
              Bienvenidos a IACM
            </h3>
            <p
              className="text-lg mt-4"
              style={{
                fontSize: '22px',
                position: 'relative',
                top: '5px',
                left: '-25px',
              }}
            >
              Somos la plataforma que busca ayudarlos día a día.
            </p>
            {/* Botón de Ingresar */}
            <button
              className="mt-8 text-white font-semibold rounded-lg hover:bg-[#C0789E] transition-colors"
              style={{
                backgroundColor: '#EA95C4', // Botón completamente rosa
                border: 'none', // Eliminamos el borde blanco
                padding: '10px 67px', // Puedes ajustar el tamaño aquí
                fontSize: 'px', // Ajusta el tamaño de la fuente aquí
                position: 'relative', // Permite mover el botón
                top: '-5px', // Ajusta la posición vertical
                left: '50px', // Ajusta la posición horizontal
              }}
            >
              Ingresar
            </button>
          </div>
        </div>

        {/* Imagen de la cinta */}
        <div
          className="relative flex justify-end items-end"
          style={{ marginLeft: 'auto', marginRight: '200px', marginTop: '-85px' }}
        >
          <img
            src="/imagenes/cinta.png"
            alt="Cinta Rosa"
            className="max-w-[521px] max-h-[773px] object-contain"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
