'use strict';
const _ = require('underscore');
const {createHttpSmartgridLesseeServiceGateway} = require('../../infrastructure');

class Service {
    constructor() {
        this._httpSmartgridLesseeServiceGateway = createHttpSmartgridLesseeServiceGateway();
    }

    addLessee(lesseeData, traceContext, callback) {
        if (!lesseeData || !lesseeData.lesseeID || !lesseeData.lesseeName) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.registerLessee(lesseeData, traceContext, (err, isSuccess)=> {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, true);
            }
        );
    }
}

module.exports = Service;