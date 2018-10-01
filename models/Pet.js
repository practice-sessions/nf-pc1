const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PetSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	petname: {
		type: String,
		required: 'Whats your pets name please?',
		max: 12
	},
	pettype: {
		type: String,
		required: 'Is your pet a dog, cat or bunny rabit?'
	},
	petbreed: {
		type: String
	},
	avatar: {
		type: String
	},
	firsteverarrivaldate: {
		type: Date,
		default: Date.now
	},
	arrivaldate: {
		type: Date,
		default: Date.now
	},
	exitdate: {
		type: Date,
		default: Date.now
	},
	createddate: {
		type: Date,
		default: Date.now
	}
});

module.exports = Pet = mongoose.module('pets', PetSchema);
