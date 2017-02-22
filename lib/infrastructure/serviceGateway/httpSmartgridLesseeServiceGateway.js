'use strict';
const rest = require('rest');
const mime = require('rest/interceptor/mime');
const bodyParser = require('body-parser');
const {restZipkinInterceptor} = require('gridvo-common-js');
const {tracer} = require('../../util');
const {logger} = require('../../util');

const {SMARTGRID_LESSEE_SERVICE_HOST = "127.0.0.1", SMARTGRID_LESSEE_SERVICE_PORT = "3001"} = process.env;
class Gateway {
    constructor() {
        this._httpRequest = rest;
    }

    registerLessee(lesseeData, traceContext, callback) {
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/lessees`;
        let options = {
            method: "POST",
            path: url,
            entity: {
                lesseeID: lesseeData.lesseeID,
                lesseeName: lesseeData.lesseeName,
                corpID: lesseeData.corpID
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
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/lessees/${lesseeID}/stations`;
        let options = {
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
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/lessees/${lesseeID}/stations/${stationID}`;
        let options = {
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
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/lessees/${lesseeID}`;
        let options = {
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
    getLessee(lesseeID, traceContext, callback) {logger.error(lesseeID, traceContext);
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/lessees/${lesseeID}`;
        let options = {
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
            let {errcode, errmsg, lessee} = response.entity;logger.error(lesseeID, lessee);
            if (errcode == "0" && errmsg == "ok") {
                callback(null, lessee);
            }
            else {
                callback(null, null);
            }
        }).catch(err=> {
            callback(err);
        });
    }
    getLessees(traceContext, callback) {
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/lessees`;
        let options = {
            method: "GET",
            path: url
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
    getStation(stationID, traceContext, callback) {
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/stations/${stationID}`;
        let options = {
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
            let {errcode, errmsg, station} = response.entity;
            if (errcode == "0" && errmsg == "ok") {
                callback(null, station);
            }
            else {
                callback(null, null);
            }
        }).catch(err=> {
            callback(err);
        });
    }
    getStations(traceContext, callback) {
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/stations`;
        let options = {
            method: "GET",
            path: url
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
    registerPermission(permissionData, traceContext, callback) {
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/permissions`;
        let options = {
            method: "POST",
            path: url,
            entity: {
                permissionID: permissionData.permissionID,
                permissionName: permissionData.permissionName
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
    delPermission(permissionID, traceContext, callback) {
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/permissions/${permissionID}`;
        let options = {
            method: "DELETE",
            path: url,
            entity: {
                permissionID: permissionID
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
    getPermission(permissionID, traceContext, callback) {
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/permissions/${permissionID}`;
        let options = {
            method: "GET",
            path: url,
            entity: {
                permissionID: permissionID
            }
        };
        let request = this._httpRequest.wrap(restZipkinInterceptor, {
            tracer,
            traceContext,
            serviceName: 'smartgrid-ms',
            remoteServiceName: 'smartgrid-lessee'
        }).wrap(mime, {mime: 'application/json'});
        request(options).then(response=> {
            let {errcode, errmsg, permission} = response.entity;
            if (errcode == "0" && errmsg == "ok") {
                callback(null, permission);
            }
            else {
                callback(null, null);
            }
        }).catch(err=> {
            callback(err);
        });
    }
    getPermissions(traceContext, callback) {
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/permissions`;
        let options = {
            method: "GET",
            path: url
        };
        let request = this._httpRequest.wrap(restZipkinInterceptor, {
            tracer,
            traceContext,
            serviceName: 'smartgrid-ms',
            remoteServiceName: 'smartgrid-lessee'
        }).wrap(mime, {mime: 'application/json'});
        request(options).then(response=> {
            let {errcode, errmsg, permissions} = response.entity;
            if (errcode == "0" && errmsg == "ok") {
                callback(null, permissions);
            }
            else {
                callback(null, null);
            }
        }).catch(err=> {
            callback(err);
        });
    }
    registerRole(roleData, traceContext, callback) {
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/roles`;
        let options = {
            method: "POST",
            path: url,
            entity: {
                roleID: roleData.roleID,
                roleName: roleData.roleName,
                permissionID: roleData.permissionID
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
    delRole(roleID, traceContext, callback) {
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/roles/${roleID}`;
        let options = {
            method: "DELETE",
            path: url,
            entity: {
                roleID: roleID
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
    getRole(roleID, traceContext, callback) {
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/roles/${roleID}`;
        let options = {
            method: "GET",
            path: url,
            entity: {
                roleID: roleID
            }
        };
        let request = this._httpRequest.wrap(restZipkinInterceptor, {
            tracer,
            traceContext,
            serviceName: 'smartgrid-ms',
            remoteServiceName: 'smartgrid-lessee'
        }).wrap(mime, {mime: 'application/json'});
        request(options).then(response=> {
            let {errcode, errmsg, role} = response.entity;
            if (errcode == "0" && errmsg == "ok") {
                callback(null, role);
            }
            else {
                callback(null, null);
            }
        }).catch(err=> {
            callback(err);
        });
    }
    getRoles(traceContext, callback) {
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/roles`;
        let options = {
            method: "GET",
            path: url
        };
        let request = this._httpRequest.wrap(restZipkinInterceptor, {
            tracer,
            traceContext,
            serviceName: 'smartgrid-ms',
            remoteServiceName: 'smartgrid-lessee'
        }).wrap(mime, {mime: 'application/json'});
        request(options).then(response=> {
            let {errcode, errmsg, roles} = response.entity;
            if (errcode == "0" && errmsg == "ok") {
                callback(null, roles);
            }
            else {
                callback(null, null);
            }
        }).catch(err=> {
            callback(err);
        });
    }
    assignPermissionToRole(permissionID, roleID, traceContext, callback) {
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/roles/${roleID}/permissions`;
        let options = {
            method: "POST",
            path: url,
            entity: {
                roleID: roleID,
                permissionID: permissionID
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
    canclePermissionofRole(permissionID, roleID, traceContext, callback) {
        let url = `http://${SMARTGRID_LESSEE_SERVICE_HOST}:${SMARTGRID_LESSEE_SERVICE_PORT}/roles/${roleID}/permissions`;
        let options = {
            method: "DELETE",
            path: url,
            entity: {
                roleID: roleID,
                permissionID: permissionID
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