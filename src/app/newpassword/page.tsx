"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/components/supabaseClient"; // Verifica la ruta correcta

const NewPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const token = searchParams.get("token");

  const handleResetPassword = async () => {
    try {
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Restablecer Contraseña</h2>
        {success ? (
          <p style={styles.success}>
            Contraseña restablecida con éxito. Redirigiendo al login...
          </p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nueva Contraseña</label>
              <input
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            {error && <p style={styles.error}>{error}</p>}
            <button type="submit" style={styles.button}>
              Restablecer Contraseña
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f7fa',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  header: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    outline: 'none',
    marginBottom: '15px',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '18px',
    backgroundColor: '#EA95C4',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 2px 4px rgba(234, 149, 196, 0.4)',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  },
  success: {
    color: 'green',
    fontSize: '16px',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '10px',
  },
};

export default NewPassword;
