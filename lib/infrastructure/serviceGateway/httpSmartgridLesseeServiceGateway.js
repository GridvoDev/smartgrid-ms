'use strict';
const rest = require('rest');
const mime = require('rest/interceptor/mime');
const bodyParser = require('body-parser');
const {restZipkinInterceptor} = require('gridvo-common-js');
const {tracer} = require('../../util');

const {SMARTGRID_LESSEE_SERVICE_HOST = "127.0.0.1", SMARTGRID_LESSEE_SERVICE_PORT = "3001"} = process.env;
class Gateway {
    constructor() {
        this._httpRequest = rest;
    }

    registerLessee(lesseeData, traceContext, callback) {
        var url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/lessees`;
        var options = {
            method: "POST",
            path: url,
            entity: {
                lesseeID: lesseeData.lesseeID,
                lesseeName: lesseeData.lesseeName
            }
        };
        let request = this._httpRequest.wrap(restZipkinInterceptor, {
            tracer,
            traceContext,
            serviceName: 'smartgrid-ms',
            remoteServiceName: 'smartgrid-lessee'
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
    addStationToLessee(lesseeID, stationData, traceContext, callback) {
        var url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/lessees/${lesseeID}/stations`;
        var options = {
            method: "POST",
            path: url,
            entity: {
                stationID: stationData.stationID,
                stationName: stationData.stationName
            }
        };
        let request = this._httpRequest.wrap(restZipkinInterceptor, {
            tracer,
            traceContext,
            serviceName: 'smartgrid-ms',
            remoteServiceName: 'smartgrid-lessee'
        }).wrap(mime, {mime: 'application/json'});
        request(options).then(response=> {
            let {stationID, errcode, errmsg} = response.entity;
            if (stationID && errcode == "0" && errmsg == "ok") {
                callback(null, stationID);
            }
            else {
                callback(null, null);
            }
        }).catch(err=> {
            callback(err);
        });
    }
    delStationFromLessee(lesseeID, stationID, traceContext, callback) {
        var url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/lessees/${lesseeID}/stations/${stationID}`;
        var options = {
            method: "DELETE",
            path: url,
            entity: {
                lesseeID: lesseeID,
                stationID: stationID
            }
        };
        let request = this._httpRequest.wrap(restZipkinInterceptor, {
            tracer,
            traceContext,
            serviceName: 'smartgrid-ms',
            remoteServiceName: 'smartgrid-lessee'
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
    delLessee(lesseeID, traceContext, callback) {
        var url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/lessees/${lesseeID}`;
        var options = {
            method: "DELETE",
            path: url,
            entity: {
                lesseeID: lesseeID
            }
        };
        let request = this._httpRequest.wrap(restZipkinInterceptor, {
            tracer,
            traceContext,
            serviceName: 'smartgrid-ms',
            remoteServiceName: 'smartgrid-lessee'
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
    getLessees(lesseeID, traceContext, callback) {
        var url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/lessees`;
        var options = {
            method: "GET",
            path: url,
            entity: {
                lesseeID: lesseeID
            }
        };
        let request = this._httpRequest.wrap(restZipkinInterceptor, {
            tracer,
            traceContext,
            serviceName: 'smartgrid-ms',
            remoteServiceName: 'smartgrid-lessee'
        }).wrap(mime, {mime: 'application/json'});
        request(options).then(response=> {
            let {errcode, errmsg, lessees} = response.entity;
            if (errcode == "0" && errmsg == "ok") {
                callback(null, lessees);
            }
            else {
                callback(null, null);
            }
        }).catch(err=> {
            callback(err);
        });
    }
    getStations(stationID, traceContext, callback) {
        var url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/stations`;
        var options = {
            method: "GET",
            path: url,
            entity: {
                stationID: stationID
            }
        };
        let request = this._httpRequest.wrap(restZipkinInterceptor, {
            tracer,
            traceContext,
            serviceName: 'smartgrid-ms',
            remoteServiceName: 'smartgrid-lessee'
        }).wrap(mime, {mime: 'application/json'});
        request(options).then(response=> {
            let {errcode, errmsg, stations} = response.entity;
            if (errcode == "0" && errmsg == "ok") {
                callback(null, stations);
            }
            else {
                callback(null, null);
            }
        }).catch(err=> {
            callback(err);
        });
    }
    registerDataSource(dataSource, traceContext, callback) {
        var url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/data-sources`;
        var options = {
            method: "POST",
            path: url,
            entity: {
                dataSourceID: dataSource.dataSourceID,
                dataSourceType: dataSource.dataSourceType,
                lessee: dataSource.lessee,
                station: dataSource.station
            }
        };
        let request = this._httpRequest.wrap(restZipkinInterceptor, {
            tracer,
            traceContext,
            serviceName: 'smartgrid-ms',
            remoteServiceName: 'smartgrid-lessee'
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
    delDataSource(dataSourceID, traceContext, callback) {
        var url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/dataSources/${dataSourceID}`;
        var options = {
            method: "DELETE",
            path: url,
            entity: {
                dataSourceID: dataSourceID
            }
        };
        let request = this._httpRequest.wrap(restZipkinInterceptor, {
            tracer,
            traceContext,
            serviceName: 'smartgrid-ms',
            remoteServiceName: 'smartgrid-lessee'
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
    getDataSources(dataSourceID, traceContext, callback) {
        var url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/dataSources`;
        var options = {
            method: "GET",
            path: url,
            entity: {
                dataSourceID: dataSourceID
            }
        };
        let request = this._httpRequest.wrap(restZipkinInterceptor, {
            tracer,
            traceContext,
            serviceName: 'smartgrid-ms',
            remoteServiceName: 'smartgrid-lessee'
        }).wrap(mime, {mime: 'application/json'});
        request(options).then(response=> {
            let {errcode, errmsg, datas} = response.entity;
            if (errcode == "0" && errmsg == "ok") {
                callback(null, datas);
            }
            else {
                callback(null, null);
            }
        }).catch(err=> {
            callback(err);
        });
    }
}

module.exports = Gateway;