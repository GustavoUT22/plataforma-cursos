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

// CORS restringido: orígenes definidos en CORS_ORIGINS (separados por coma).
// Si no se define, en desarrollo se permiten los puertos locales de Angular/React/Next.
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:4200,http://localhost:5173,http://localhost:3000')
  .split(',')
  .map((o) => o.trim().replace(/\/$/, '')) // sin espacios ni barra final
  .filter(Boolean);

// Acepta cualquier despliegue del proyecto en Vercel (producción y previews),
// cuyas URLs cambian en cada deploy: https://plataforma-cursos-<hash>.vercel.app
const vercelPreview = /^https:\/\/plataforma-cursos[a-z0-9-]*\.vercel\.app$/i;

console.log('CORS - orígenes permitidos:', allowedOrigins);

function isOriginAllowed(origin) {
  const clean = origin.replace(/\/$/, '');
  return allowedOrigins.includes(clean) || vercelPreview.test(clean);
}

app.use(cors({
  origin: (origin, callback) => {
    // Permite peticiones sin origin (Postman, curl, apps móviles)
    if (!origin || isOriginAllowed(origin)) {
      return callback(null, true);
    }
    console.warn('CORS - origen bloqueado:', origin);
    return callback(null, false); // no lanza 500: solo omite los headers CORS
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
