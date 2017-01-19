'use strict';
const SmartgridLesseeService = require('./smartgridLesseeService');

let smartgridLesseeService = null;
function createSmartgridLesseeService(single = true) {
    if (single && smartgridLesseeService) {
        return smartgridLesseeService;
    }
    smartgridLesseeService = new SmartgridLesseeService();
    return smartgridLesseeService;
};

module.exports = {
    createSmartgridLesseeService
};