const express = require('express');
/* Include {mergeParams; true} in file where the nested params reside. 
	mergeParams tells apiRouter to merge parameters that are created on 
	this set of routes with the ones from its parents  
*/
const apiRouter = express.Router({ mergeParams: true });
const gravatar = require('gravatar');
//const bcrypt = require('bcryptjs');

// Load Owner model
const Owner = require('../../../models/Owner');
// Load Pet model
const Pet = require('../../../models/Pet');

// @route   GET api/v1/owners/test
// @desc    Tests owners route
// @access   Public
apiRouter.get('/test', (req, res) => res.json({ message: 'Owners does work!' }));

// @route   GET api/v1/owners/all
// @desc    Get all owners route
// @access   Public
apiRouter.get('/', (req, res) => {
	Owner.find()
		//	.populate('owner', [ 'name', 'contactnumber', 'pets', 'address' ])
		.then((owners) => {
			if (owners) {
				res.json(owners);
			} else {
				res.status(404).json({ owners: 'There are no owners' });
			}
		})
		.catch((err) => {
			console.log(err);
			//	res.status(500).json(err);
		});
});

// @route   GET api/v1/owners/:ownerId
// @desc    Get owner by Id route
// @access   Public
apiRouter.get('/:ownerId', (req, res) => {
	Owner.findById(req.params.ownerId)
		//.populate('owner', [ 'name', 'contactnumber', 'pets', 'address' ])
		//.exec()
		.then((owner) => {
			res.json(owner);
			/*
			const pets = owner.pets || [];
			res.json({ owner, pets });
			*/
		})
		.catch((err) => res.status(404).json({ owner: 'This owner doesnt exist on our records' }));
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

// @route   GET api/v1/owners/:ownerId/pets/new
// @desc    Form to RENDER new owner's pet route - probably
// accessed thru ToDo page. If so, HOW?
// @access  Public
apiRouter.get('/:ownerId/pets/new', (req, res) => {
	Owner.findById(req.params.ownerId).then((owner) => {
		Pet.find().then((pets) => {
			console.log('newOwnerPet', { owner, pets });
			//res.json('newOwnerPetForm', { owner, pets });
		});
	});
});

// @route   POST api/v1/owners/:ownerId/pets
// @desc    Form to RECEIVE new owner's pet route: though its a POST
// request, its actual usage is not for inserting documents, but for
// adding "references to other documents" to a specific owner (user's) document
// @access  Public
apiRouter.post('/:ownerId/pets', (req, res) => {
	/* 
	 Update command used is $addToSet instead of $push
	 to avoid duplicate insertion. If we add a new pet to
	 the list of pets, it wont duplicate itself if its already
	 existing in the list.
	*/
	Owner.findByIdAndUpdate(req.params.ownerId, {
		$addToSet: { pets: req.body.petId }
	}).then(() => {
		console.log('pet');
		//return res.json(pet);
		return res.redirect('/owners/${req.params.ownerId}');
	});
});

module.exports = apiRouter;
