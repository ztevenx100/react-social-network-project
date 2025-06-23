import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import './Profile.css';

// Interfaz para tipar los datos del usuario
interface UserData {
  name: string;
  lastname: string;
  alias: string;
  birthdate: string;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<UserData>('/auth/profile');
        setUserData(response.data);
        setError(null);
      } catch (err) {
        setError('Error al cargar el perfil. Por favor, intenta iniciar sesión de nuevo.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // El array vacío asegura que se ejecute solo una vez

  // Función para obtener las iniciales del usuario
  const getInitials = (name: string, lastname: string) => {
    return `${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return <div className="profile-container">Cargando perfil...</div>;
  }

  if (error) {
    return <div className="profile-container error-message">{error}</div>;
  }

  if (!userData) {
    return <div className="profile-container">No se encontraron datos del perfil.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <span>{getInitials(userData.name, userData.lastname)}</span>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{userData.name} {userData.lastname}</h1>
            <p className="profile-alias">@{userData.alias}</p>
          </div>
        </div>
        <div className="profile-details">
          <p><strong>Fecha de Nacimiento:</strong> {new Date(userData.birthdate).toLocaleDateString()}</p>
          {/* Puedes añadir más detalles aquí en el futuro */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
