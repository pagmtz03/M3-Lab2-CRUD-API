import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const CharacterForm = ({ isOpen, toggle, personaje, onSave, formType }) => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    talent: '',
    gender: '',
    height: '',
    weight: '',
    birthday: '',
    image: ''
  });

  // Actualizar el estado cuando cambia el personaje seleccionado
  useEffect(() => {
    if (personaje) {
      setFormData({ ...personaje });
    } else {
      // Valores por defecto para un nuevo personaje
      setFormData({
        name: '',
        talent: '',
        gender: '',
        height: '',
        weight: '',
        birthday: '',
        image: ''
      });
    }
  }, [personaje]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {formType === 'edit' ? 'Edit Character' : 'Add Character'}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter character name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="talent">Talent</Label>
            <Input
              type="text"
              name="talent"
              id="talent"
              placeholder="Enter character talent"
              value={formData.talent}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="gender">Gender</Label>
            <Input
              type="select"
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="None">None</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="height">Height</Label>
            <Input
              type="text"
              name="height"
              id="height"
              placeholder="Example: 173 cm"
              value={formData.height}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="weight">Weight</Label>
            <Input
              type="text"
              name="weight"
              id="weight"
              placeholder="Example: 62 kg"
              value={formData.weight}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="birthday">Birthday</Label>
            <Input
              type="text"
              name="birthday"
              id="birthday"
              placeholder="Example: December 1"
              value={formData.birthday}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="image">Image URL</Label>
            <Input
              type="text"
              name="image"
              id="image"
              placeholder="Example: /images/monokuma.jpg"
              value={formData.image}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          {formType === 'edit' ? 'Update' : 'Create'}
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CharacterForm;