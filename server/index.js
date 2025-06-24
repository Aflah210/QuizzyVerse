const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/questions', require('./routes/questions'));

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 