require('dotenv').config();
const express = require('express');
const cors = require('cors');  
const helmet = require('helmet');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

console.log("URI:", process.env.MONGO_URI);
const app = express();

app.use(helmet());
app.use(cors());
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
