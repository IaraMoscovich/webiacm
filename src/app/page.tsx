"use client";

import React, { useState, useEffect } from "react";
import Profile from '@/components/upload-image';
import { ChangeEvent } from 'react';

const DashboardPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [result, setResult] = useState<{ positivos: number; negativos: number, image: string } | null>(null);

    useEffect(() => {
        const resultados = localStorage.getItem('resultados');
        if (resultados) {
            setResult(JSON.parse(resultados));
        }
    }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        result?.positivos
        result?.negativos
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
    // Manejar el evento de carga de archivos
    const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const bucket = "FotosDB";
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              setImage(reader.result as string);
              result?.positivos
              result?.negativos
            };
            reader.readAsDataURL(file);
        }
           
        const handleImageRemove = () => {
            setImage(null);
          };

        // Crear FormData
        const formData = new FormData();
        formData.append('file', file as Blob); // Agregar el archivo al FormData

        // Enviar FormData al servidor, http://localhost:8000https://fastapi-example-endl.onrender.com/upload-image/
        try {
            const response = await fetch ('http://localhost:8000/upload-image/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload file.');
            }

            const json_res = await response.json();

            // Guardar resultados en localStorage
            localStorage.setItem('resultados', JSON.stringify({
                positivos: json_res.positivos,
                negativos: json_res.negativos,
                imagen: json_res.image
            }));
            

            alert('File uploaded successfully!');
            window.location.reload();
        } catch (error) {
            alert('Error uploading file.');
            console.error('Error uploading file:', error);
        }
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
                <div>
                  <img src={image} alt="imagen" />
                </div>
              ) : (
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
          
                </div>
              )}
            </div>
            <div className="w-1/2 p-2 bg-pink-200 rounded-lg text-center">
              <div className="text-lg font-semibold">Dashboard</div>
              <div className="text-3xl mt-2"> Ki-67 Positivos {result?.positivos} </div>
              <div className="text-3xl mt-2"> Ki-67 Negativos {result?.negativos} </div>
              <div className="text-3xl mt-2">
              Células positivas {Math.round((result?.positivos / (result?.positivos + result?.negativos)) * 100)}%
              </div>
              <button className="mt-4 bg-white text-pink-400 font-bold py-2 px-4 rounded-lg">
                Gráfico
              </button>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-4">
          <input type="file" onChange={uploadFile}/>
          <label className="cursor-pointer flex items-center">
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
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
