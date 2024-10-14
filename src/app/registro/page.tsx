"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "../../components/supabaseClient"; // Asegúrate de que esta ruta sea correcta

const supabase = createClient();

const Registro = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hospital, setHospital] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [solicitudes, setSolicitudes] = useState<any[]>([]);

  // Función para enviar la solicitud de registro
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await supabase
        .from("solicitudes")
        .insert([{ full_name: fullName, email, phone, hospital }]);

      if (error) {
        throw new Error("Error al enviar la solicitud: " + error.message);
      }

      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  // Función para obtener las solicitudes pendientes
  const fetchSolicitudes = async () => {
    const { data, error } = await supabase
      .from("solicitudes")
      .select("*")
      .eq("status", "pendiente");

    if (error) {
      console.error("Error al obtener las solicitudes:", error);
    } else {
      setSolicitudes(data);
    }
  };

  // Función para aceptar la solicitud
  const acceptRequest = async (id: string) => {
    const { error } = await supabase
      .from("solicitudes")
      .update({ status: "aceptada" })
      .eq("id", id);

    if (error) {
      console.error("Error al aceptar la solicitud:", error);
      setMensaje("Error al aceptar la solicitud");
    } else {
      setMensaje("Solicitud aceptada con éxito");
    }

    fetchSolicitudes(); // Refresca la lista de solicitudes
  };

  // Carga las solicitudes al montar el componente
  useEffect(() => {
    fetchSolicitudes();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Formulario de Registro</h2>
      {mensaje && <p style={styles.message}>{mensaje}</p>}
      <form onSubmit={handleSignup} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="fullName">
            Nombre y Apellido
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="phone">
            Celular
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="hospital">
            Hospital/Institución
          </label>
          <input
            type="text"
            id="hospital"
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Enviando..." : "Enviar Solicitud"}
        </button>
      </form>
      {success && (
        <p style={styles.successMessage}>
          Solicitud enviada correctamente. Estamos revisando tu solicitud.
        </p>
      )}
      {error && <p style={styles.errorMessage}>Error: {error}</p>}
      <h2 style={styles.title}>Solicitudes Pendientes</h2>
      <ul>
        {solicitudes.map((solicitud) => (
          <li key={solicitud.id} style={styles.solicitudItem}>
            <p>
              {solicitud.full_name} - {solicitud.email}
            </p>
            <button
              onClick={() => acceptRequest(solicitud.id)}
              style={styles.button}
            >
              Aceptar Solicitud
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Estilos básicos para el componente
const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  message: {
    color: "#28a745",
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  successMessage: {
    color: "#28a745",
    textAlign: "center" as const,
    marginTop: "20px",
  },
  errorMessage: {
    color: "#dc3545",
    textAlign: "center" as const,
    marginTop: "20px",
  },
  solicitudItem: {
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
};

export default Registro;
