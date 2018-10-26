const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TodoSchema = new Schema({
	itemname: {
		type: String,
		required: 'What is it you want to do?'
	},
	completed: {
		type: Boolean,
		default: false
	},
	updatecatround: {
		type: Boolean,
		default: false
	},
	meetnewclient: {
		type: String,
		default: false
	},
	meettime: {
		type: String // Could be datecalendar?
	},
	approxmeetduration: {
		type: String
	},
	createddate: {
		type: Date,
		default: Date.now
	}
});

module.exports = Todo = mongoose.model('todos', TodoSchema);
