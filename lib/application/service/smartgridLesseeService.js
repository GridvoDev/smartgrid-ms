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
    addDataSource(dataSource, traceContext, callback) {
        if (!dataSource || !dataSource.dataSourceID || !dataSource.lessee || !dataSource.station || !dataSource.dataSourceType) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.registerDataSource(dataSource, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }
    delDataSource(dataSourceID, traceContext, callback) {
        if (!dataSourceID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.delDataSource(dataSourceID, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }
    getDataSources(dataSourceID, traceContext, callback) {
        this._httpSmartgridLesseeServiceGateway.getDataSources(dataSourceID, traceContext, (err, datas) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, datas);
            }
        );
    }

}

module.exports = Service;