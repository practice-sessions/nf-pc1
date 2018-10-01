const express = require('express');
const apiRouter = express.Router();

// @route   GET api/v1/pets/test
// @desc    Tests pets route
// @access   Public
apiRouter.get('/test', (req, res) => res.json({ message: 'Pets does work!' }));

module.exports = apiRouter;
