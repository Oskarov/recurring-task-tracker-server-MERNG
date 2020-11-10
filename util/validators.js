module.exports.validateRegisterInput = (username, email, password, confirmedPassword) => {
    const errors = {};

    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }

    if (email.trim() === '') {
        errors.email = 'Email must not be empty'
    } else {
        const regEx =  /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)){
            errors.email = 'Email not valid'
        }
    }

    if (password === ''){
        errors.password = 'Password must not be empty'
    } else if (password !== confirmedPassword){
        errors.confirmPassword = 'Passwords must match'
    }

    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}
const {IMPORTANCE, REPETITION_TYPE} = require('../type');

module.exports.validateLoginInput = (username, password) =>{
    const errors = {};

    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }
    if (password.trim() === ''){
        errors.password = 'Password must not be empty'
    }

    return{
        errors,
        valid: Object.keys(errors).length < 1
    }

}

module.exports.validatePostInput = (body, isPrivate, importance, color, flag, repetitionType, repetitionRange) =>{
    const errors = {};

    if (body.trim() === '') {
        errors.username = 'Post can\'t be empty';
    }
    if (!inImportance(importance)){
        errors.importance = 'not require type of importance';
    }
    if (!isHexColor(color)){
        errors.color = 'not a hex color';
    }
    if (!inRepetition(repetitionType)){
        errors.importance = 'not require type of repetition';
    }

    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}

function inImportance(importance){
    const arr = Object.values(IMPORTANCE);
    return arr.indexOf( importance ) != -1;
}

function inRepetition(repetition){
    const arr = Object.values(REPETITION_TYPE);
    return arr.indexOf( repetition ) != -1;
}

function isHexColor(color){
    if(!color || typeof color !== 'string') return false;

    // Validate hex values
    if(color.substring(0, 1) === '#') color = color.substring(1);

    switch(color.length) {
        case 3: return /^[0-9A-F]{3}$/i.test(color);
        case 6: return /^[0-9A-F]{6}$/i.test(color);
        case 8: return /^[0-9A-F]{8}$/i.test(color);
        default: return false;
    }

    return false;
}

module.exports.isBasicString = (str) => {
    const errors = {};

    if (str.trim() === '') {
        errors.username = 'value can\'t be empty';
    }

    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}