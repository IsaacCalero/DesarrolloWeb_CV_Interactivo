// Utilidades para manejar localStorage

const STORAGE_KEY = 'cv_manager_data';
const THEME_KEY = 'cv_manager_theme';

/**
 * Guardar datos en localStorage
 */
export const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error guardando en localStorage:', error);
    return false;
  }
};

/**
 * Cargar datos desde localStorage
 */
export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error cargando desde localStorage:', error);
    return null;
  }
};

/**
 * Limpiar datos de localStorage
 */
export const clearLocalStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error limpiando localStorage:', error);
    return false;
  }
};

/**
 * Guardar tema (dark/light)
 */
export const saveTheme = (isDark) => {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
    return true;
  } catch (error) {
    console.error('Error guardando tema:', error);
    return false;
  }
};

/**
 * Cargar tema
 */
export const loadTheme = () => {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    return theme ? JSON.parse(theme) : false;
  } catch (error) {
    console.error('Error cargando tema:', error);
    return false;
  }
};