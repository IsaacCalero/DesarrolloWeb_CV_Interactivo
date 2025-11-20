import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { initialData } from './data/initialData';
import { saveToLocalStorage, loadFromLocalStorage, saveTheme, loadTheme } from './utils/localStorage';
import Header from './components/Header';
import DatosPersonales from './components/DatosPersonales';
import Experiencia from './components/Experiencia';
import Estudios from './components/Estudios';

function App() {
  const [data, setData] = useState(() => {
    const saved = loadFromLocalStorage();
    return saved || initialData;
  });

  const [darkMode, setDarkMode] = useState(() => loadTheme());
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Guardar datos cuando cambien
  useEffect(() => {
    saveToLocalStorage(data);
  }, [data]);

  // Guardar tema cuando cambie
  useEffect(() => {
    saveTheme(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ============================================
  // HANDLERS - Header y DatosPersonales
  // ============================================
  const handleUpdateHeader = (newHeaderData) => {
    setData({ ...data, header: newHeaderData });
  };

  const handleUpdateDatosPersonales = (newDatosPersonales) => {
    setData({ ...data, datosPersonales: newDatosPersonales });
  };

  // ============================================
  // HANDLERS CRUD - Experiencia
  // ============================================
  const handleAddExperiencia = (nuevaExperiencia) => {
    const newExp = {
      id: Date.now(),
      ...nuevaExperiencia
    };
    setData({
      ...data,
      experiencia: [...data.experiencia, newExp]
    });
  };

  const handleUpdateExperiencia = (id, experienciaActualizada) => {
    setData({
      ...data,
      experiencia: data.experiencia.map(exp =>
        exp.id === id ? { ...exp, ...experienciaActualizada } : exp
      )
    });
  };

  const handleDeleteExperiencia = (id) => {
    setData({
      ...data,
      experiencia: data.experiencia.filter(exp => exp.id !== id)
    });
  };

  // ============================================
  // HANDLERS CRUD - Estudios
  // ============================================
  const handleAddEstudio = (nuevoEstudio) => {
    const newEstudio = {
      id: Date.now(),
      ...nuevoEstudio
    };
    setData({
      ...data,
      estudios: [...data.estudios, newEstudio]
    });
  };

  const handleUpdateEstudio = (id, estudioActualizado) => {
    setData({
      ...data,
      estudios: data.estudios.map(est =>
        est.id === id ? { ...est, ...estudioActualizado } : est
      )
    });
  };

  const handleDeleteEstudio = (id) => {
    setData({
      ...data,
      estudios: data.estudios.filter(est => est.id !== id)
    });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Fondo con efecto Parallax */}
      <div
        className="fixed inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(45deg, #3b82f6 25%, transparent 25%), linear-gradient(-45deg, #3b82f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #3b82f6 75%), linear-gradient(-45deg, transparent 75%, #3b82f6 75%)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px',
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      />

      {/* Barra superior */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-4 sticky top-0 z-10`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Hoja de Vida</h1>

          <div className="flex gap-3">
            {/* Botón de modo edición */}
            <button
              onClick={() => setIsEditingMode(!isEditingMode)}
              className={`px-4 py-2 font-bold rounded-lg transition-colors shadow-md ${isEditingMode
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
            >
              {isEditingMode ? '🔒 Bloquear Edición' : '✏️ Activar Edición'}
            </button>

            {/* Botón de modo oscuro */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-lg ${darkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-800 hover:bg-gray-700'
                } text-white flex items-center gap-2`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Fila 1: Header y Datos Personales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Header
            data={data.header}
            onUpdate={handleUpdateHeader}
            isEditingMode={isEditingMode}
            darkMode={darkMode}
          />

          <DatosPersonales
            data={data.datosPersonales}
            onUpdate={handleUpdateDatosPersonales}
            isEditingMode={isEditingMode}
            darkMode={darkMode}
          />
        </div>

        {/* Fila 2: Experiencia y Estudios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Experiencia
            experiencias={data.experiencia}
            onAdd={handleAddExperiencia}
            onUpdate={handleUpdateExperiencia}
            onDelete={handleDeleteExperiencia}
            isEditingMode={isEditingMode}
            darkMode={darkMode}
          />

          <Estudios
            estudios={data.estudios}
            onAdd={handleAddEstudio}
            onUpdate={handleUpdateEstudio}
            onDelete={handleDeleteEstudio}
            isEditingMode={isEditingMode}
            darkMode={darkMode}
          />
        </div>        
      </div>
    </div>
  ); 
}

export default App;