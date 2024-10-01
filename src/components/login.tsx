// src/Login.tsx
import React, { useState } from 'react';
import { supabase } from '';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Iniciar sesión con Supabase
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
    } else {
      console.log('Login exitoso');

      // Guardar el email en la tabla Inicio_de_Sesion
      const { data, error: dbError } = await supabase
        .from('Inicio_de_Sesion')
        .insert([{ email }]);

      if (dbError) {
        console.error('Error al guardar en la tabla:', dbError.message);
      } else {
        console.log('Email guardado en Inicio_de_Sesion:', data);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
