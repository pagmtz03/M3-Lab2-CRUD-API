const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const characterRoutes = require('./routes/characterRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración CORS específica
app.use(cors({
  origin: 'http://localhost:5173', // Mi frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/personajes', characterRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;