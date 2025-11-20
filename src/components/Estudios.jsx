import { useState, useEffect } from 'react';
import { GraduationCap, Plus, Edit2, Trash2, Save, X, Clock } from 'lucide-react';

const Estudios = ({ estudios, onAdd, onUpdate, onDelete, isEditingMode, darkMode }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    institucion: '',
    titulo: '',
    periodo: '',
    descripcion: ''
  });

  // Cerrar formulario si se desactiva el modo edición
  useEffect(() => {
    if (!isEditingMode) {
      setShowForm(false);
      setEditingId(null);
    }
  }, [isEditingMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Actualizar estudio existente
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      // Agregar nuevo estudio
      onAdd(formData);
    }
    
    // Resetear formulario
    setFormData({
      institucion: '',
      titulo: '',
      periodo: '',
      descripcion: ''
    });
    setShowForm(false);
  };

  const handleEdit = (estudio) => {
    setFormData({
      institucion: estudio.institucion,
      titulo: estudio.titulo,
      periodo: estudio.periodo,
      descripcion: estudio.descripcion
    });
    setEditingId(estudio.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({
      institucion: '',
      titulo: '',
      periodo: '',
      descripcion: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este estudio?')) {
      onDelete(id);
    }
  };

  // Estilos dinámicos
  const cardClasses = `p-6 rounded-xl shadow-lg transition-all duration-300 ${
    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
  }`;

  const inputClasses = `w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all outline-none ${
    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-800'
  }`;

  const itemClasses = `p-4 rounded-lg border-l-4 transition-all duration-300 ${
    darkMode ? 'bg-gray-700 border-blue-500' : 'bg-gray-50 border-blue-500'
  }`;

  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <GraduationCap size={24} className="text-blue-500" />
          Formación Académica
        </h2>
        
        {isEditingMode && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-md"
          >
            <Plus size={18} className="mr-2" /> Agregar
          </button>
        )}
      </div>

      {/* Formulario de Agregar/Editar */}
      {showForm && isEditingMode && (
        <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {editingId ? 'Editar Estudio' : 'Nuevo Estudio'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Título/Grado
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Ej: Ingeniería en Sistemas"
                required
              />
            </div>

            <div>
              <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Institución
              </label>
              <input
                type="text"
                name="institucion"
                value={formData.institucion}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Ej: Universidad Central del Ecuador"
                required
              />
            </div>

            <div>
              <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Período
              </label>
              <input
                type="text"
                name="periodo"
                value={formData.periodo}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Ej: 2018 - 2022"
                required
              />
            </div>

            <div>
              <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Descripción (Opcional)
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className={`${inputClasses} resize-none`}
                placeholder="Logros, menciones honoríficas, especialización..."
                rows="3"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md"
              >
                <Save size={18} className="mr-2" /> {editingId ? 'Actualizar' : 'Guardar'}
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
      )}

      {/* Lista de Estudios */}
      <div className="space-y-4">
        {estudios.length === 0 ? (
          <p className={`text-center py-8 italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No hay estudios registrados. 
            {isEditingMode && ' Haz clic en "Agregar" para crear uno.'}
          </p>
        ) : (
          estudios.map((estudio) => (
            <div key={estudio.id} className={itemClasses}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    {estudio.titulo}
                  </h3>
                  <p className={`font-semibold mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {estudio.institucion}
                  </p>
                  <p className={`text-sm flex items-center gap-1 mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Clock size={14} />
                    {estudio.periodo}
                  </p>
                  {estudio.descripcion && (
                    <p className={`mt-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                      {estudio.descripcion}
                    </p>
                  )}
                </div>

                {/* Botones de acciones */}
                {isEditingMode && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(estudio)}
                      className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(estudio.id)}
                      className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Estudios;