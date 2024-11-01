"use client";

import React, { useState } from "react";
import { createClient } from "@/components/supabaseClient";
import { useRouter } from "next/navigation";
import bcrypt from 'bcryptjs';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log(email);
      const { data: solicitud, error: solicitudError } = await supabase
        .from("solicitudes")
        .select()
        .eq("email", email);

      if (solicitudError) throw new Error("Error al verificar la solicitud.");

      if (!solicitud || solicitud[0].status !== "Aceptado") {
        throw new Error("Tu solicitud no ha sido aprobada o fue denegada.");
      }

      const compared = await bcrypt.compareSync(password, solicitud[0].password);
      if (!compared) throw new Error("Contraseña incorrecta");

      alert("Login exitoso, bienvenido.");
      router.push("/");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>IACM</h1>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>¡Bienvenido a IACM!</h2>
        <h3 style={styles.subtitle}>Iniciar Sesión</h3>
        <p style={styles.registerLink}>¿Aún no tenés cuenta? <a href="#" style={styles.link}>Solicitar Registro</a></p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Ingresá tu Email o Usuario</label>
            <input
              type="email"
              placeholder="Usuario o Contraseña"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Ingresá tu Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.forgotPassword}>
            <a href="#" style={styles.link}>Olvidé mi contraseña</a>
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>
        <button style={styles.googleButton}>
          <img src="imagenes/google.png" alt="Google icon" style={styles.googleIcon} />
          Iniciar Sesión con Google
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#fff',
    position: 'relative' as 'relative',
    padding: '0 20px',
    backgroundImage: 'url("imagenes/IACMM.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  header: {
    fontSize: '120px',
    color: '#EA95C4',
    marginBottom: '300px',
    fontWeight: 'bold' as 'bold',
  },
  loginBox: {
    width: '100%',
    maxWidth: '500px', // Más ancho
    backgroundColor: '#fff',
    padding: '70px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px', // Más redondeado
    textAlign: 'center' as 'center',
    marginTop: '-220px',
    
  },
  title: {
    fontSize: '20px', // Más pequeño
    fontFamily: 'DM Sans, sans-serif',
    color: '#333',
  },
  subtitle: {
    fontSize: '45px', // Más grande
    fontFamily: 'DM Sans, sans-serif',
    color: '#333',
    marginTop: '10px',
  },
  registerLink: {
    fontSize: '14px',
    color: '#888',
    margin: '10px 0 20px',
  },
  link: {
    color: '#EA95C4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
  label: {
    fontSize: '14px',
    fontFamily: 'DM Sans, sans-serif',
    color: '#333',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  inputFocused: {
    border: '1px solid #EA95C4', // Borde rosa al seleccionar
  },
  forgotPassword: {
    textAlign: 'right' as 'right',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '18px',
    backgroundColor: '#EA95C4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  googleButton: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#F3E5F5',
    color: '#333',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15px',
  },
  googleIcon: {
    width: '20px',
    marginRight: '10px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '10px',
  },
};

export default Login;
