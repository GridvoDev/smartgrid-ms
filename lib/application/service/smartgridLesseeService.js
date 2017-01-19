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
    addStation(lesseeID, stationData, traceContext, callback) {
        if (!lesseeID || lesseeID == "noLesseeID" || !stationData || !stationData.stationID || !stationData.stationName) {
            callback(null, null);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.addStationToLessee(lesseeID, stationData, traceContext, (err, stationID)=> {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, stationID);
            }
        );
    }
}

module.exports = Service;