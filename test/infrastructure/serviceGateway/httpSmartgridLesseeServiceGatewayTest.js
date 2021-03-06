'use strict';
const _ = require('underscore');
const co = require('co');
const should = require('should');
const express = require('express');
const bodyParser = require('body-parser');
const {TraceContext} = require('gridvo-common-js');
const HttpSmartgridLesseeServiceGateway = require('../../../lib/infrastructure/serviceGateway/httpSmartgridLesseeServiceGateway');

describe('HttpSmartgridLesseeServiceGateway use case test', () => {
    let app;
    let server;
    let gateway;
    before(done => {
        function setupExpress() {
            return new Promise((resolve, reject) => {
                app = express();
                app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({extended: false}));
                app.post('/lessees', (req, res) => {
                    if (req.body.lesseeID == "lesseeID" && req.body.lesseeName == "lesseeName") {
                        res.json({
                            errcode: 0,
                            errmsg: "ok"
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.post('/lessees/:lesseeID/stations', (req, res) => {
                    if (req.params.lesseeID == "lesseeID" && req.body.stationID == "stationID" && req.body.stationName == "stationName") {
                        res.json({
                            errcode: 0,
                            errmsg: "ok",
                            stationID: "stationID"
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.delete('/lessees/:lesseeID/stations/:stationID', (req, res) => {
                    if (req.params.lesseeID == "lesseeID" && req.params.stationID == "stationID") {
                        res.json({
                            errcode: 0,
                            errmsg: "ok"
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.delete('/lessees/:lesseeID', (req, res) => {
                    if (req.params.lesseeID == "lesseeID") {
                        res.json({
                            errcode: 0,
                            errmsg: "ok"
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.get('/lessees', (req, res) => {
                    if (req.body.lesseeID == "lesseeID" || !req.body.lesseeID) {
                        res.json({
                            errcode: 0,
                            errmsg: "ok",
                            lessees: []
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.get('/stations', (req, res) => {
                    if (req.body.stationID == "stationID" || !req.body.stationID) {
                        res.json({
                            errcode: 0,
                            errmsg: "ok",
                            lessees: []
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.post('/data-sources', (req, res) => {
                    if (req.body.dataSourceID == "station-type-other" && req.body.dataType == "dataType" && req.body.station == "stationID" && req.body.lessee == "lesseeID") {
                        res.json({
                            errcode: 0,
                            errmsg: "ok"
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.delete('/dataSources/:dataSourceID', (req, res) => {
                    if (req.params.dataSourceID == "station-datatype-other") {
                        res.json({
                            errcode: 0,
                            errmsg: "ok"
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.get('/dataSources', (req, res) => {
                    if (req.body.dataSourceID == "station-datatype-other" || !req.body.dataSourceID) {
                        res.json({
                            errcode: 0,
                            errmsg: "ok",
                            datas: []
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.post('/permissions', (req, res) => {
                    if (req.body.permissionID == "permissionID" && req.body.permissionName == "permissionName") {
                        res.json({
                            errcode: 0,
                            errmsg: "ok"
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.delete('/permissions/:permissionID', (req, res) => {
                    if (req.params.permissionID == "permissionID") {
                        res.json({
                            errcode: 0,
                            errmsg: "ok"
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.get('/permissions/:permissionID', (req, res) => {
                    if (req.params.permissionID == "permissionID") {
                        res.json({
                            errcode: 0,
                            errmsg: "ok",
                            permission: {}
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.get('/permissions', (req, res) => {
                    res.json({
                        errcode: 0,
                        errmsg: "ok",
                        permission: {}
                    });
                });
                app.post('/roles', (req, res) => {
                    if (req.body.roleID == "roleID" && req.body.roleName == "roleName" && req.body.permissionID == "permissionID") {
                        res.json({
                            errcode: 0,
                            errmsg: "ok"
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.delete('/roles/:roleID', (req, res) => {
                    if (req.params.roleID == "roleID") {
                        res.json({
                            errcode: 0,
                            errmsg: "ok"
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.get('/roles/:roleID', (req, res) => {
                    if (req.params.roleID == "permissionID") {
                        res.json({
                            errcode: 0,
                            errmsg: "ok",
                            permission: {}
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.get('/roles', (req, res) => {
                    res.json({
                        errcode: 0,
                        errmsg: "ok",
                        permission: {}
                    });
                });
                app.post('/roles/:roleID/permissions', (req, res) => {
                    if (req.body.permissionID == "permissionID" && req.params.roleID == "roleID") {
                        res.json({
                            errcode: 0,
                            errmsg: "ok"
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                app.delete('/roles/:roleID/permissions', (req, res) => {
                    if (req.body.permissionID == "permissionID" && req.params.roleID == "roleID") {
                        res.json({
                            errcode: 0,
                            errmsg: "ok"
                        });
                    }
                    else {
                        res.json({
                            errcode: 400,
                            errmsg: "fail"
                        });
                    }
                });
                server = app.listen(3001, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        };
        function* setup() {
            yield setupExpress();
        };
        co(setup).then(() => {
            gateway = new HttpSmartgridLesseeServiceGateway();
            done();
        }).catch(err => {
            done(err);
        });
    });
    describe('registerLessee(lesseeData, traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('register lessee', () => {
            it('should return null if no this lesseeData', done => {
                let lesseeData = {};
                gateway.registerLessee(lesseeData, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done => {
                let lesseeData = {};
                lesseeData.lesseeID = "lesseeID";
                lesseeData.lesseeName = "lesseeName";
                lesseeData.corpID = "corpID";
                gateway.registerLessee(lesseeData, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('addStationToLessee(lesseeID, stationData, traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('add station to lessee', () => {
            it('should return null if no this lesseeID', done => {
                let lesseeID = "noLesseeID";
                let stationData = {};
                stationData.stationID = "stationID";
                stationData.stationName = "stationName";
                gateway.addStationToLessee(lesseeID, stationData, traceContext, (err, stationID) => {
                    _.isNull(stationID).should.be.eql(true);
                    done();
                });
            });
            it('should return null if no this station data', done => {
                let lesseeID = "lesseeID";
                let stationData = {};
                gateway.addStationToLessee(lesseeID, stationData, traceContext, (err, stationID) => {
                    _.isNull(stationID).should.be.eql(true);
                    done();
                });
            });
            it('is ok', done => {
                let lesseeID = "lesseeID";
                let stationData = {};
                stationData.stationID = "stationID";
                stationData.stationName = "stationName";
                gateway.addStationToLessee(lesseeID, stationData, traceContext, (err, stationID) => {
                    stationID.should.be.eql("stationID");
                    done();
                });
            });
        });
    });
    describe('delStationFromLessee(lesseeID, stationID, traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('del station from lessee', () => {
            it('should return null if no this lesseeID', done => {
                let lesseeID = "noLesseeID";
                let stationID = "stationID";
                gateway.delStationFromLessee(lesseeID, stationID, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('should return null if no this stationID', done => {
                let lesseeID = "lesseeID";
                let stationID = "noStationID";
                gateway.delStationFromLessee(lesseeID, stationID, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done => {
                let lesseeID = "lesseeID";
                let stationID = "stationID";
                gateway.delStationFromLessee(lesseeID, stationID, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('delLessee(lesseeID, traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('del lessee', () => {
            it('should return null if no this lesseeID', done => {
                let lesseeID = "noLesseeID";
                gateway.delLessee(lesseeID, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done => {
                let lesseeID = "lesseeID";
                gateway.delLessee(lesseeID, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('getLessee(lesseeID, traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('get lessee', () => {
            it('should return null if no this lesseeID', done => {
                let lesseeID = "noLesseeID";
                gateway.getLessee(lesseeID, traceContext, (err, lessee) => {
                    _.isNull(lessee).should.be.eql(true);
                    done();
                });
            });
            it('is ok', done => {
                let lesseeID = "lesseeID";
                gateway.getLessee(lesseeID, traceContext, (err, lessee) => {
                    _.isNull(lessee).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('getLessees(traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('get lessee', () => {
            it('is ok', done => {
                gateway.getLessees(traceContext, (err, lessees) => {
                    _.isNull(lessees).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('getStation(stationID, traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('get station', () => {
            it('should return null if no this stationID', done => {
                let stationID = "noStationID";
                gateway.getStation(stationID, traceContext, (err, station) => {
                    _.isNull(station).should.be.eql(true);
                    done();
                });
            });
            it('is ok', done => {
                let stationID = "stationID";
                gateway.getStation(stationID, traceContext, (err, station) => {
                    _.isNull(station).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('getStations(traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('get station', () => {
            it('is ok', done => {
                gateway.getStations(traceContext, (err, stations) => {
                    _.isNull(stations).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('registerPermission(permissionData, traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('register permission', () => {
            it('fail if permission is illegal', done => {
                let permissionData = {};
                gateway.registerPermission(permissionData, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done => {
                let permissionData = {};
                permissionData.permissionID = "permissionID";
                permissionData.permissionName = "permissionName";
                gateway.registerPermission(permissionData, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('delPermission(permissionID, traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('del permission', () => {
            it('should return null if no this permissionID', done => {
                let permissionID = "noPermissionID";
                gateway.delPermission(permissionID, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done => {
                let permissionID = "permissionID";
                gateway.delPermission(permissionID, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('getPermission(permissionID, traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('get permission', () => {
            it('should return null if no this permissionID', done => {
                let permissionID = "noPermissionID";
                gateway.getPermission(permissionID, traceContext, (err, permission) => {
                    _.isNull(permission).should.be.eql(true);
                    done();
                });
            });
            it('is ok', done => {
                let permissionID = "permissionID";
                gateway.getPermission(permissionID, traceContext, (err, permission) => {
                    _.isNull(permission).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('getPermissions(traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('get all permissions', () => {
            it('is ok', done => {
                gateway.getPermissions(traceContext, (err, permissions) => {
                    _.isNull(permissions).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('registerRole(roleData, traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('register role', () => {
            it('fail if role is illegal', done => {
                let roleData = {};
                gateway.registerRole(roleData, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done => {
                let roleData = {};
                roleData.roleID = "roleID";
                roleData.roleName = "roleName";
                roleData.permissionID = "permissionID";
                gateway.registerRole(roleData, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('delRole(roleID, traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('del role', () => {
            it('should return null if no this roleID', done => {
                let roleID = "noRoleID";
                gateway.delRole(roleID, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done => {
                let roleID = "roleID";
                gateway.delRole(roleID, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('getRole(roleID, traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('get role', () => {
            it('should return null if no this roleID', done => {
                let roleID = "noRoleID";
                gateway.getRole(roleID, traceContext, (err, role) => {
                    _.isNull(role).should.be.eql(true);
                    done();
                });
            });
            it('is ok', done => {
                let roleID = "roleID";
                gateway.getRole(roleID, traceContext, (err, role) => {
                    _.isNull(role).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('getRoles(traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('get all roles', () => {
            it('is ok', done => {
                gateway.getRoles(traceContext, (err, roles) => {
                    _.isNull(roles).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('assignPermissionToRole(permissionID, roleID, traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('assign permission to role', () => {
            it('should return null if no this permissionID', done => {
                let permissionID = "noPermissionID";
                let roleID = "roleID";
                gateway.assignPermissionToRole(permissionID, roleID, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('should return null if no this roleID', done => {
                let permissionID = "permissionID";
                let roleID = "noRoleID";
                gateway.assignPermissionToRole(permissionID, roleID, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done => {
                let permissionID = "permissionID";
                let roleID = "roleID";
                gateway.assignPermissionToRole(permissionID, roleID, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('canclePermissionofRole(permissionID, roleID, traceContext, callback)', () => {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('assign permission to role', () => {
            it('should return null if no this permissionID', done => {
                let permissionID = "noPermissionID";
                let roleID = "roleID";
                gateway.canclePermissionofRole(permissionID, roleID, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('should return null if no this roleID', done => {
                let permissionID = "permissionID";
                let roleID = "noRoleID";
                gateway.canclePermissionofRole(permissionID, roleID, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done => {
                let permissionID = "permissionID";
                let roleID = "roleID";
                gateway.canclePermissionofRole(permissionID, roleID, traceContext, (err, isSuccess) => {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    after(done => {
        function teardownExpress() {
            return new Promise((resolve, reject) => {
                server.close(err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        };
        function* teardown() {
            yield teardownExpress();
        };
        co(teardown).then(() => {
            done();
        }).catch(err => {
            done(err);
        })
    });
});