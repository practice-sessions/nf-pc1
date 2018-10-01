const express = require('express');
const apiRouter = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../../models/User');

// @route   GET api/v1/users/test
// @desc    Tests users route
// @access   Public
apiRouter.get('/test', (req, res) => res.json({ message: 'Users does work!' }));

// @route   POST api/v1/users/register
// @desc    Register user route
// @access   Public
apiRouter.post('/register', (req, res) => {
	User.findOne({
		contactnumber: req.body.contactnumber
	}).then((user) => {
		if (user) {
			return res.status(400).json({ contactnumber: 'Contact number already exists' });
		} else {
			// We are using avatar as placeholder for image, will change later
			const avatar = gravatar.url(req.body.email, {
				s: '200', // Size
				r: 'pg', // Rating
				d: 'mm' // Default
			});

			const newUser = new User({
				name: req.body.name,
				contactnumber: req.body.contactnumber,
				email: req.body.email,
				avatar,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					//	if (err) throw err; REFUSED TO WORK UNTIL I COMMENTED IT OUT. WHY?
					newUser.password = hash;
					newUser.save().then((user) => res.json(user)).catch((err) => console.log(err));
				});
			});
		}
	});
});

module.exports = apiRouter;
