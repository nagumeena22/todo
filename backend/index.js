require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

app.use('/api/todos', require('./routes/todos'));

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});


app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});