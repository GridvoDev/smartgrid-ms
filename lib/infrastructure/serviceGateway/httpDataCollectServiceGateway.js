'use strict';
const rest = require('rest');
const mime = require('rest/interceptor/mime');
const bodyParser = require('body-parser');
const {restZipkinInterceptor} = require('gridvo-common-js');
const {tracer} = require('../../util');
const {logger} = require('../../util');

const {DATA_COLLECT_SERVICE_HOST = "127.0.0.1", DATA_COLLECT_SERVICE_PORT = "3001"} = process.env;
class Gateway {
    constructor() {
        this._httpRequest = rest;
    }

    registerDataSource(dataSourceData, traceContext, callback) {
        var url = `http://${DATA_COLLECT_SERVICE_HOST}:${DATA_COLLECT_SERVICE_PORT}/data-sources`;
        logger.error(url, traceContext);
        var options = {
            method: "POST",
            path: url,
            entity: {
                dataSourceID: dataSourceData.dataSourceID,
                dataType: dataSourceData.dataType,
                station: dataSourceData.station,
                lessee: dataSourceData.lessee
            }
        };
        let request = this._httpRequest.wrap(restZipkinInterceptor, {
            tracer,
            traceContext,
            serviceName: 'smartgrid-ms',
            remoteServiceName: 'data-collect'
        }).wrap(mime, {mime: 'application/json'});
        request(options).then(response=> {
            let {errcode, errmsg} = response.entity;
            if (errcode == "0" && errmsg == "ok") {
                callback(null, true);
            }
            else {
                callback(null, false);
            }
        }).catch(err=> {
            callback(err);
        });
    }
    // delDataSource(dataSourceID, traceContext, callback) {
    //     var url = `http://${DATA_COLLECT_SERVICE_HOST}:${DATA_COLLECT_SERVICE_PORT}/data-sources/${dataSourceID}`;
    //     var options = {
    //         method: "DELETE",
    //         path: url,
    //         entity: {
    //             dataSourceID: dataSourceID
    //         }
    //     };
    //     let request = this._httpRequest.wrap(restZipkinInterceptor, {
    //         tracer,
    //         traceContext,
    //         serviceName: 'smartgrid-ms',
    //         remoteServiceName: 'smartgrid-lessee'
    //     }).wrap(mime, {mime: 'application/json'});
    //     request(options).then(response=> {
    //         let {errcode, errmsg} = response.entity;
    //         if (errcode == "0" && errmsg == "ok") {
    //             callback(null, true);
    //         }
    //         else {
    //             callback(null, false);
    //         }
    //     }).catch(err=> {
    //         callback(err);
    //     });
    // }
    // getDataSource(dataSourceID, traceContext, callback) {
    //     var url = `http://${DATA_COLLECT_SERVICE_HOST}:${DATA_COLLECT_SERVICE_PORT}/data-sources/${dataSourceID}`;
    //     var options = {
    //         method: "GET",
    //         path: url,
    //         entity: {
    //             dataSourceID: dataSourceID
    //         }
    //     };
    //     let request = this._httpRequest.wrap(restZipkinInterceptor, {
    //         tracer,
    //         traceContext,
    //         serviceName: 'smartgrid-ms',
    //         remoteServiceName: 'smartgrid-lessee'
    //     }).wrap(mime, {mime: 'application/json'});
    //     request(options).then(response=> {
    //         let {errcode, errmsg, dataSource} = response.entity;
    //         if (errcode == "0" && errmsg == "ok") {
    //             callback(null, dataSource);
    //         }
    //         else {
    //             callback(null, null);
    //         }
    //     }).catch(err=> {
    //         callback(err);
    //     });
    // }
    // getDataSources(dataSourceID, traceContext, callback) {
    //     var url = `http://${DATA_COLLECT_SERVICE_HOST}:${DATA_COLLECT_SERVICE_PORT}/data-sources/${dataSourceID}`;
    //     var options = {
    //         method: "GET",
    //         path: url,
    //         entity: {
    //             dataSourceID: dataSourceID
    //         }
    //     };
    //     let request = this._httpRequest.wrap(restZipkinInterceptor, {
    //         tracer,
    //         traceContext,
    //         serviceName: 'smartgrid-ms',
    //         remoteServiceName: 'smartgrid-lessee'
    //     }).wrap(mime, {mime: 'application/json'});
    //     request(options).then(response=> {
    //         let {errcode, errmsg, dataSource} = response.entity;
    //         if (errcode == "0" && errmsg == "ok") {
    //             callback(null, dataSource);
    //         }
    //         else {
    //             callback(null, null);
    //         }
    //     }).catch(err=> {
    //         callback(err);
    //     });
    // }
}

module.exports = Gateway;