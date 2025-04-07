const express = require('express');
const characterController = require('../controllers/characterController');
const router = express.Router();

// Ruta para obtener todos los personajes
router.get('/', characterController.getAllCharacters);

// Ruta para obtener un personaje por ID
router.get('/:id', characterController.getCharacterById);

// Ruta para crear un nuevo personaje
router.post('/', characterController.createCharacter);

// Ruta para actualizar un personaje existente
router.put('/:id', characterController.updateCharacter);

// Ruta para eliminar un personaje
router.delete('/:id', characterController.deleteCharacter);

module.exports = router;