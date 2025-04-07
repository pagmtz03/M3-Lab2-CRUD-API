import React from 'react';
import { Table, Button } from 'reactstrap';

// Componente para la tabla de personajes
const CharacterTable = ({ personajes, onEdit, onDelete }) => {
  // Maneja un error si la imagen no se puede cargar
  const handleImageError = (e) => {
    e.target.src = "/images/monokuma.jpg"; // Imagen por defecto
  };

  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Talent</th>
          <th>Gender</th>
          <th>Height</th>
          <th>Weight</th>
          <th>Birthday</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {personajes.map(personaje => (
          <tr key={personaje.id}>
            <td>{personaje.id}</td>
            <td>
              <img 
                src={personaje.image} 
                alt={personaje.name} 
                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }} 
                onError={handleImageError}
              />
            </td>
            <td>{personaje.name}</td>
            <td>{personaje.talent}</td>
            <td>{personaje.gender}</td>
            <td>{personaje.height}</td>
            <td>{personaje.weight}</td>
            <td>{personaje.birthday}</td>
            <td>
              <Button color="primary" size="sm" onClick={() => onEdit(personaje)}>
                Edit
              </Button>{' '}
              <Button color="danger" size="sm" onClick={() => onDelete(personaje.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CharacterTable;