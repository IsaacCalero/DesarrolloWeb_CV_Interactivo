import { useState, useEffect } from 'react';
import { Edit2, Save, X } from 'lucide-react';

const Header = ({ data, onUpdate, isEditingMode, darkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data);

  // Sincronizar cuando cambian las props
  useEffect(() => {
    setFormData(data);
  }, [data]);

  // Cerrar modo edición si se desactiva globalmente
  useEffect(() => {
    if (!isEditingMode) {
      setIsEditing(false);
    }
  }, [isEditingMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(data); // Restaurar datos originales
    setIsEditing(false);
  };

  // Estilos dinámicos
  const cardClasses = `p-6 rounded-xl shadow-lg relative transition-all duration-300 ${
    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
  }`;

  const inputClasses = `w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all outline-none ${
    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-800'
  }`;

  // Modo de edición
  if (isEditing && isEditingMode) {
    return (
      <div className={cardClasses}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Editar Header
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Nombre Completo
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Tu nombre completo"
              required
            />
          </div>

          <div>
            <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Título Profesional
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Ej: Desarrollador Full Stack"
              required
            />
          </div>

          <div>
            <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              URL de Foto de Perfil
            </label>
            <input
              type="url"
              name="foto"
              value={formData.foto}
              onChange={handleChange}
              className={inputClasses}
              placeholder="https://ejemplo.com/foto.jpg"
            />
            {formData.foto && (
              <img
                src={formData.foto}
                alt="Preview"
                className="w-20 h-20 rounded-full mt-3 border-2 border-blue-500"
                onError={(e) => {
                  e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Default';
                }}
              />
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md"
            >
              <Save size={18} className="mr-2" /> Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors shadow-md"
            >
              <X size={18} className="mr-2" /> Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Modo de visualización
  return (
    <div className={cardClasses}>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Foto de perfil */}
        <img
          src={data.foto}
          alt={data.nombre}
          className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover shadow-lg"
          onError={(e) => {
            e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Default';
          }}
        />

        {/* Información */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className={`text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {data.nombre}
          </h1>
          <p className={`text-lg mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {data.titulo}
          </p>
        </div>

        {/* Botón de edición */}
        {isEditingMode && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors shadow-md"
          >
            <Edit2 size={16} className="mr-2" /> Editar
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;