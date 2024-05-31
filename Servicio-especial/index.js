// index.js
import express from 'express';
import pool from './config/db.js';

const app = express();

app.use(express.json()); // para parsear JSON

// Ruta para solicitar servicios especiales
app.post('/solicitar-servicio', async (req, res) => {
  const { userId, serviceDescription } = req.body;

  if (!userId || !serviceDescription) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO special_services (user_id, description) VALUES (?, ?)',
      [userId, serviceDescription]
    );

    res.status(201).json({ message: 'Servicio solicitado con éxito', serviceId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al solicitar el servicio' });
  }
});

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
