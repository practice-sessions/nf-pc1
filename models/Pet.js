const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PetSchema = new Schema({
	petname: {
		type: String,
		required: 'Please enter pet name'
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'owners'
	},
	petcolour: {
		type: String
	},
	pettype: {
		type: String,
		required: 'Is your pet a dog, cat or bunny rabbit?'
	},
	petbreed: {
		type: String
	},
	avatar: {
		type: String
	},
	firsteverarrivaldate: {
		type: Date,
		default: ''
	},
	/*
	arrivaldate: {
		type: Date,
		default: Date.now
	},
	exitdate: {
		type: Date,
		default: Date.now
	},
	*/
	createddate: {
		type: Date,
		default: Date.now
	}
});

module.exports = Pet = mongoose.model('pets', PetSchema);
