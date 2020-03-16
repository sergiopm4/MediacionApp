const User = require('../models/user.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const mongoose = require('mongoose');

let secrets = fs.readFileSync('./config/secrets.json');
secrets = JSON.parse(secrets);

//. Register
exports.register = (req, res) => {
    if (req.body['firstName'] && req.body['lastName'] && req.body['password'] && req.body['email'] && req.body['age']) {

        User.find((err, users) => {
            let userExist = false;
            if (err) throw err;
            for (i = 0; i < users.length; i++) {
                if (req.body['email'] === users[i]['email']) {
                    userExist = true;
                    res.send({ 'Error': 'This email already exists.' })
                }
            }
            if (userExist === false) {
                bcrypt.hash(req.body.password, 14, (err, hash) => {
                    if (err) throw err;
                    const newUser = new User({
                        "_id": mongoose.Types.ObjectId(),
                        "firstName": req.body.firstName,
                        "lastName": req.body.lastName,
                        "password": hash,
                        "email": req.body.email,
                        "age": req.body.age,
                        "registerDate": Date.now()
                    });
                    newUser.save((err, result) => {
                        if (err) throw err;
                        res.send({ "message": "User saved!", "_id": result._id })
                    })
                })
            }
        })

    } else {
        res.send({ 'Error': 'The body is not correct.' })
    }
}



//. Login
exports.login = (req, res) => {
    if (req.body['email'] && req.body['password']) {

        User.find({ email: req.body['email'] }, (err, users) => {
            if (err) {
                //Cannot read property 'password' of undefined
                res.send({ 'Error': 'Email does not exist.' });
            }
            bcrypt.compare(req.body['password'], users[0]['password'], (err, result) => {
                if (err) throw err;
                if (result) {
                    jwt.sign({ 'email': users['email'] }, secrets['jwt_clave'], (err, token) => {
                        if (err) throw err;
                        res.cookie('sello', token);
                        res.send({ 'Message': 'Welcome!', 'token': token })
                    })
                } else {

                    res.send({ 'Error': 'Password is not correct.' })
                }
            })
        })
    } else {
        res.send({ 'Error': 'The body is not correct.' });
    }
}


//. Check TOKEN
exports.checkToken = (req, res, callback) => {
    if (req.cookies['sello'] !== undefined) {

        jwt.verify(req.cookies['sello'], secrets['jwt_clave'], (err, decoded) => {
            if (err) throw err;
            if (!decoded) {
                res.send({ 'Error': 'Token not valid.' })
                return false;
            } else {
                callback(req, res)
                return true;
            }
        })
    } else {
        res.send({ 'Error': 'Not authorized', 'login': '/login' });
    }
}