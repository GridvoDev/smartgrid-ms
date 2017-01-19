'use strict';
const HttpSmartgridLesseeServiceGateway = require('./httpSmartgridLesseeServiceGateway');

let gateway = null;
function createHttpSmartgridLesseeServiceGateway(single = true) {
    if (single && gateway) {
        return gateway;
    }
    gateway = new HttpSmartgridLesseeServiceGateway();
    return gateway;
};

module.exports = {
    createHttpSmartgridLesseeServiceGateway
};