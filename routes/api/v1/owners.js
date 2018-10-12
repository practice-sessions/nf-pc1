const express = require('express');
const apiRouter = express.Router();
const gravatar = require('gravatar');
//const bcrypt = require('bcryptjs');

// Load Owner model
const Owner = require('../../../models/Owner');

// @route   GET api/v1/owners/test
// @desc    Tests owners route
// @access   Public
apiRouter.get('/test', (req, res) => res.json({ message: 'Owners does work!' }));

// @route   GET api/v1/owners/:ownerId
// @desc    Get owner by Id route
// @access   Public
apiRouter.get('/:ownerId', (req, res) => {
	Owner.findOne({ owner: req.params.ownerId })
		.populate('owner', [ 'name', 'contactnumber', 'pets', 'address' ])
		.then((owner) => res.json(owner));
});
//.catch((err) => res.status(404).json({ owner: 'This owner doesnt exist on our records' }));

// @route   GET api/v1/owners/all
// @desc    Get all owners route
// @access   Public
apiRouter.get('/all', (req, res) => {
	Owner.find()
		.populate('owner', [ 'name', 'contactnumber', 'pets', 'address' ])
		.then((owners) => res.json(owners))
		.catch((err) => res.status(404).json({ owners: 'There are no owners' }));
});

// @route   POST api/v1/owners/register
// @desc    Register owner route
// @access   Public
apiRouter.post('/register', (req, res) => {
	Owner.findOne({
		contactnumber: req.body.contactnumber
	}).then((owner) => {
		if (owner) {
			return res.status(400).json({ contactnumber: 'Contact number already exists' });
		} else {
			// We are using avatar as placeholder for image, will change later
			const avatar = gravatar.url(req.body.email, {
				s: '200', // Size
				r: 'pg', // Rating
				d: 'mm' // Default
			});

			const newOwner = new Owner({
				name: req.body.name,
				contactnumber: req.body.contactnumber,
				avatar,
				email: req.body.email
				/*	
				,
			
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newOwner.password, salt, (err, hash) => {
					//	if (err) throw err; REFUSED TO WORK UNTIL I COMMENTED IT OUT. WHY?
					newOwner.password = hash;
					newOwner.save().then((owner) => res.json(owner)).catch((err) => console.log(err));
				});
			*/
			});

			newOwner.save().then((owner) => res.json(owner)).catch((err) => console.log(err));
		}
	});
});

module.exports = apiRouter;
