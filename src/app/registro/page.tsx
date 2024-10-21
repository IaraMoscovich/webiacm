"use client";

import React, { useState } from "react";
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

  // Función para enviar la solicitud de registro
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await supabase
        .from("solicitudes")
        .insert([{ full_name: fullName, email, phone, hospital, status: "Pendiente" }]);

      if (error) {
        throw new Error("Error al enviar la solicitud: " + error.message);
      }

      // Enviar correo a la dirección especificada
      await sendEmailNotification(fullName, email, phone, hospital);
      setSuccess(true); // Mostrar mensaje de éxito
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  // Función para enviar el correo de notificación usando fetch
  const sendEmailNotification = async (fullName: string, email: string, phone: string, hospital: string) => {
    try {
      const response = await fetch('/api/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'iacmia2024@gmail.com',
          subject: 'Nueva Solicitud de Registro',
          message: `Se ha recibido una nueva solicitud de registro:\n\nNombre: ${fullName}\nCorreo: ${email}\nTeléfono: ${phone}\nHospital: ${hospital}\n\nPuedes aceptar o denegar la solicitud.`,
          status: "Aceptado"
        }),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error('Error al enviar la notificación por correo.');
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Formulario de Registro</h2>
      {success && <p style={styles.message}>Su solicitud está siendo verificada.</p>}
      {error && <p style={styles.errorMessage}>Error: {error}</p>}
      <form onSubmit={handleSignup} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="fullName">Nombre y Apellido</label>
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
          <label style={styles.label} htmlFor="email">Correo Electrónico</label>
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
          <label style={styles.label} htmlFor="phone">Celular</label>
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
          <label style={styles.label} htmlFor="hospital">Hospital/Institución</label>
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
  errorMessage: {
    color: "#dc3545",
    textAlign: "center" as const,
    marginTop: "20px",
  },
};

export default Registro;
