import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';

const DatosPersonales = ({ data, onUpdate, isEditingMode, darkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data);
  const [newHobby, setNewHobby] = useState('');

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

  const handleAddHobby = () => {
    if (newHobby.trim() && !formData.hobbies.includes(newHobby.trim())) {
      setFormData({
        ...formData,
        hobbies: [...formData.hobbies, newHobby.trim()]
      });
      setNewHobby('');
    }
  };

  const handleRemoveHobby = (hobbyToRemove) => {
    setFormData({
      ...formData,
      hobbies: formData.hobbies.filter(hobby => hobby !== hobbyToRemove)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(data);
    setNewHobby('');
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
          Editar Datos Personales
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={inputClasses}
              placeholder="+593 99 999 9999"
              required
            />
          </div>

          <div>
            <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Ubicación
            </label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Ciudad, País"
              required
            />
          </div>

          <div>
            <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              GitHub
            </label>
            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className={inputClasses}
              placeholder="github.com/usuario"
            />
          </div>

          <div>
            <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              LinkedIn
            </label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className={inputClasses}
              placeholder="linkedin.com/in/usuario"
            />
          </div>

          {/* Sección de Hobbies */}
          <div>
            <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Hobbies
            </label>
            
            {/* Input para agregar hobby */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHobby())}
                className={inputClasses}
                placeholder="Agregar hobby"
              />
              <button
                type="button"
                onClick={handleAddHobby}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Lista de hobbies */}
            <div className="flex flex-wrap gap-2">
              {formData.hobbies.map((hobby, index) => (
                <span
                  key={index}
                  className={`px-3 py-2 rounded-full flex items-center gap-2 ${
                    darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {hobby}
                  <button
                    type="button"
                    onClick={() => handleRemoveHobby(hobby)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
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
      <div className="flex justify-between items-start mb-4">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Datos Personales
        </h2>
        {isEditingMode && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors shadow-md"
          >
            <Edit2 size={16} className="mr-2" /> Editar
          </button>
        )}
      </div>

      <div className="space-y-3">
        {/* Email */}
        <div className="flex items-center gap-3">
          <Mail size={20} className="text-blue-500 flex-shrink-0" />
          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            {data.email}
          </span>
        </div>

        {/* Teléfono */}
        <div className="flex items-center gap-3">
          <Phone size={20} className="text-green-500 flex-shrink-0" />
          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            {data.telefono}
          </span>
        </div>

        {/* Ubicación */}
        <div className="flex items-center gap-3">
          <MapPin size={20} className="text-red-500 flex-shrink-0" />
          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            {data.ubicacion}
          </span>
        </div>

        {/* GitHub - CORREGIDO */}
        {data.github && (
          <div className="flex items-center gap-3">
            <Github size={20} className="text-purple-500 flex-shrink-0" />
            <a
              href={`https://${data.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
            >
              {data.github}
            </a>
          </div>
        )}

        {/* LinkedIn - CORREGIDO */}
        {data.linkedin && (
          <div className="flex items-center gap-3">
            <Linkedin size={20} className="text-blue-600 flex-shrink-0" />
            <a
              href={`https://${data.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
            >
              {data.linkedin}
            </a>
          </div>
        )}

        {/* Hobbies */}
        <div className="pt-4">
          <h3 className={`font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Hobbies & Intereses
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.hobbies.map((hobby, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                }`}
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosPersonales;