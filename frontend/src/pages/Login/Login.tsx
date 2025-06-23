import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../api/apiClient';
import { useAuthStore } from '../../store/auth.store';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { setToken, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await apiClient.post<{ token: string }>('/auth/login', {
        email,
        password,
      });
      const token = response.data.token;
      setToken(token);

      // Después de obtener el token, pedimos el perfil del usuario
      const profileResponse = await apiClient.get('/auth/profile');
      setUser(profileResponse.data); // <-- Guardamos el perfil en el store

      navigate('/profile'); // Redirigir al perfil
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Error al iniciar sesión');
      } else {
        setError('Ocurrió un error inesperado');
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
