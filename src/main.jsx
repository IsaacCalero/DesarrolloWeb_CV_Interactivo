import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Componentes de CV (Aunque no se usen directamente aquí, es mejor corregir la ruta de importación)
// 🚨 CORRECCIÓN: Rutas de importación corregidas de "../components/" a "./components/"
// Aunque estos componentes no se rendericen aquí, Vite busca estas importaciones.
// Si no los usas en main.jsx, puedes borrarlos, pero por seguridad, corregimos la ruta.
import Header from "./components/Header";
import DatosPersonales from "./components/DatosPersonales";
import Experiencia from "./components/Experiencia";
import Estudios from "./components/Estudios";

// 🚨 CONTEXTO CRÍTICO: Aseguramos la importación del CvProvider (que contiene el tema)
import { CvProvider } from './context/CvContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 🚨 ENVOLTURA: Usar el CvProvider para que useCvContext() funcione en toda la App */}
      <CvProvider> 
        <App />
      </CvProvider>
    </BrowserRouter>
  </React.StrictMode>,
);