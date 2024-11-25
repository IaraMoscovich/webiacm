"use client";

import React, { useState } from "react";
import { ChangeEvent } from "react";

const DashboardPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null); // Imagen original
  const [menuOpen, setMenuOpen] = useState(false);
  const [result, setResult] = useState<{
    positivos: number;
    negativos: number;
    imagenProcesada: string;
  } | null>(null);
  const [showProcessed, setShowProcessed] = useState(false);

  const handleImageRemove = () => {
    setImage(null);
    setShowProcessed(false);
    setResult(null); // Reiniciamos los resultados
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Mostrar la imagen original antes de procesarla
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setShowProcessed(false); // Ocultamos imagen procesada mientras se sube
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);
//http://localhost:8000/upload-image/
    try {
      const response = await fetch("https://fastapi-example-endl.onrender.com/upload-image/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file.");
      }

      // Leer resultados del JSON
      const json_res = await response.json();
      const { positivos, negativos, imagenProcesada } = json_res;

      // Guardar resultados en el estado
      setResult({
        positivos,
        negativos,
        imagenProcesada,
      });

      // Mostrar alerta y actualizar vista procesada
      alert("Imagen subida correctamente. Procesando...");
      setShowProcessed(true); // Mostramos imagen procesada
    } catch (error) {
      alert("Error procesando la imagen.");
      console.error("Error procesando la imagen:", error);
    }
  };

  return (
    <div
      className="min-h-screen p-4"
      style={{
        backgroundImage: "url(/imagenes/IACM.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="bg-[#EA95C4] text-white p-4 flex justify-between items-center relative rounded-lg">
        <h1 className="text-lg">¡Bienvenida, María Fernanda!</h1>
        <button className="text-white text-3xl" onClick={toggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </button>

        {menuOpen && (
          <div className="absolute top-0 left-0 w-full bg-[#EA95C4] p-4 z-10 flex justify-between items-center rounded-lg">
            <h1 className="text-lg">¡Bienvenida, María Fernanda!</h1>
            <nav className="flex space-x-4">
              <a href="#" className="text-white">
                Home
              </a>
              <a href="#" className="text-white">
                Reporta un problema
              </a>
              <a href="#" className="text-white">
                Cerrar Sesión
              </a>
            </nav>
            <button className="text-white text-3xl" onClick={toggleMenu}>
              ✕
            </button>
          </div>
        )}
      </header>

      <main className="flex flex-col items-center">
        <div className="flex justify-between items-center w-full max-w-4xl my-2">
          <div className="flex flex-col w-1/2 p-2">
            <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center">
              {showProcessed && result?.imagenProcesada ? (
                <img
                  src={`data:image/jpeg;base64,${result.imagenProcesada}`}
                  alt="imagen procesada"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                image && (
                  <img
                    src={image}
                    alt="imagen original"
                    className="w-full h-full object-cover rounded-lg"
                  />
                )
              )}
            </div>
          </div>

          <div
            className="flex flex-col w-4 p-2 text-center"
            style={{
              backgroundColor: "#EA95C4",
              color: "white",
              fontFamily: "DM Sans, sans-serif",
              width: "400px",
              height: "250px",
            }}
          >
            <div className="text-lg font-semibold">Dashboard</div>
            <div className="text-4xl mt-2">
              Ki-67 Positivos: {result?.positivos ?? 0}
            </div>
            <div className="text-4xl mt-2">
              Ki-67 Negativos: {result?.negativos ?? 0}
            </div>
            <div className="text-4xl mt-2">
              Células positivas:{" "}
              {result && result.positivos + result.negativos > 0
                ? Math.round(
                    (result.positivos /
                      (result.positivos + result.negativos)) *
                      100
                  )
                : 0}
              %
            </div>
          </div>
        </div>

        <div
          className="flex justify-start space-x-16"
          style={{ marginLeft: "-50%", marginTop: "-10px" }}
        >
          <div className="flex flex-col items-center">
            <img
              src="/imagenes/Subir Imagen .png"
              alt="Subir Imagen"
              className="w-15 h-20 cursor-pointer"
              onClick={() => document.getElementById("file-input")?.click()}
            />
            <input
              id="file-input"
              type="file"
              className="hidden"
              onChange={uploadFile}
            />
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/imagenes/Eliminar Img.png"
              alt="Eliminar Imagen"
              className="w-15 h-20 cursor-pointer"
              onClick={handleImageRemove}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
