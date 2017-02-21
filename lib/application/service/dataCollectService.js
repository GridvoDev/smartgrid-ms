'use strict';
const _ = require('underscore');
const {createHttpDataCollectServiceGateway} = require('../../infrastructure');

class Service {
    constructor() {
        this._httpDataCollectServiceGateway = createHttpDataCollectServiceGateway();
    }

    addDataSource(dataSourceData, traceContext, callback) {
        if (!dataSourceData || !dataSourceData.dataSourceID || !dataSourceData.lessee || !dataSourceData.station || !dataSourceData.dataType) {
            callback(null, false);
            return;
        }
        this._httpDataCollectServiceGateway.registerDataSource(dataSourceData, traceContext, (err, isSuccess) => {
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
        this._httpDataCollectServiceGateway.delDataSource(dataSourceID, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }
    getDataSources(dataSourceID, traceContext, callback) {
        this._httpDataCollectServiceGateway.getDataSources(dataSourceID, traceContext, (err, dataSourcesJSON) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, dataSourcesJSON);
            }
        );
    }

}

module.exports = Service;