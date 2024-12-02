"use client";

import React, { useState } from "react";
import { ChangeEvent } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter para la navegación

const DashboardPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null); // Imagen original
  const [menuOpen, setMenuOpen] = useState(false);
  const [result, setResult] = useState<{
    positivos: number;
    negativos: number;
    imagenProcesada: string;
  } | null>(null);
  const [showProcessed, setShowProcessed] = useState(false);

  const router = useRouter(); // Hook para manejar la navegación

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
      const response = await fetch("http://localhost:8000/upload-image/", {
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
        <h1 className="text-lg">¡Bienvenido!</h1>

        {/* Menú hamburguesa */}
        <button
          className="text-white text-3xl"
          onClick={toggleMenu}
          style={{
            position: "absolute",
            top: "20px", // Modificar la posición vertical
            right: "20px", // Modificar la posición horizontal
            fontSize: "40px", // Modificar el tamaño del ícono
          }}
        >
          <div
            className={`hamburger-menu ${menuOpen ? "open" : ""}`}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "24px", // Altura total del menú
              width: "30px", // Ancho total del menú
            }}
          >
            <span
              style={{
                backgroundColor: "white",
                height: "3px", // Grosor de la línea
                width: "100%",
                transition: "all 0.3s ease",
                transform: menuOpen ? "rotate(45deg)" : "none",
                marginBottom: menuOpen ? "0" : "6px", // Reduce la distancia entre líneas
              }}
            ></span>
            <span
              style={{
                backgroundColor: "white",
                height: "3px", // Grosor de la línea
                width: "100%",
                transition: "all 0.3s ease",
                opacity: menuOpen ? "0" : "1", // Se oculta cuando está abierto
                marginBottom: "2px", // Reduce la distancia entre líneas
              }}
            ></span>
            <span
              style={{
                backgroundColor: "white",
                height: "3px", // Grosor de la línea
                width: "100%",
                transition: "all 0.3s ease",
                transform: menuOpen ? "rotate(-45deg)" : "none",
                marginTop: menuOpen ? "0" : "5px", // Reduce la distancia entre líneas
              }}
            ></span>
          </div>
        </button>

        {menuOpen && (
          <div className="absolute top-0 left-0 w-full bg-[#EA95C4] p-4 z-10 flex justify-between items-center rounded-lg">
            <h1 className="text-lg">¡Bienvenido!</h1>
            <nav className="flex space-x-4">
              <a
                href="#"
                className="text-white"
                onClick={() => router.push("/home")} // Navega a la página principal
              >
                Home
              </a>
              <a href="#" className="text-white">
                Reporta un problema
              </a>
              <a href="#" className="text-white"
               onClick={() => router.push("/login")} // Navega a iniciar sesion
              >
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
        <div
          className="flex justify-between items-center w-full my-2"
          style={{
            maxWidth: "unset", // Permite agrandar libremente
          }}
        >
          {/* Cuadro de imagen */}
          <div
            style={{
              height: "450px", // Cambia libremente el alto
              width: "950px", // Cambia libremente el ancho
              marginTop: "30px", // Ajusta la posición vertical
              marginLeft: "50px", // Ajusta la posición horizontal
              border: "3px solid #EA95C4", // Borde de color rosa
              borderRadius: "20px", // Aumenté el redondeo
            }}
            className="bg-gray-200 rounded-lg flex items-center justify-center"
          >
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

          {/* Dashboard */}
          <div
            className="flex flex-col p-4 text-center rounded-2xl"
            style={{
              backgroundColor: "#EA95C4",
              color: "white",
              fontFamily: "DM Sans, sans-serif",
              width: "800px", // Cambia el ancho libremente
              height: "450px", // Cambia el alto libremente
              marginTop: "35px", // Ajusta la posición vertical
              marginRight: "70px", // Ajusta la posición horizontal
              borderRadius: "20px", // Aumenté el redondeo
            }}
          >
            <div
              className="text-lg "
              style={{
                marginTop: "25px",
                fontSize: "35px", // Cambia el tamaño aquí
                fontFamily: "DM Sans", // Fuente DM Sans
                letterSpacing:"-1px",
                
              }}
            >
              Dashboard
            </div>
            <div
              className="text-4xl mt-2"
              style={{
                fontSize: "80px", // Tamaño del resultado
                marginTop: "55px", // Margen para ajustar posición
                marginRight: "450px",
                fontFamily: "DM Sans", // Fuente DM Sans
                fontWeight: "bold", // Bold
              }}
            >
              {result?.positivos ?? 0}
            </div>
            <div
              className="text-lg font-semibold"
              style={{
                fontSize: "32px", // Tamaño del texto
                marginTop: "36px", // Margen para ajustar posición
                marginRight: "450px",
                fontFamily: "DM Sans", // Fuente DM Sans
              }}
            >
              Ki-67 Positivos
            </div>

            <div
              className="text-4xl mt-2"
              style={{
                fontSize: "80px", // Tamaño del resultado
                marginTop: "40px", // Margen para ajustar posición
                marginRight: "450px",
                fontFamily: "DM Sans", // Fuente DM Sans
                fontWeight: "bold", // Bold
              }}
            >
              {result?.negativos ?? 0}
            </div>

            <div
              className="text-lg font-semibold"
              style={{
                fontSize: "32px", // Tamaño del texto
                marginTop: "30px", // Margen para ajustar posición
                marginRight: "450px",
                fontFamily: "DM Sans", // Fuente DM Sans
              }}
            >
              Ki-67 Negativos
            </div>

            <div
              className="text-4xl mt-2"
              style={{
                fontSize: "80px", // Tamaño del resultado
                marginTop: "-170px", // Margen para ajustar posición
                marginLeft: "300px",
                fontFamily: "DM Sans", // Fuente DM Sans
                fontWeight: "bold", // Bold
              }}
            >
              {result && result.positivos + result.negativos > 0
                ? Math.round(
                    (result.positivos / (result.positivos + result.negativos)) * 100
                  )
                : 0}
              %
            </div>

            <div
              className="text-lg font-semibold"
              style={{
                fontSize: "32px", // Tamaño del texto
                marginTop: "40px", // Margen para ajustar posición
                marginLeft: "300px",
                fontFamily: "DM Sans", // Fuente DM Sans
              }}
            >
              Células positivas
            </div>
          </div>
        </div>

        <div
          className="flex justify-start space-x-16"
          style={{ marginLeft: "-50%", marginTop: "30px" }}
        >
          <div className="flex flex-col items-center">
            <img
              src="/imagenes/Subir Imagen .png"
              alt="Subir Imagen"
              className="w-60 h-25 cursor-pointer"
              onClick={() => document.getElementById("fileInput")?.click()}
            />
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={uploadFile}
            />
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/imagenes/Eliminar Img.png"
              alt="Eliminar Imagen"
              className="w-60 h-25 cursor-pointer"
              onClick={handleImageRemove}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
