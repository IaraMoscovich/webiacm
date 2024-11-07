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

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Por favor, ingresa tu correo electrónico para restablecer la contraseña.");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/newpassword',
      });
      if (error) throw error;

      alert("Se ha enviado un enlace de restablecimiento a tu correo.");
      router.push("/newpassword");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div style={styles.mainContainer}>
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
              placeholder="Email o Usuario"
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
            <a href="#" onClick={handleForgotPassword} style={styles.link}>Olvidé mi contraseña</a>
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>


      </div>
    </div>
     //  <button style={styles.googleButton}>   <img src="imagenes/google.png" alt="Google icon" style={styles.googleIcon} />    Iniciar Sesión con Google  </button>  
     
  );
};

const styles = {
  mainContainer: {
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
    fontWeight: 'bold' as 'bold',
    marginBottom: '20px',
    marginTop: '-100px',
  },
  loginBox: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#fff',
    padding: '70px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
    textAlign: 'center' as 'center',
    marginTop: '-10px',
  },
  title: {
    fontSize: '20px',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: 'normal',
    color: '#333',
    textAlign: 'left' as 'left',
    marginLeft: '-38px',
    marginTop: '-30px',
  },
  subtitle: {
    fontSize: '48px',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: '500',
    color: '#333',
    letterSpacing: '-1.5px', // Menos espacio entre letras
    marginTop: '-7px',
    textAlign: 'left' as 'left',
    marginLeft: '-38px',
  },
  registerLink: {
    fontSize: '14px',
    color: '#888',
    textAlign: 'left' as 'left',
    marginLeft: '-38px',
    marginTop: '-10px',
  },
  link: {
    color: '#EA95C4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '40px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
  label: {
    fontSize: '14px',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: 'normal',
    color: '#333',
    marginBottom: '15px',
    textAlign: 'left' as 'left',
    marginLeft: '-38px',
    marginTop: '25px',
  },
  input: {
    width: '115%',
    padding: '15px',
    fontSize: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s',
    textAlign: 'left' as 'left',
    marginLeft: '-38px',
  },
  forgotPassword: {
    textAlign: 'right' as 'right',
    fontSize: '12px',
    marginTop: '-28px',
    marginRight: '-12px',
  },
  button: {
    width: '115%',
    padding: '12px',
    fontSize: '18px',
    backgroundColor: '#EA95C4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '-20 px',
    marginLeft: '-38px',
    
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
