var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Classes = new Schema({
    name: { type: String },
    day: { type: String },
    time: { type: String },
    location: { type: String },
    duration: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});

var ClassesModel = mongoose.model('classes', Classes);

module.exports = ClassesModel;

Classes.methods.findAllStudents = function(userId) {
    return ClassesModel.find({ users: userId }).populate('users').exec();
};