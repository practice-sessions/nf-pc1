const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const owners = require('./routes/api/v1/owners');
const todos = require('./routes/api/v1/todos');
const pets = require('./routes/api/v1/pets');
//const pets = require('./routes/api/v1/owners/pets');
//const pets = require('./routes/api/v1/owners/:ownerId/pets');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.set('debug', true);
mongoose.connect(db).then(() => console.log('MongoDB Connected')).catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello NF'));

// Use Routes
app.use('/api/v1/owners', owners);
app.use('/api/v1/todos', todos);
app.use('/api/v1/pets', pets);
//app.use('/api/v1/owners/pets', pets);
//app.use('/api/v1/owners/:ownerId/pets', pets);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log('Server running on port ', port);
});
