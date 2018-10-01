const express = require('express');
const apiRouter = express.Router();

// @route   GET api/v1/users/test
// @desc    Tests users route
// @access   Public
apiRouter.get('/test', (req, res) => res.json({ message: 'Users does work!' }));

module.exports = apiRouter;
