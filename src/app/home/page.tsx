'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-start justify-center bg-gradient-to-b from-[#0B0225] to-[#2B004E] p-8">
      {/* Encabezado con el logo y el menú */}
      <header className="w-full flex justify-between items-center">
        <h1 className="text-[120px] font-bold" style={{ color: '#EA95C4' }}>IACM</h1>
        <button
          className="text-[#EA95C4] text-3xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </header>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <nav className="absolute top-16 right-8 bg-[#2B004E] rounded-lg shadow-lg p-5 text-white">
          <ul className="flex flex-col gap-3">
            <li className="hover:text-[#EA95C4] cursor-pointer">Iniciar Sesión</li>
            <li className="hover:text-[#EA95C4] cursor-pointer">Registrarse</li>
            <li className="hover:text-[#EA95C4] cursor-pointer">Sobre Nosotros</li>
            <li className="hover:text-[#EA95C4] cursor-pointer">Nuestra Misión</li>
          </ul>
        </nav>
      )}

      {/* Contenido principal */}
      <main className="flex flex-1 w-full flex-col md:flex-row items-center justify-between mt-12">
        {/* Texto principal */}
        <div className="text-white space-y-4">
          <h2 className="text-[70px] font-bold" style={{ color: '#EA95C4', lineHeight: '1' }}>
            Patólogos:
          </h2>
          <h3 className="text-[70px] font-bold" style={{ lineHeight: '1' }}>
            Bienvenidos a <br />
            <span style={{ color: '#EA95C4' }}>IACM</span>
          </h3>
          <p className="text-lg">Somos la plataforma que busca ayudarlos día a día.</p>
          <button className="mt-4 px-6 py-2 bg-[#EA95C4] text-white font-semibold rounded-lg hover:bg-[#EA95C4]">
            Ingresar
          </button>
        </div>

        {/* Espacio para la imagen de la cinta */}
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
