var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Attendance = new Schema({
    //class: { type: Schema.Types.ObjectId, ref: 'classes' },
    hasAttended: { type: Boolean, default: true },
    date: { type: Date, default: Date.now }
});


var AttendanceModel = mongoose.model('attendance', Attendance);

module.exports = AttendanceModel;

Attendance.methods.markAttendance = function() {
    Attendance.create({ hasAttended: true });
};