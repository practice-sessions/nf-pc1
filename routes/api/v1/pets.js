const express = require('express');
// Include {mergeParams; true} in file where the nested params reside.
/* 
mergeParams tells apiRouter to merge parameters that are created on this set of routes with the ones from its parents
*/
const apiRouter = express.Router({ mergeParams: true });

// Load Pet model
const Pet = require('../../../models/Pet');

// @route   GET api/v1/pets/test
// @desc    Tests pets route
// @access   Public
apiRouter.get('/test', (req, res) => res.json({ message: 'Pets does work!' }));

// @route   GET api/v1/pets
// @desc    Get pets route
// @access   Public
apiRouter.get('/', (req, res) => {
	Pet.find()
		.then((pets) => {
			return res.json(pets);
		})
		.catch((err) => res.json(err));
});

// @route   POST api/v1/pets/register
// @desc    Register pet route
// @access   Public
apiRouter.post('/register', (req, res) => {
	/*
	// Add code for pet image upload here
	// We are using avatar as placeholder for image, will change later
	const avatar = gravatar.url(req.body.email, {
		s: '200', // Size
		r: 'pg', // Rating
		d: 'mm' // Default
  });
  */

	const newPet = new Pet({
		petname: req.body.petname,
		pettype: req.body.pettype,
		//avatar,
		petbreed: req.body.petbreed,
		firsteverarrivaldate: req.body.firsteverarrivaldate
	});

	newPet.save().then((pet) => res.json(pet)).catch((err) => res.json(err));
});

module.exports = apiRouter;
