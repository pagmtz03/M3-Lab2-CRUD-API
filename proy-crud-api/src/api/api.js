import axios from 'axios';
import personajesDanganronpaV3 from '../data/mockData';

// Variable para almacenar los datos simulados
let personajes = [...personajesDanganronpaV3];

// Función para obtener todos los personajes
export const getPersonajes = async () => {
  return new Promise((resolve) => {
    // Se simula un pequeño delay para imitar una llamada a API
    setTimeout(() => {
      resolve(personajes);
    }, 500);
  });
};

// Función para obtener un personaje por ID
export const getPersonajeById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const personaje = personajes.find(p => p.id === id);
      if (personaje) {
        resolve(personaje);
      } else {
        reject(new Error(`No se encontró personaje con ID ${id}`));
      }
    }, 300);
  });
};

// Función para crear un nuevo personaje
export const createPersonaje = async (personaje) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generar ID para el nuevo personaje
      const newId = personajes.length > 0 ? Math.max(...personajes.map(p => p.id)) + 1 : 1;
      const newPersonaje = { ...personaje, id: newId };
      personajes.push(newPersonaje);
      resolve(newPersonaje);
    }, 300);
  });
};

// Función para actualizar un personaje existente
export const updatePersonaje = async (personaje) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = personajes.findIndex(p => p.id === personaje.id);
      if (index !== -1) {
        personajes[index] = { ...personaje };
        resolve(personajes[index]);
      } else {
        reject(new Error(`No se encontró personaje con ID ${personaje.id}`));
      }
    }, 300);
  });
};

// Función para eliminar un personaje
export const deletePersonaje = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = personajes.findIndex(p => p.id === id);
      if (index !== -1) {
        personajes = personajes.filter(p => p.id !== id);
        resolve({ wasDeleted: true });
      } else {
        reject(new Error(`No se encontró personaje con ID ${id}`));
      }
    }, 300);
  });
};


/* VERDADERO CÓDIGO PARA CONEXIÓN A API */
/*
// URL base para la API
const API_URL = "http://localhost:5000/api/personajes";

// Función para obtener todos los personajes
export const getPersonajes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener personajes:", error);
    throw error;
  }
};

// Función para obtener un personaje por ID
export const getPersonajeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener personaje con ID ${id}:`, error);
    throw error;
  }
};

// Función para crear un nuevo personaje
export const createPersonaje = async (personaje) => {
  try {
    const response = await axios.post(API_URL, personaje);
    return response.data;
  } catch (error) {
    console.error("Error al crear personaje:", error);
    throw error;
  }
};

// Función para actualizar un personaje existente
export const updatePersonaje = async (personaje) => {
  try {
    const response = await axios.put(`${API_URL}/${personaje.id}`, personaje);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar personaje con ID ${personaje.id}:`, error);
    throw error;
  }
};

// Función para eliminar un personaje
export const deletePersonaje = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar personaje con ID ${id}:`, error);
    throw error;
  }
};
*/