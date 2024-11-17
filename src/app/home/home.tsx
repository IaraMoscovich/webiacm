import { useState } from 'react';
import Image from 'next/image';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-start justify-center bg-gradient-to-b from-[#0B0225] to-[#2B004E] p-8">
      {/* Encabezado con el logo y el menú */}
      <header className="w-full flex justify-between items-center">
        <h1 className="text-6xl font-bold text-pink-400">IACM</h1>
        <button
          className="text-pink-400 text-3xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </header>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <nav className="absolute top-16 right-8 bg-[#2B004E] rounded-lg shadow-lg p-5 text-white">
          <ul className="flex flex-col gap-3">
            <li className="hover:text-pink-400 cursor-pointer">Iniciar Sesión</li>
            <li className="hover:text-pink-400 cursor-pointer">Registrarse</li>
            <li className="hover:text-pink-400 cursor-pointer">Sobre Nosotros</li>
            <li className="hover:text-pink-400 cursor-pointer">Nuestra Misión</li>
          </ul>
        </nav>
      )}

      {/* Contenido principal */}
      <main className="flex flex-1 w-full flex-col md:flex-row items-center justify-between mt-12">
        {/* Texto principal */}
        <div className="text-white space-y-4">
          <h2 className="text-5xl font-bold text-pink-400">Patólogos:</h2>
          <h3 className="text-6xl font-bold">Bienvenidos a IACM</h3>
          <p className="text-lg">Somos la plataforma que busca ayudarlos día a día.</p>
          <button className="mt-4 px-6 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600">
            Ingresar
          </button>
        </div>

        {/* Espacio para la imagen de la cinta */}
        <div className="mt-10 md:mt-0">
          {/* Aquí puedes agregar la cinta rosa */}
          <div className="relative w-64 h-64">
            <Image
              src="/ruta-de-tu-imagen.png"
              alt="Cinta Rosa"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
