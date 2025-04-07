import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'reactstrap';
import CharacterTable from '../components/CharacterTable';
import CharacterForm from '../components/CharacterForm';
import { getPersonajes, createPersonaje, updatePersonaje, deletePersonaje } from '../api/api';

const Characters = () => {
  // Estados para manejar los personajes y el formulario
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [currentPersonaje, setCurrentPersonaje] = useState(null);
  const [formType, setFormType] = useState('add');

  // Cargar personajes al iniciar el componente
  useEffect(() => {
    loadPersonajes();
  }, []);

  // Función para cargar todos los personajes
  const loadPersonajes = async () => {
    try {
      setLoading(true);
      const data = await getPersonajes();
      setPersonajes(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los personajes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Funciones para abrir/cerrar el modal
  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      setCurrentPersonaje(null);
      setFormType('add');
    }
  };

  // Función para editar un personaje
  const handleEdit = (personaje) => {
    setCurrentPersonaje(personaje);
    setFormType('edit');
    setModal(true);
  };

  // Función para eliminar un personaje
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este personaje?')) {
      try {
        await deletePersonaje(id);
        await loadPersonajes(); // Recargar la lista después de eliminar
      } catch (err) {
        setError(`Error al eliminar el personaje: ${err.message}`);
      }
    }
  };

  // Función para guardar un personaje (crear o actualizar)
  const handleSave = async (personaje) => {
    try {
      if (formType === 'edit') {
        await updatePersonaje(personaje);
      } else {
        await createPersonaje(personaje);
      }
      toggleModal();
      await loadPersonajes(); // Recargar la lista después de guardar
    } catch (err) {
      setError(`Error al ${formType === 'edit' ? 'actualizar' : 'crear'} el personaje: ${err.message}`);
    }
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center mb-4">Danganronpa V3: Killing Harmony Characters</h1>
      
      {/* Botón para agregar nuevo personaje */}
      <div className="d-flex justify-content-center mb-3">
        <Button color="success" onClick={toggleModal}>
          Add Character
        </Button>
      </div>
      
      {/* Mensaje de error */}
      {error && (
        <Alert color="danger" className="mb-3">
          {error}
        </Alert>
      )}
      
      {/* Mensaje de carga */}
      {loading ? (
        <div className="text-center my-5">
          <p>Loading characters...</p>
        </div>
      ) : (
        <CharacterTable 
          personajes={personajes} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
      
      {/* Formulario modal */}
      <CharacterForm 
        isOpen={modal}
        toggle={toggleModal}
        personaje={currentPersonaje}
        onSave={handleSave}
        formType={formType}
      />
    </div>
  );
};

export default Characters;