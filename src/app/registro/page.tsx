 "use client";

import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import { createClient } from "../../components/supabaseClient"; // Verifica la ruta correcta
import { useRouter } from "next/navigation"; // Importa el enrutador de Next.js

const supabase = createClient();

const Registro = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hospital, setHospital] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter(); // Usamos el hook useRouter para la navegación

  useEffect(() => {
    if (email) {
      const channel = supabase
        .channel("public:solicitudes")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "solicitudes", filter: `email=eq.${email}` },
          (payload) => {
            if (payload.new.status !== "Pendiente") {
              setStatus(payload.new.status);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [email]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const hashed_password = await bcrypt.hash(password, 10);

    try {
      const { data, error } = await supabase.from("solicitudes").insert([
        {
          full_name: fullName,
          email,
          phone,
          hospital,
          password: hashed_password,
          status: "Pendiente",
        },
      ]);

      if (error) {
        throw new Error("Error al enviar la solicitud: " + error.message);
      }

      setSuccess(true);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login"); // Redirige a la página de login
  };

  // Estilos personalizados para la contraseña
  const styles = {
    formGroup: {
      marginBottom: "1.5rem",
    },
    label: {
      display: "block",
      fontWeight: "600",
      marginBottom: "0.5rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "0.375rem",
      border: "1px solid #d1d5db",
      outline: "none",
      transition: "border-color 0.2s ease-in-out",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white relative">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat opacity-100"
        style={{
          backgroundImage: 'url("/imagenes/IACMM.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      ></div>

      <div
        className="absolute flex justify-center opacity-100"
        style={{
          top: "8%", // Ajustar la posición de la imagen superior
        }}
      >
        <img
          src="/imagenes/imagen-arriba.png"
          alt="Imagen Arriba"
          className="w-56 h-18"
        />
      </div>

      <div className="bg-white shadow-lg rounded-3xl p-10 w-full max-w-lg mt-16 z-10">
        <h2 className="text-left text-[18px] font-medium mt-10 ">¡Bienvenido a IACM!</h2>
        <h3 className="text-left  text-[32px] font-medium mt-2">Solicitud de Registro</h3>
        <p className="text-left text-gray-500 text-sm">
          ¿Llegaste por error?{" "}
          <button
            onClick={handleLoginRedirect}
            className="text-[#EA95C4] hover:text-[#EA95C4]/80"
          >
            Iniciar Sesión
          </button>
        </p>

        {success && (
          <p className="text-center text-green-500 mt-4">
            Su solicitud está siendo verificada.
          </p>
        )}
        {error && (
          <p className="text-center text-red-500 mt-4">Error: {error}</p>
        )}
        {status === "Aceptado" && (
          <p className="text-center text-green-500 mt-4">
            ¡Su solicitud ha sido aceptada! Ya puede ingresar.
          </p>
        )}
        {status === "Denegado" && (
          <p className="text-center text-red-500 mt-4">
            Su solicitud ha sido denegada.
          </p>
        )}

        <form onSubmit={handleSignup} className="mt-6 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-pink-400"
              placeholder="ejemplo@iacm.com.ar"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold mb-1"
              >
                Nombre y Apellido
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-pink-400"
                placeholder="Júan Perez"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-1">
                Celular
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-pink-400"
                placeholder="Tel./Cel."
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="hospital" className="block text-sm font-semibold mb-1">
              Hospital / Institución
            </label>
            <input
              type="text"
              id="hospital"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-pink-400"
              placeholder="Hosp./Inst."
              required
            />
          </div>

          {/* Campo de contraseña con estilos personalizados */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-pink-400"
              placeholder="Mínimo 8 caracteres"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-[#EA95C4] text-white rounded-lg shadow-md hover:bg-[#EA95C4]/90 transition-all duration-300"
          >
            {loading ? "Enviando..." : "Enviar Solicitud"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
