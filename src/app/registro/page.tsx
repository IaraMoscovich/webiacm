"use client";

import React, { useState, useEffect } from "react";
import  bcrypt  from 'bcryptjs';
import { createClient } from "../../components/supabaseClient"; // Verifica la ruta correcta

const supabase = createClient();

const Registro = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hospital, setHospital] = useState("");
  const [password, setPassword] = useState(""); // Nuevo estado para la contraseña
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  //a
  useEffect(() => {
    if (email) {
      const channel = supabase
        .channel('public:solicitudes')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'solicitudes', filter: `email=eq.${email}` },
          (payload) => {
            console.log('Cambio detectado:', payload);
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
    console.log(password);
    console.log("!ofsa");
    console.log(hashed_password);
    try {
      const { data, error } = await supabase
        .from("solicitudes")
        .insert([{ full_name: fullName, email, phone, hospital, password: hashed_password, status: "Pendiente" }]); // Añade la contraseña aquí

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

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Formulario de Registro</h2>
      {success && <p style={styles.message}>Su solicitud está siendo verificada.</p>}
      {error && <p style={styles.errorMessage}>Error: {error}</p>}

      {status === "Aceptado" && <p style={styles.acceptMessage}>¡Su solicitud ha sido aceptada! Ya puede ingresar.</p>}
      {status === "Denegado" && <p style={styles.rejectMessage}>Su solicitud ha sido denegada.</p>}

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
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

// Estilos del componente
const styles = {

  
  container: { 
    padding: "20px",  
    maxWidth: "600px",
    margin: "0 auto",
    
  },
  title: {
    textAlign: "center" as const,
    fontSize: "24px",
    marginBottom: "20px",
  },
  message: {
    textAlign: "center" as const,
    color: "blue",
  },
  errorMessage: {
    textAlign: "center" as const,
    color: "red",
  },
  acceptMessage: {
    color: "green",
    textAlign: "center" as const,
  },
  rejectMessage: {
    color: "red",
    textAlign: "center" as const,
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column" as const,
  },
  label: {
    marginBottom: "5px",
    fontSize: "14px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Registro;
