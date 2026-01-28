// Importar hooks de React para gestionar estado y efectos secundarios
import { useState, useEffect } from 'react';
// Importar iconos de lucide-react para la interfaz visual
import { GraduationCap, Plus, Edit2, Trash2, Save, X, Clock } from 'lucide-react';

// Componente Estudios: gestiona la visualización y edición de formación académica
// Props:
//   - estudios: array de objetos con los datos de educación del backend
//   - onAdd: función para agregar un nuevo estudio
//   - onUpdate: función para actualizar un estudio existente
//   - onDelete: función para eliminar un estudio
//   - isEditingMode: boolean que indica si está en modo edición
//   - darkMode: boolean para aplicar tema oscuro
const Estudios = ({ estudios, onAdd, onUpdate, onDelete, isEditingMode, darkMode }) => {
    // Estado para mostrar/ocultar el formulario
    const [showForm, setShowForm] = useState(false);
    // Estado para almacenar el ID del estudio siendo editado (null si es nuevo)
    const [editingId, setEditingId] = useState(null);
    
    // Estado del formulario sincronizado con el esquema Education del backend
    // Los nombres de los campos deben coincidir exactamente con los del modelo
    const [formData, setFormData] = useState({
        institution: '',   // Nombre de la institución educativa
        degree: '',        // Título o grado académico
        fieldOfStudy: '',  // Área de estudio
        startDate: '',     // Fecha de inicio
        endDate: '',       // Fecha de finalización
        description: ''    // Descripción adicional
    });

    // Hook useEffect: se ejecuta cuando cambia isEditingMode
    // Si el usuario sale del modo edición, resetea el formulario
    useEffect(() => {
        if (!isEditingMode) {
            setShowForm(false);
            setEditingId(null);
        }
    }, [isEditingMode]);

    // Manejador de cambios en los inputs del formulario
    // Actualiza formData cuando el usuario escribe
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Actualiza solo el campo modificado, manteniendo los demás
        setFormData({ ...formData, [name]: value });
    };

    // Manejador del envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validación: los campos institution y degree son obligatorios según el backend
        if (!formData.institution || !formData.degree) {
            alert("Por favor, completa los campos obligatorios (Institución y Título).");
            return;
        }

        // Si editingId existe, es una actualización; si no, es un nuevo registro
        if (editingId) {
            onUpdate(editingId, formData);
        } else {
            onAdd(formData);
        }
        
        // Resetear el formulario después de guardar
        handleCancel();
    };

    // Manejador para entrar en modo edición
    // Carga los datos del estudio seleccionado en el formulario
    const handleEdit = (estudio) => {
        // Cargar los datos del estudio en formData (usar || '' para evitar undefined)
        setFormData({
            institution: estudio.institution || '',
            degree: estudio.degree || '',
            fieldOfStudy: estudio.fieldOfStudy || '',
            startDate: estudio.startDate || '',
            endDate: estudio.endDate || '',
            description: estudio.description || ''
        });
        // Guardar el ID del estudio que se está editando (_id es el identificador de MongoDB)
        setEditingId(estudio._id);
        // Mostrar el formulario
        setShowForm(true);
    };

    // Manejador para cancelar la edición
    // Resetea el formulario a sus valores iniciales
    const handleCancel = () => {
        setFormData({
            institution: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            description: ''
        });
        setEditingId(null);
        setShowForm(false);
    };

    // Manejador para eliminar un estudio con confirmación
    const confirmDelete = (id) => {
        // Solicitar confirmación al usuario antes de eliminar permanentemente
        if (window.confirm('¿Estás seguro de eliminar este estudio permanentemente?')) {
            onDelete(id);
        }
    };

    // --- ESTILOS DINÁMICOS (con soporte para modo oscuro) ---

    // Clases para la tarjeta principal del componente
    const cardClasses = `p-6 rounded-xl shadow-lg transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`;

    // Clases para los campos de entrada del formulario
    const inputClasses = `w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all outline-none duration-200 ${
        darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
    }`;

    // Clases para los items de estudios listados
    const itemClasses = `p-4 rounded-lg border-l-4 transition-all duration-300 ${
        darkMode ? 'bg-gray-700 border-blue-500 hover:bg-gray-600' : 'bg-gray-50 border-blue-500 hover:bg-gray-100'
    }`;

    return (
        <div className={cardClasses}>
            {/* ENCABEZADO CON TÍTULO Y BOTÓN AGREGAR */}
            <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    <GraduationCap size={24} className="text-blue-500" />
                    Formación Académica
                </h2>
                
                {/* Botón para agregar nuevo estudio (solo en modo edición) */}
                {isEditingMode && !showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                    >
                        <Plus size={18} className="mr-2" /> Agregar
                    </button>
                )}
            </div>

            {/* FORMULARIO DE AGREGAR/EDITAR (solo visible en modo edición) */}
            {showForm && isEditingMode && (
                <div className={`mb-6 p-5 rounded-xl border-4 border-dashed border-blue-500/50 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {editingId ? 'Editar Estudio' : 'Nuevo Estudio'}
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Campo Título/Grado - OBLIGATORIO */}
                            <div>
                                <label className="block font-semibold mb-2 text-sm">Título / Grado *</label>
                                <input type="text" name="degree" value={formData.degree} onChange={handleChange} className={inputClasses} placeholder="Ej: Ingeniero" required />
                            </div>
                            {/* Campo Institución - OBLIGATORIO */}
                            <div>
                                <label className="block font-semibold mb-2 text-sm">Institución *</label>
                                <input type="text" name="institution" value={formData.institution} onChange={handleChange} className={inputClasses} placeholder="Ej: Universidad" required />
                            </div>
                        </div>

                        {/* Campo Área de Estudio - OPCIONAL */}
                        <div>
                            <label className="block font-semibold mb-2 text-sm">Campo de Estudio</label>
                            <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} className={inputClasses} placeholder="Ej: Desarrollo de Software" />
                        </div>

                        {/* Fechas de inicio y fin - OPCIONALES */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold mb-2 text-sm">Fecha Inicio</label>
                                <input type="text" name="startDate" value={formData.startDate} onChange={handleChange} className={inputClasses} placeholder="Ej: Enero 2020" />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2 text-sm">Fecha Fin (o Actual)</label>
                                <input type="text" name="endDate" value={formData.endDate} onChange={handleChange} className={inputClasses} placeholder="Ej: Diciembre 2023" />
                            </div>
                        </div>

                        {/* Campo Descripción - OPCIONAL */}
                        <div>
                            <label className="block font-semibold mb-2 text-sm">Descripción</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className={`${inputClasses} resize-none`} rows="3" />
                        </div>

                        {/* Botones Guardar y Cancelar */}
                        <div className="flex gap-3">
                            <button type="submit" className="flex items-center px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 shadow-md">
                                <Save size={18} className="mr-2" /> {editingId ? 'Actualizar' : 'Guardar'}
                            </button>
                            <button type="button" onClick={handleCancel} className="flex items-center px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 shadow-md">
                                <X size={18} className="mr-2" /> Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* LISTA DE ESTUDIOS */}
            <div className="space-y-4">
                {estudios.length === 0 ? (
                    // Mensaje cuando no hay estudios registrados
                    <p className="text-center py-8 italic opacity-50">No hay registros.</p>
                ) : (
                    // Mapear y mostrar cada estudio
                    estudios.map((estudio) => (
                        <div key={estudio._id} className={itemClasses}>
                            <div className="flex justify-between items-start">
                                {/* Información del estudio */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-blue-500">{estudio.degree}</h3>
                                    <p className="font-semibold">{estudio.institution}</p>
                                    {/* Mostrar fechas con icono de reloj */}
                                    <p className="text-sm flex items-center gap-1 opacity-70">
                                        <Clock size={14} /> {estudio.startDate} - {estudio.endDate || 'Actualidad'}
                                    </p>
                                    {/* Mostrar descripción si existe */}
                                    {estudio.description && <p className="mt-2 text-sm italic opacity-80">{estudio.description}</p>}
                                </div>
                                
                                {/* Botones de edición y eliminación (solo en modo edición) */}
                                {isEditingMode && (
                                    <div className="flex gap-2">
                                        {/* Botón Editar */}
                                        <button onClick={() => handleEdit(estudio)} className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg">
                                            <Edit2 size={18} />
                                        </button>
                                        {/* Botón Eliminar */}
                                        <button onClick={() => confirmDelete(estudio._id)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg">
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

// Exportar el componente para usarlo en otras partes de la aplicación
export default Estudios;