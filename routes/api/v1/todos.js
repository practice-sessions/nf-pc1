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
			if (todos) {
				res.json(todos);
			} else {
				res.status(404).json({ todos: 'There is nothing on your todos list' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// @route   POST api/v1/todos
// @desc    Create or edit todos route
// @access  Public
apiRouter.post('/', (req, res) => {
	Todo.create(req.body)
		.then((newTodo) => {
			if (newTodo) {
				res.status(201).json(newTodo);
			} else {
				res.status(404).json({ newTodo: 'There is nothing new todo' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// @route   GET api/v1/todos/:todoId
// @desc    Get a specific todo route
// @access  Public
apiRouter.get('/:todoId', (req, res) => {
	Todo.findById(req.params.todoId)
		.then((foundTodo) => {
			if (foundToDo) {
				res.json(foundTodo);
			} else {
				res.status(404).json({ TodoNotFound: 'There are no todos' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// @route   POST api/v1/todos/:todoId
// @desc    Update todos route
// @access  Public
apiRouter.post('/:todoId', (req, res) => {
	Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body)
		.then((updatedTodo) => {
			if (updatedTodo) {
				res.json(updatedTodo);
			} else {
				res.status(404).json({ updateOfTodo: 'Could not update todos' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// @route   DELETE api/v1/todos/:todoId
// @desc    Delete todos route
// @access  Public
apiRouter.delete('/:todoId', (req, res) => {
	Todo.deleteOne({ _id: req.params.todoId })
		.then(() => {
			res.json({ item: 'has now been deleted...' });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = apiRouter;
