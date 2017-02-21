'use strict';
const SmartgridLesseeService = require('./smartgridLesseeService');
const DataCollectService = require('./dataCollectService');

let smartgridLesseeService = null;
let dataCollectService = null;
function createSmartgridLesseeService(single = true) {
    if (single && smartgridLesseeService) {
        return smartgridLesseeService;
    }
    smartgridLesseeService = new SmartgridLesseeService();
    return smartgridLesseeService;
};
function createDataCollectService(single = true) {
    if (single && dataCollectService) {
        return dataCollectService;
    }
    dataCollectService = new DataCollectService();
    return dataCollectService;
};

module.exports = {
    createSmartgridLesseeService,
    createDataCollectService
};