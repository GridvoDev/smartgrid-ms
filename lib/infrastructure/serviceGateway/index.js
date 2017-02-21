'use strict';
const HttpSmartgridLesseeServiceGateway = require('./httpSmartgridLesseeServiceGateway');
const HttpDataCollectServiceGateway = require('./httpDataCollectServiceGateway');

let httpSmartgridLesseeServiceGateway = null;
let httpDataCollectServiceGateway = null;
function createHttpSmartgridLesseeServiceGateway(single = true) {
    if (single && httpSmartgridLesseeServiceGateway) {
        return httpSmartgridLesseeServiceGateway;
    }
    httpSmartgridLesseeServiceGateway = new HttpSmartgridLesseeServiceGateway();
    return httpSmartgridLesseeServiceGateway;
};
function createHttpDataCollectServiceGateway(single = true) {
    if (single && httpDataCollectServiceGateway) {
        return httpDataCollectServiceGateway;
    }
    httpDataCollectServiceGateway = new HttpDataCollectServiceGateway();
    return httpDataCollectServiceGateway;
};

module.exports = {
    createHttpSmartgridLesseeServiceGateway,
    createHttpDataCollectServiceGateway
};