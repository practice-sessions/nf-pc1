const express = require('express');
const apiRouter = express.Router();

// @route   GET api/v1/todos/test
// @desc    Tests todos route
// @access   Public
apiRouter.get('/test', (req, res) => res.json({ message: 'Todos does work!' }));

module.exports = apiRouter;
