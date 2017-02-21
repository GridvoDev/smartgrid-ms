'use strict';
const HttpSmartgridLesseeServiceGateway = require('./httpSmartgridLesseeServiceGateway');
const HttpDataCollectServiceGateway = require('./httpDataCollectServiceGateway');

let gateway = null;
function createHttpSmartgridLesseeServiceGateway(single = true) {
    if (single && gateway) {
        return gateway;
    }
    gateway = new HttpSmartgridLesseeServiceGateway();
    return gateway;
};
function createHttpDataCollectServiceGateway(single = true) {
    if (single && gateway) {
        return gateway;
    }
    gateway = new HttpDataCollectServiceGateway();
    return gateway;
};

module.exports = {
    createHttpSmartgridLesseeServiceGateway,
    createHttpDataCollectServiceGateway
};