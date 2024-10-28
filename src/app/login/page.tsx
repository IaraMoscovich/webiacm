"use client";

import React, { useState } from "react";
import { createClient } from "@/components/supabaseClient";
import { useRouter } from "next/navigation";
import  bcrypt  from 'bcryptjs';


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
      // Verificar si el usuario tiene la solicitud aceptada
      console.log(email);
      const { data: solicitud, error: solicitudError } = await supabase
        .from("solicitudes")
        .select()
        .eq("email", email)
        

      console.log(solicitud);
      if (solicitudError) {
        console.error("Error al consultar la solicitud:", solicitudError);
        console.log(solicitudError);
        throw new Error("Error al verificar la solicitud.");
      }

      if (!solicitud) {
        throw new Error("No se encontró una solicitud para este correo.");
      } else if (solicitud[0].status !== "Aceptado") {
        throw new Error("Tu solicitud no ha sido aprobada o fue denegada.");
      }
      let compared = await bcrypt.compareSync(password, solicitud[0].password);
      if (!compared){
        throw new Error("Contraseña incorrecta");
      }
      // Intentar iniciar sesión en Supabase
    

    

      alert("Login exitoso, bienvenido.");
      router.push("/"); // Redirigir al usuario al dashboard
    } catch (error) {
      console.error("Error:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

// Estilos en línea para el componente
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    width: '300px',
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
  },
};

export default Login;
