const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');
const {SECRET_KEY} = require('../../config');
const {validateRegisterInput, validateLoginInput} = require('../../util/validators')

function generateToken(res){
    return jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username,
    }, SECRET_KEY, {expiresIn: '1h'});
}

module.exports = {
    Mutation: {
        async register(parent, {registerInput: {username, email, password, confirmedPassword}}, context, info) {
           const {valid, errors} = validateRegisterInput(username, email, password, confirmedPassword);
            if (!valid) {
                throw new UserInputError('Errors', {errors});
            }
            password = await bcrypt.hash(password, 12);

            const user = await User.findOne({username});

            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username id taken'
                    }
                })
            }

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        },
        async login(parent, {username, password}, contex, info) {
            const {errors, valid} = validateLoginInput(username, password);
            if (!valid) {
                throw new UserInputError('Errors', {errors});
            }
            const user = await User.findOne({username});
            if (!user){
                throw new UserInputError('Errors', {'error': 'wrong credentials'});
            }
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                throw new UserInputError('Errors', {'error': 'wrong credentials'});
            }
            const token = generateToken(user);
            return {
                ...user._doc,
                id: user._id,
                token
            }
        }
    }
}