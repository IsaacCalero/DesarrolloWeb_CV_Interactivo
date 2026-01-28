// Importar hooks de React para gestionar estado y efectos secundarios
import { useState, useEffect } from 'react';
// Importar iconos de lucide-react para la interfaz visual
import { Briefcase, Plus, Edit2, Trash2, Save, X, Clock } from 'lucide-react';

// Componente Experiencia: gestiona la visualización y edición de experiencia laboral
// Props:
//   - experiencias: array de objetos con los datos de experiencia del backend
//   - onAdd: función para agregar una nueva experiencia
//   - onUpdate: función para actualizar una experiencia existente
//   - onDelete: función para eliminar una experiencia
//   - isEditingMode: boolean que indica si está en modo edición
//   - darkMode: boolean para aplicar tema oscuro
const Experiencia = ({ experiencias, onAdd, onUpdate, onDelete, isEditingMode, darkMode }) => {
    // Estado para mostrar/ocultar el formulario
    const [showForm, setShowForm] = useState(false);
    // Estado para almacenar el ID de la experiencia siendo editada (null si es nueva)
    const [editingId, setEditingId] = useState(null);
    
    // Estado del formulario sincronizado con el esquema Experience del backend
    // Los nombres de los campos deben coincidir exactamente con los del modelo
    const [formData, setFormData] = useState({
        company: '',       // Nombre de la empresa
        position: '',      // Puesto o cargo desempeñado
        startDate: '',     // Fecha de inicio del trabajo
        endDate: '',       // Fecha de finalización (opcional si aún trabaja allí)
        description: ''    // Descripción de responsabilidades y logros
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

        // VALIDACIÓN: Verifica que todos los campos obligatorios estén completos
        // Según el modelo Experience del backend, estos campos son required: true
        // - company: nombre de la empresa (obligatorio)
        // - position: puesto desempeñado (obligatorio)
        // - startDate: fecha de inicio (obligatorio)
        // - description: descripción de logros (obligatorio)
        // - endDate: es opcional, permite trabajos actuales
        if (!formData.company || !formData.position || !formData.startDate || !formData.description) {
            alert("Por favor, completa los campos obligatorios: Empresa, Puesto, Fecha Inicio y Descripción.");
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
    // Carga los datos de la experiencia seleccionada en el formulario
    const handleEdit = (exp) => {
        // Cargar los datos de la experiencia en formData (usar || '' para evitar undefined)
        setFormData({
            company: exp.company || '',
            position: exp.position || '',
            startDate: exp.startDate || '',
            endDate: exp.endDate || '',
            description: exp.description || ''
        });
        // Guardar el ID de la experiencia que se está editando (_id es el identificador de MongoDB)
        setEditingId(exp._id);
        // Mostrar el formulario
        setShowForm(true);
    };

    // Manejador para cancelar la edición
    // Resetea el formulario a sus valores iniciales
    const handleCancel = () => {
        setFormData({
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: ''
        });
        setEditingId(null);
        setShowForm(false);
    };

    // Manejador para eliminar una experiencia con confirmación
    const confirmDelete = (id) => {
        // Solicitar confirmación al usuario antes de eliminar permanentemente
        if (window.confirm('¿Estás seguro de eliminar esta experiencia?')) {
            onDelete(id);
        }
    };

    // --- ESTILOS DINÁMICOS (con soporte para modo oscuro) ---

    // Clases para la tarjeta principal del componente
    const cardClasses = `p-6 rounded-xl shadow-lg transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border border-gray-700 text-white' : 'bg-white border border-gray-200 text-gray-800'
    }`;

    // Clases para los campos de entrada del formulario (con enfoque en naranja)
    const inputClasses = `w-full p-3 rounded-lg border focus:ring-2 focus:ring-orange-500 transition-all outline-none duration-200 ${
        darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
    }`;

    // Clases para los items de experiencias listadas (con borde naranja)
    const itemClasses = `p-4 rounded-lg border-l-4 transition-all duration-300 ${
        darkMode ? 'bg-gray-700 border-orange-500 hover:bg-gray-600' : 'bg-gray-50 border-orange-500 hover:bg-gray-100'
    }`;

    return (
        <div className={cardClasses}>
            {/* ENCABEZADO CON TÍTULO Y BOTÓN AGREGAR */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Briefcase size={24} className="text-orange-500" />
                    Experiencia Laboral
                </h2>
                
                {/* Botón para agregar nueva experiencia (solo en modo edición) */}
                {isEditingMode && !showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-md"
                    >
                        <Plus size={18} className="mr-2" /> Agregar
                    </button>
                )}
            </div>

            {/* FORMULARIO DE AGREGAR/EDITAR (solo visible en modo edición) */}
            {showForm && isEditingMode && (
                <div className={`mb-6 p-5 rounded-xl border-4 border-dashed border-orange-500/50 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h3 className="text-xl font-bold mb-4">
                        {editingId ? 'Editar Experiencia' : 'Nueva Experiencia'}
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Campo Puesto - OBLIGATORIO */}
                            <div>
                                <label className="block font-semibold mb-2 text-sm opacity-70">Puesto *</label>
                                <input type="text" name="position" value={formData.position} onChange={handleChange} className={inputClasses} placeholder="Ej: Senior Developer" required />
                            </div>
                            {/* Campo Empresa - OBLIGATORIO */}
                            <div>
                                <label className="block font-semibold mb-2 text-sm opacity-70">Empresa *</label>
                                <input type="text" name="company" value={formData.company} onChange={handleChange} className={inputClasses} placeholder="Ej: Tech Solutions" required />
                            </div>
                        </div>

                        {/* Fechas de inicio y fin */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Campo Fecha Inicio - OBLIGATORIO */}
                            <div>
                                <label className="block font-semibold mb-2 text-sm opacity-70">Fecha Inicio *</label>
                                <input type="text" name="startDate" value={formData.startDate} onChange={handleChange} className={inputClasses} placeholder="Ej: Enero 2020" required />
                            </div>
                            {/* Campo Fecha Fin - OPCIONAL (para trabajos actuales) */}
                            <div>
                                <label className="block font-semibold mb-2 text-sm opacity-70">Fecha Fin</label>
                                <input type="text" name="endDate" value={formData.endDate} onChange={handleChange} className={inputClasses} placeholder="Ej: Presente o Dic 2023" />
                            </div>
                        </div>

                        {/* Campo Descripción - OBLIGATORIO */}
                        <div>
                            <label className="block font-semibold mb-2 text-sm opacity-70">Descripción *</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className={`${inputClasses} resize-none`} rows="4" placeholder="Describe tus logros y responsabilidades..." required />
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

            {/* LISTA DE EXPERIENCIAS */}
            <div className="space-y-4">
                {experiencias.length === 0 ? (
                    // Mensaje cuando no hay experiencias registradas
                    <p className="text-center py-8 italic opacity-50">No hay experiencias registradas.</p>
                ) : (
                    // Mapear y mostrar cada experiencia
                    experiencias.map((exp) => (
                        <div key={exp._id} className={itemClasses}>
                            <div className="flex justify-between items-start gap-4">
                                {/* Información de la experiencia */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-orange-500">{exp.position}</h3>
                                    <p className="font-semibold">{exp.company}</p>
                                    {/* Mostrar fechas con icono de reloj */}
                                    <p className="text-sm flex items-center gap-1 opacity-70">
                                        <Clock size={14} /> {exp.startDate} — {exp.endDate || 'Presente'}
                                    </p>
                                    {/* Mostrar descripción con saltos de línea preservados */}
                                    <p className="mt-3 text-sm italic opacity-80 whitespace-pre-line">{exp.description}</p>
                                </div>
                                
                                {/* Botones de edición y eliminación (solo en modo edición) */}
                                {isEditingMode && (
                                    <div className="flex gap-2">
                                        {/* Botón Editar con tooltip */}
                                        <button 
                                            onClick={() => handleEdit(exp)} 
                                            className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                            title="Editar"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        {/* Botón Eliminar con tooltip */}
                                        <button 
                                            onClick={() => confirmDelete(exp._id)} 
                                            className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
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

// Exportar el componente para usarlo en otras partes de la aplicación
export default Experiencia;