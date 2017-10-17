var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');
var Attendance = require('../models/attendance');

/**router.get('/', function(req, res) {
        User.
    }); **/

router.post('/register', function(req, res) {
    User.register(new User({ username: req.body.username, classes: req.body.classes }),
        req.body.password,
        function(err, account) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            passport.authenticate('local')(req, res, function() {
                return res.status(200).json({
                    status: 'Registration successful!'
                });
            });
        });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status: 'Login successful!'
            });
            next();
        });
    })(req, res, next);
});

router.get('/profile', function(req, res, next) {
    User.findOne({ 'username': req.User.username }).then(function(user) {
        res.json(user);
    });
});

router.post('/attendance', function(req, res, next) {
    User.findOne({ 'username': 'fatload' }).then(function(user) {
        const newAttendance = Attendance.markAttendance;
        user.attendance.push(newAttendance);
        user.save(function(err, updatedUser) {
            if (err) next();
            //var attendances = updatedUser.find({});
            res.send(updatedUser.attendance);
        });
    });
});

router.get('/attendance', function(req, res) {
    User.findOne({ 'username': 'fatload' }).then(function(user) {
        res.send(user);
    });
});

//testing next() 
router.post('/attendance', function(req, res) {
    res.send('great success');
});

router.delete('/attendance', function(req, res) {

})

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});


router.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});


module.exports = router;