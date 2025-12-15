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

    // Cerrar formulario si se desactiva el modo edición global
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
        
        // Verifica si los campos requeridos no están vacíos
        if (!formData.institucion || !formData.titulo || !formData.periodo) {
            alert("Por favor, completa los campos obligatorios.");
            return;
        }

        if (editingId) {
            // Llama a onUpdate (Axios PUT en useCvData)
            onUpdate(editingId, formData);
        } else {
            // Llama a onAdd (Axios POST en useCvData)
            // JSON Server le asignará el ID automáticamente
            onAdd(formData);
        }
        
        // Resetear formulario y cerrar
        handleCancel();
    };

    const handleEdit = (estudio) => {
        setFormData({
            institucion: estudio.institucion,
            titulo: estudio.titulo,
            periodo: estudio.periodo,
            descripcion: estudio.descripcion // La descripción puede ser null/undefined si JSON Server no la tiene
        });
        setEditingId(estudio.id); // ¡CRUCIAL! Este es el ID usado por Axios para PUT/DELETE
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

    const confirmDelete = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este estudio de forma permanente?')) {
            // Llama a onDelete (Axios DELETE en useCvData)
            onDelete(id);
        }
    };

    // Estilos dinámicos
    const cardClasses = `p-6 rounded-xl shadow-lg transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`;

    const inputClasses = `w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all outline-none duration-200 ${
        darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
    }`;

    const itemClasses = `p-4 rounded-lg border-l-4 transition-all duration-300 ${
        darkMode ? 'bg-gray-700 border-blue-500 hover:bg-gray-600' : 'bg-gray-50 border-blue-500 hover:bg-gray-100'
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
                <div 
                    className={`mb-6 p-5 rounded-xl border-4 border-dashed border-blue-500/50 transition-colors duration-300 ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                >
                    <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {editingId ? 'Editar Estudio' : 'Nuevo Estudio'}
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Título/Grado <span className="text-red-500">*</span>
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
                                Institución <span className="text-red-500">*</span>
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
                                Período <span className="text-red-500">*</span>
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
                                        <p className={`mt-3 text-sm italic ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                                            {estudio.descripcion}
                                        </p>
                                    )}
                                </div>

                                {/* Botones de acciones */}
                                {isEditingMode && (
                                    <div className="flex gap-2 flex-shrink-0">
                                        <button
                                            // Deshabilitar edición si el mismo elemento está siendo editado en el formulario
                                            onClick={() => handleEdit(estudio)}
                                            disabled={editingId === estudio.id} 
                                            className={`p-2 rounded-lg transition-colors ${
                                                editingId === estudio.id 
                                                ? 'text-gray-400 cursor-not-allowed' 
                                                : 'text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900'
                                            }`}
                                            title="Editar"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => confirmDelete(estudio.id)}
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