import { useState } from 'react';
import { getProfile, updateProfile, deleteProfile } from '../services/profile.service';

const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleGetProfile = async () => {
    console.log('Obtener perfil');
    const data = await getProfile();
    setProfileData(data);
    setIsEditing(false);
  };

  const handleEditProfile = async () => {
    console.log('Editar perfil');
    if (!profileData?.email || !profileData?.password) {
      alert("Debes ingresar un email y una contraseña");
      return;
    }
    const updatedData = {
      email: profileData.email,
      password: profileData.password
    };
    const response = await updateProfile(updatedData);
    if (response.success) {
      alert("Perfil actualizado exitosamente");
      setIsEditing(false); 
      const freshProfile = await getProfile();
      setProfileData(freshProfile);
    } else {
      console.error(response.message);
      alert(response.message);
    }
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    if (profileData) {
      handleGetProfile();
    }
  };

  const handleDeleteProfile = async () => {
    console.log('Eliminar perfil');
    const response = await deleteProfile();
    if (response.success) {
      setProfileData(null);
      setIsEditing(false);
    } else {
      console.error(response.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-2xl transform transition-all hover:scale-105">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Página de Inicio
        </h1>
        
        <div className="space-y-6">
          <button 
            onClick={handleGetProfile} 
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
            style={{ fontSize: '18px', padding: '15px 30px' }}
          >
            Obtener Perfil
          </button>
          
          {profileData && !isEditing && (
            <button
              onClick={startEditing}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
              style={{ fontSize: '18px', padding: '15px 30px' }}
            >
              Editar Perfil
            </button>
          )}
          
          {isEditing && (
            <div className="mt-6 space-y-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Editar Perfil</h2>
              <input
                type="email"
                placeholder="Email"
                value={profileData?.email || ''}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-300"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={profileData?.password || ''}
                onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-300"
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleEditProfile}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={cancelEditing}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
          
          {profileData && !isEditing && (
            <button
              onClick={handleDeleteProfile}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-300"
              style={{ fontSize: '18px', padding: '15px 30px' }}
            >
              Eliminar Perfil
            </button>
          )}
        </div>

        {profileData && !isEditing && (
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Información del Perfil</h2>
            <pre className="text-sm text-gray-700 overflow-auto">{JSON.stringify(profileData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;