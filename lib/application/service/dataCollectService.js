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
    getDataSource(dataSourceID, traceContext, callback) {
        this._httpDataCollectServiceGateway.getDataSource(dataSourceID, traceContext, (err, dataSource) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, dataSource);
            }
        );
    }
    getDataSources(queryOpts, traceContext, callback) {
        this._httpDataCollectServiceGateway.getDataSources(queryOpts, traceContext, (err, dataSources) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, dataSources);
            }
        );
    }

}

module.exports = Service;