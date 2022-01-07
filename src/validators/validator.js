let mongoose = require('mongoose')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const validString = function (value) {
    if (typeof value !== 'string') return false
    if (typeof value === 'string' && value.trim().length === 0) return false //it checks whether the string contain only space or not 
    return true;
}
const isValidArray = function (arrayToCheck) {
    return Array.isArray(arrayToCheck)         //The Array.isArray(arrayToCheck) method returns true if an arrayToCheck is an array, otherwise false.
}
   

let isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length !== 0
}

let isValidPhone = function (str) {
    if (/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(str)) {
        return true
    }
    return false
}

let isValidEmail = function (email) {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim()))) {
        return true;
    }
}

module.exports = {  isValidRequestBody, isValid, isValidPhone, isValidObjectId, isValidEmail,validString,isValidArray }

