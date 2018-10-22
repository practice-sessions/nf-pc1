const express = require('express');
const apiRouter = express.Router();

// Load Pet model
const Pet = require('../../../models/Pet');

// @route   GET api/v1/pets/test
// @desc    Tests pets route
// @access   Public
apiRouter.get('/test', (req, res) => res.json({ message: 'Pets does work!' }));

// @route   GET api/v1/pets/all
// @desc    Get all pets route
// @access   Public
apiRouter.get('/', (req, res) => {
	Pet.find()
		.then((pets) => {
			return res.json(pets);
		})
		/* 
		.post('/', (req, res) => {
			Pet.create(req.body)
				.then((pet) => {
					return res.redirect('/');
        })
        */
		.catch((err) => res.json(err));
});
//});

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

// @route   GET api/v1/pet
// @desc    Form to render new pet thats just being entered route
// @access   Public
apiRouter.get('/new', (req, res) => {
	if (!newPet) {
		return res.status(404).json({ error: 'Something went wrong here, no new pet entered!' });
	}

	return res.json('newPet');
});

module.exports = apiRouter;
