const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema - "Owner" == pet owner
const OwnerSchema = new Schema({
	name: {
		type: String,
		required: 'A name is needed for the pet owner or client'
	},
	contactnumber: {
		type: Number,
		required: 'Pet owners contact number is required'
	},
	address: {
		type: String
		//required: 'Please enter pet owners address'
	},
	pets: [
		{
			type: Schema.Types.ObjectId,
			ref: 'pet' // Allows possibility of more than one pet
		}
	],
	email: {
		type: String
	},
	password: {
		type: String
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Owner = mongoose.model('owners', OwnerSchema);
