// user model
var mongoose = require('mongoose');
var Attendance = require('./attendance');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
    username: { type: String },
    password: { type: String },
    classes: [{ type: Schema.Types.ObjectId, ref: 'classes' }],
    attendance: [Attendance.schema],
    userType: { type: String, default: 'student' }
});

User.plugin(passportLocalMongoose);

var UserModel = mongoose.model('users', User);

module.exports = UserModel;

User.methods.findUser = function(username) {
    return UserModel.findOne({ username: username }).then(function(user) {
        res.json(user);
    });
};

User.methods.findAllSubjectsForUser = function(classId) {
    return UserModel.find({ classes: classId }).populate('classes').exec();
};

//User.methods.markAttendance = function()