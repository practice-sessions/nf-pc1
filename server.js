const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/v1/users');
const todos = require('./routes/api/v1/todos');
const pets = require('./routes/api/v1/pets');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db).then(() => console.log('MongoDB Connected')).catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello NF'));

// Use Routes
app.use('/api/v1/users', users);
app.use('/api/v1/todos', todos);
app.use('/api/v1/pets', pets);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running on port ', port));
