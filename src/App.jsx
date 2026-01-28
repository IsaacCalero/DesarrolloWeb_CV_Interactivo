import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Añadimos Navigate
import { loadFromLocalStorage, saveToLocalStorage } from './utils/localStorage';
import { initialData } from './data/initialData';

// Componentes y Páginas
import NavBar from './components/NavBar'; 
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import PostDetailPage from './pages/PostDetailPage';
import LoginPage from './pages/LoginPage';
import PostForm from './pages/PostForm'; // 🚀 NUEVO: Importamos el formulario
import { useCvContext } from './context/CvContext'; 

// 🚀 NUEVO: Componente para proteger la ruta de creación
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    const { darkMode } = useCvContext(); 

    // Manejo de estado local estático
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

    useEffect(() => {
        saveToLocalStorage({
            header: data.header,
            datosPersonales: data.datosPersonales
        });
    }, [data]);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const staticHandlers = {
        handleUpdateHeader: (newHeaderData) => setData({ ...data, header: newHeaderData }),
        handleUpdateDatosPersonales: (newDatosPersonales) => setData({ ...data, datosPersonales: newDatosPersonales }),
    };
    
    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-500`}>
            
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
                    
                    {/* Ruta para el Login */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* 🚀 NUEVO: Ruta para crear posts (Protegida) */}
                    <Route 
                        path="/admin/posts/nuevo" 
                        element={
                            <PrivateRoute>
                                <PostForm />
                            </PrivateRoute>
                        } 
                    />
                    
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