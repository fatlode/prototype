var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Classes = new Schema({
    name: { type: String },
    day: { type: String },
    time: { type: String },
    location: { type: String },
    duration: { type: String },
    students: [{ type: Schema.Types.ObjectId, ref: 'Students' }]
});

var ClassesModel = mongoose.model('classes', Classes);

module.exports = ClassesModel;

Classes.methods.findAllStudents = function(studentId) {
    return ClassesModel.find({ students: studentId }).populate('students').exec();
};