import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { loadFromLocalStorage, saveToLocalStorage } from './utils/localStorage';
import { initialData } from './data/initialData';

// Componentes y Páginas
import NavBar from './components/NavBar'; 
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import PostDetailPage from './pages/PostDetailPage';
// 🚨 Importamos el hook de contexto para obtener 'darkMode' en App.jsx
import { useCvContext } from './context/CvContext'; 

function App() {
    // 🚨 Usamos el hook de contexto para obtener el estado del tema
    const { darkMode } = useCvContext(); 

    // Manejo de estado local estático (Header y Datos Personales)
    const [data, setData] = useState(() => {
        const saved = loadFromLocalStorage();
        if (saved) {
            return { 
                header: saved.header || initialData.header,
                datosPersonales: saved.datosPersonales || initialData.datosPersonales
            };
        }
        return initialData;
    });

    const [isEditingMode, setIsEditingMode] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    // Lógica para guardar datos estáticos en localStorage
    useEffect(() => {
        saveToLocalStorage({
            header: data.header,
            datosPersonales: data.datosPersonales
        });
    }, [data]);

    // Lógica para el efecto Parallax
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handlers para actualizar datos estáticos
    const staticHandlers = {
        handleUpdateHeader: (newHeaderData) => setData({ ...data, header: newHeaderData }),
        handleUpdateDatosPersonales: (newDatosPersonales) => setData({ ...data, datosPersonales: newDatosPersonales }),
    };
    
    return (
        // 🚨 CORRECCIÓN CRÍTICA PARA VISIBILIDAD (PANTALLA EN BLANCO)
        // Aplicamos las clases de fondo y texto dependientes del tema (darkMode)
        <div className={`min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-500`}>
            
            {/* Fondo con efecto Parallax */}
            <div
                className="fixed inset-0 -z-10 opacity-20 dark:opacity-5 transition-opacity duration-500"
                style={{
                    backgroundImage: 'linear-gradient(45deg, #3b82f6 25%, transparent 25%), linear-gradient(-45deg, #3b82f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #3b82f6 75%), linear-gradient(-45deg, transparent 75%, #3b82f6 75%)',
                    backgroundSize: '60px 60px',
                    backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px',
                    transform: `translateY(${scrollY * 0.5}px)`
                }}
            />

            {/* Barra de Navegación */}
            <NavBar
                isEditingMode={isEditingMode}
                setIsEditingMode={setIsEditingMode}
            />

            {/* Contenido principal: Rutas */}
            <main className="max-w-6xl mx-auto p-6 space-y-6">
                <Routes>
                    {/* Ruta 1: Hoja de Vida (CV) */}
                    <Route
                        path="/"
                        element={<HomePage data={data} isEditingMode={isEditingMode} {...staticHandlers} />}
                    />
                    
                    {/* Rutas 2 & 3: Blog */}
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:id" element={<PostDetailPage />} />
                    
                    {/* Ruta 404 */}
                    <Route path="*" element={
                        <div className="text-center py-20 text-2xl font-bold text-red-500">
                            404 | Página no encontrada
                        </div>
                    } />
                </Routes>
            </main>
        </div>
    ); 
}

export default App;