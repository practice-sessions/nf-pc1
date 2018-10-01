const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: 'A name is needed for the user or client'
	},
	contactnumber: {
		type: Number,
		required: 'A contact number is required'
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	pet: {
		type: Schema.Types.ObjectId,
		ref: 'pets'
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model('users', UserSchema);
