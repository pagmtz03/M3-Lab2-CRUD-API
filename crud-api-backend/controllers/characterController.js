const Character = require('../models/characterModel');
let characters = require('../data/characterData');

// Obtener todos los personajes
exports.getAllCharacters = (req, res) => {
  res.status(200).json(characters);
};

// Obtener un personaje por ID
exports.getCharacterById = (req, res) => {
  const id = parseInt(req.params.id);
  const character = characters.find(c => c.id === id);
  
  if (character) {
    res.status(200).json(character);
  } else {
    res.status(404).json({ message: `Character with ID ${id} not found` });
  }
};

// Crear un nuevo personaje
exports.createCharacter = (req, res) => {
  const characterData = req.body;
  
  // Validar los datos del personaje
  const validation = Character.validate(characterData);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }
  
  // Generar un ID para el nuevo personaje
  const newId = characters.length > 0 ? Math.max(...characters.map(c => c.id)) + 1 : 1;
  
  // Crear un nuevo personaje
  const newCharacter = { ...characterData, id: newId };
  characters.push(newCharacter);
  
  res.status(201).json(newCharacter);
};

// Actualizar un personaje existente
exports.updateCharacter = (req, res) => {
  const id = parseInt(req.params.id);
  const characterData = req.body;
  
  // Validar los datos del personaje
  const validation = Character.validate(characterData);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }
  
  const index = characters.findIndex(c => c.id === id);
  
  if (index !== -1) {
    // Asegurarse de que el ID no cambie
    characters[index] = { ...characterData, id };
    res.status(200).json(characters[index]);
  } else {
    res.status(404).json({ message: `Character with ID ${id} not found` });
  }
};

// Eliminar un personaje
exports.deleteCharacter = (req, res) => {
  const id = parseInt(req.params.id);
  const index = characters.findIndex(c => c.id === id);
  
  if (index !== -1) {
    characters = characters.filter(c => c.id !== id);
    res.status(200).json({ wasDeleted: true });
  } else {
    res.status(404).json({ message: `Character with ID ${id} not found`, wasDeleted: false });
  }
};