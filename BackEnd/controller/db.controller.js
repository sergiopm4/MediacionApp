const Case = require('../models/case.model');
const User = require('../models/user.model');
const authController = require('./auth.controller');

const mongoose = require('mongoose');
const fs = require('fs');

let secrets = fs.readFileSync('./config/secrets.json');
secrets = JSON.parse(secrets);

mongoose.connect(secrets['mongo_login'], { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

//CRUD --Mediation Cases-- ***************************************************************
//.Post a new case.
exports.postOneCase = (req, res) => {
    // authController.checkToken(req, res, (req, res) => {
    const data = {
        "_id": mongoose.Types.ObjectId(),
        "userID": req.body.userID,
        "title": req.body.title,
        "author": req.body.author,
        "date": Date.now(),
        "category": req.body.category,
        "methodology": req.body.methodology,
        "description": req.body.description,
        "caseText": req.body.caseText
    }

    const newCase = new Case(data);
    newCase.save((err, result) => {
        if (err) throw err;
        res.send({ 'Message': 'CASE_POST_SUCCESS', '_id': result._id })
    })
    // })

}

//.Get all cases
exports.getAllCases = (req, res) => {
    // authController.checkToken(req, res, (req, res) => {
    Case.find((err, cases) => {
        if (err) throw err;
        res.send(cases);
    })
    // })
}


//.Get one case
exports.getOneCase = (req, res) => {
    authController.checkToken(req, res, (req, res) => {
        const id = req.params.id;
        Case.findById(id, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    })
}

//.Edit one case
exports.editOneCase = (req, res) => {
    // authController.checkToken(req, res, (req, res) => {
    const data = {
        "title": req.body.title,
        "author": req.body.author,
        "date": Date.now(),
        "category": req.body.category,
        "methodology": req.body.methodology,
        "caseText": req.body.caseText
    }
    Case.findOneAndUpdate(req.body._id, { $set: data }, (err, result) => {
        if (err) throw err;
        res.send({ 'Message': 'Case modified' })
    })
    // })
}

//.Delete a case
exports.deleteOneCase = (req, res) => {
    authController.checkToken(req, res, (req, res) => {
        const id = req.params.id;
        Case.findOneAndDelete(id, (err, result) => {
            if (err) throw err;
            res.send({ 'Message': 'Case removed from the database' })
        })
    })
}



// CRUD -- User-- **********************************************************************
exports.createUser = (req, res) => {
    authController.checkToken(req, res, (req, res) => {
        const data = {
            "_id": mongoose.Types.ObjectId(),
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "password": req.body.password,
            "email": req.body.email,
            "location": req.body.location,
            "registerDate": Date.now()
        }

        const newUser = new User(data);
        newUser.save((err, result) => {
            if (err) throw err;
            res.send({ 'Message': 'User created successfully', '_id': result._id })
        })
    })
}

//.Get all users
exports.getAllUsers = (req, res) => {
    authController.checkToken(req, res, (req, res) => {
        User.find((err, users) => {
            if (err) throw err;
            res.send(users);
        })
    })
}


//.Get one user
exports.getOneUser = (req, res) => {
    // authController.checkToken(req, res, (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
    // })
}

//.Edit one user
exports.editOneUser = (req, res) => {
    // authController.checkToken(req, res, (req, res) => {
    const data = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "location": req.body.location,
    }
    User.findByIdAndUpdate(req.body._id, { $set: data }, (err, result) => {
        if (err) throw err;
        res.send({ 'Message': 'User modified' })
    })
    // })
}

//.Delete one user
exports.deleteOneUser = (req, res) => {
    authController.checkToken(req, res, (req, res) => {
        const id = req.params.id;
        User.findOneAndDelete(id, (err, result) => {
            if (err) throw err;
            res.send({ 'Message': 'User removed from the database' })
        })
    })
}

// GetOne && getAll -- Mssages Home-- **********************************************************************

