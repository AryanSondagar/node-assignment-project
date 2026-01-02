const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const postRoutes = require('./routes/post.routes');
const authRoutes = require('./routes/auth.routes');
const authMiddleware = require('./middleware/auth.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect MongoDB first
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
