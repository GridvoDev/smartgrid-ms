'use strict';
const rest = require('rest');
const mime = require('rest/interceptor/mime');
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
}

module.exports = Gateway;