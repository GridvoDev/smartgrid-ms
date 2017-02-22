'use strict';
const _ = require('underscore');
const {createHttpSmartgridLesseeServiceGateway} = require('../../infrastructure');

class Service {
    constructor() {
        this._httpSmartgridLesseeServiceGateway = createHttpSmartgridLesseeServiceGateway();
    }

    addLessee(lesseeData, traceContext, callback) {
        if (!lesseeData || !lesseeData.lesseeID || !lesseeData.lesseeName || !lesseeData.corpID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.registerLessee(lesseeData, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }

    addStation(lesseeID, stationData, traceContext, callback) {
        if (!lesseeID || !stationData || !stationData.stationID || !stationData.stationName) {
            callback(null, null);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.addStationToLessee(lesseeID, stationData, traceContext, (err, stationID) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, stationID);
            }
        );
    }

    delStation(lesseeID, stationID, traceContext, callback) {
        if (!lesseeID || !stationID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.delStationFromLessee(lesseeID, stationID, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }
    delLessee(lesseeID, traceContext, callback) {
        if (!lesseeID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.delLessee(lesseeID, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }
    getLessees(lesseeID, traceContext, callback) {
        this._httpSmartgridLesseeServiceGateway.getLessees(lesseeID, traceContext, (err, lessees) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, lessees);
            }
        );
    }
    getStations(stationID, traceContext, callback) {
        this._httpSmartgridLesseeServiceGateway.getStations(stationID, traceContext, (err, stations) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, stations);
            }
        );
    }
    addPermission(permissionData, traceContext, callback) {
        if (!permissionData || !permissionData.permissionID || !permissionData.permissionName) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.registerPermission(permissionData, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }
    delPermission(permissionID, traceContext, callback) {
        if (!permissionID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.delPermission(permissionID, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }
    getPermission(permissionID, traceContext, callback) {
        this._httpSmartgridLesseeServiceGateway.getPermission(permissionID, traceContext, (err, permissions) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, permissions);
            }
        );
    }

}

module.exports = Service;