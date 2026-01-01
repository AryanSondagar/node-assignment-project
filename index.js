const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const authMiddleware = require('./middleware/auth.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.get('/api/profile', authMiddleware, (req, res) => {
    res.json({ message: 'Protected profile data', user: req.user });
});

app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
