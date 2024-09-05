"use client";

import React, { useState } from "react";

const DashboardPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [positiveCells, setPositiveCells] = useState<number>(40);
  const [negativeCells, setNegativeCells] = useState<number>(80);

  function generateRandomNumber(): number {
    return Math.floor(Math.random() * 100);
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setPositiveCells(generateRandomNumber());
        setNegativeCells(generateRandomNumber());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-pink-400 text-white p-4 flex justify-between items-center relative">
        <h1 className="text-lg">¡Bienvenida, María Fernanda!</h1>
        <button className="text-white text-3xl" onClick={toggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </button>

        {menuOpen && (
          <div className="absolute top-0 left-0 w-full bg-pink-400 p-4 z-10 flex justify-between items-center">
            <h1 className="text-lg">¡Bienvenida, María Fernanda!</h1>
            <nav className="flex space-x-4">
              <a href="#" className="text-white">Home</a>
              <a href="#" className="text-white">Reporta un problema</a>
              <a href="#" className="text-white">Cerrar Sesión</a>
            </nav>
            <button className="text-white text-3xl" onClick={toggleMenu}>
              ✕
            </button>
          </div>
        )}
      </header>

      <main className="flex flex-col items-center">
        <div className="bg-white shadow-md rounded-lg overflow-hidden my-4 p-4 w-full max-w-4xl">
          <div className="flex justify-between items-center">
            <div className="w-1/2 p-2">
              {image ? (
                <img src={image} alt="Subida" className="w-full rounded-lg" />
              ) : (
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  Sube una imagen
                </div>
              )}
            </div>
            <div className="w-1/2 p-2 bg-pink-200 rounded-lg text-center">
              <div className="text-lg font-semibold">Dashboard</div>
              <div className="text-3xl mt-2">{positiveCells} Ki-67 Positivos</div>
              <div className="text-3xl mt-2">{negativeCells} Ki-67 Negativos</div>
              <div className="text-3xl mt-2">
                {Math.round((positiveCells / (positiveCells + negativeCells)) * 100)}% Células positivas
              </div>
              <button className="mt-4 bg-white text-pink-400 font-bold py-2 px-4 rounded-lg">
                Gráfico
              </button>
            </div>
          </div>


          <div className="flex justify-center space-x-4 mt-4">
            <label className="cursor-pointer flex items-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <img
                src="/imagenes/Subir Imagen .png" // Ruta de la imagen para subir
                alt="Subir Imagen"
                className="w-12 h-12 mr-2"
              />
            
            </label>
            <button
              className="flex items-center"
              onClick={handleImageRemove}
            >
              <img
                src="/imagenes/Eliminar Img.png" // Ruta de la imagen para eliminar
                alt="Eliminar Imagen"
                className="w-12 h-12 mr-2"
              />
             
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-6xl font-bold text-pink-400">IACM</div>
          <div className="text-xl">Plataforma Web</div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
