const express = require('express');
const apiRouter = express.Router();

// Load Todo model
const Todo = require('../../../models/Todo');

// @route   GET api/v1/todos/test
// @desc    Tests todos route
// @access  Public
apiRouter.get('/test', (req, res) => res.json({ message: 'Todos does work!' }));

// @route   GET api/v1/todos/all
// @desc    Lists all todos route
// @access  Public
apiRouter.get('/all', (req, res) => {
	Todo.find()
		.then((todos) => {
			res.json(todos);
		})
		.catch((err) => res.status(404).json({ todo: 'There is nothing on your todos list' }));
});

// @route   POST api/v1/todo
// @desc    Create or edit todos route
// @access  Public
apiRouter.post('/', (req, res) => {
	Todo.create(req.body)
		.then((newTodo) => {
			res.status(201).json(newTodo);
		})
		.catch((err) => res.send(err));
});

module.exports = apiRouter;
