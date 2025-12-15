// src/utils/localStorage.js

const DATA_KEY = 'cvData';
const THEME_KEY = 'darkMode';

// Funciones para guardar/cargar la Data (CV)
export const saveToLocalStorage = (data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(DATA_KEY, serializedData);
  } catch (error) {
    console.error("Error al guardar en LocalStorage:", error);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem(DATA_KEY);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error al cargar de LocalStorage:", error);
    return undefined;
  }
};

// Funciones para guardar/cargar el Tema (Ahora crucial para ThemeContext)
export const saveTheme = (isDark) => {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
  } catch (error) {
    console.error("Error al guardar el tema:", error);
  }
};

export const loadTheme = () => {
  try {
    const serializedTheme = localStorage.getItem(THEME_KEY);
    // Modo claro por defecto si no hay tema guardado
    if (serializedTheme === null) {
      return false; 
    }
    return JSON.parse(serializedTheme);
  } catch (error) {
    console.error("Error al cargar el tema:", error);
    return false;
  }
};