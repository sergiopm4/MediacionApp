const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { check, validationResult } = require('express-validator');
const helmet = require('helmet');
const cors = require('cors');

const dbController = require('./controller/db.controller');
const authController = require('./controller/auth.controller');

const server = express();

//.Middlewares
server.use(helmet());
server.use(bodyParser.json());
server.use(cors());
server.use(cookieParser()); //.Para poder leer el 'sello'

//.Endpoints --> /register && /login
// server.post('/register', [check('firstName').not().isEmpty().trim().escape(), check('lastName').not().isEmpty().trim().escape(), check('email', 'The email is not valid').not().isEmpty().isEmail().normalizeEmail(), check('password', 'Password must have at least 8 characters').not().isEmpty().isLength({ min: 8 })], (req, res) => {
server.post('/register', [check('email', 'The email is not valid').not().isEmpty().isEmail().normalizeEmail(), check('password', 'Password must have at least 8 characters').not().isEmpty().isLength({ min: 8 })], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    } else {
        authController.register(req, res);
    }
});

server.post('/login', authController.login);


//.Endpoints Cases
server.post('/postCase', dbController.postOneCase);

server.get('/getAllCases', dbController.getAllCases);

server.get('/getOneCase/:id', dbController.getOneCase);

server.put('/editOneCase', dbController.editOneCase);

server.delete('/deleteOneCase/:id', dbController.deleteOneCase);

//.Endpoints User
server.post('/createUser', dbController.createUser);

server.get('/getAllUsers', dbController.getAllUsers);

server.get('/getOneUser/:id', dbController.getOneUser);

server.put('/editOneUser', dbController.editOneUser);

server.delete('/deleteOneUser/:id', dbController.deleteOneUser);



server.listen(3000, () => {
    console.log('Server listening on port 3000')
})