require('dotenv').config();
const express = require('express');
const cors = require('cors');  
const helmet = require('helmet');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

const app = express();

app.use(helmet());

// CORS restringido: solo los orígenes definidos en CORS_ORIGINS (separados por coma).
// Si no se define, en desarrollo se permiten los puertos locales de Angular/React/Next.
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:4200,http://localhost:5173,http://localhost:3000')
  .split(',')
  .map((o) => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Permite peticiones sin origin (Postman, curl, apps móviles)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origen no permitido por CORS'));
  },
}));

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json( {limit: '10kb'}));

app.use('/api', authRoutes);
app.use('/api', courseRoutes);
app.use('/api', enrollmentRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'API corriendo correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
