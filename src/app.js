const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const conectarDB = require('./config/db');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));

async function iniciarServidor() {
  await conectarDB();

  app.use('/api', usuarioRoutes);

  const PORT = process.env.PORT || 27017;

  app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en puerto ${PORT}`);
  });
}

iniciarServidor();