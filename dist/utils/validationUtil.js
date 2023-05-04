"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldFilters = exports.validateNumberString = exports.validateEmail = void 0;
const validateEmail = (email) => {
    return String(email)
        .trim()
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
exports.validateEmail = validateEmail;
const validateNumberString = (numString) => {
    return /^\d+$/.test(numString.toString());
};
exports.validateNumberString = validateNumberString;
function fieldFilters(listOfFields, obj) {
    let returnedObject = {};
    const fieldKeys = Object.keys(obj);
    let filteredFileds = fieldKeys.filter(e => {
        if ((listOfFields.includes(e)))
            return true;
        return false;
    });
    filteredFileds.forEach(elem => {
        returnedObject = Object.assign(Object.assign({}, returnedObject), { [elem]: obj[elem] });
    });
    return returnedObject;
}
exports.fieldFilters = fieldFilters;
