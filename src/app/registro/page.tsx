"use client"

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Configura tu cliente Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [hospital, setHospital] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [checking, setChecking] = useState(false); // Nuevo estado para el chequeo
  const [buttonText, setButtonText] = useState('Enviar Solicitud');

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setChecking(true); // Indica que se está chequeando la solicitud
    setButtonText('Enviando...'); // Cambiar el texto del botón al iniciar

    // Guardar la solicitud en Supabase
    const { error: requestError } = await supabase
      .from('solicitudes')
      .insert([{ full_name: fullName, phone, hospital, email }]);

    if (requestError) {
      setError(requestError.message);
      setButtonText('Enviar Solicitud'); // Restablecer texto del botón en caso de error
    } else {
      // Llama a la función para enviar un correo electrónico
      await sendEmailToAdmin(fullName, email);
      setSuccess(true);
      setButtonText('Enviado');
    }

    setLoading(false);
    
    // Temporizador para ocultar el mensaje de chequeo y restablecer el botón
    setTimeout(() => {
      setChecking(false); // Finaliza el chequeo después de 3 segundos
      if (!requestError) {
        setButtonText('Enviar Solicitud'); // Restablece el texto del botón después de 3 segundos
      }
    }, 2000);
  };

  // Función para enviar correo electrónico al administrador
  const sendEmailToAdmin = async (fullName: string, email: string) => {
    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, email }),
    });

    if (!response.ok) {
      throw new Error('Error al enviar el correo');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Enviar Solicitud de Registro</h2>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>Solicitud enviada con éxito!</p>}
      {checking && <p style={styles.checking}>Chequeando solicitud...</p>} {/* Mensaje de chequeo */}
      <form onSubmit={handleSignup} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="fullName">Nombre y Apellido:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="phone">Celular:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="hospital">Hospital/Institución:</label>
          <input
            type="text"
            id="hospital"
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};

// Estilos simples
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  success: {
    color: 'green',
    textAlign: 'center',
  },
  checking: {
    color: 'orange',
    textAlign: 'center',
  },
};

export default Signup;
