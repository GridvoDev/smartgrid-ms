'use strict';
const _ = require('underscore');
const co = require('co');
const should = require('should');
const express = require('express');
const bodyParser = require('body-parser');
const {TraceContext} = require('gridvo-common-js');
const HttpSmartgridLesseeServiceGateway = require('../../../lib/infrastructure/serviceGateway/httpSmartgridLesseeServiceGateway');

describe('HttpSmartgridLesseeServiceGateway use case test', ()=> {
    let app;
    let server;
    let gateway;
    before(done=> {
        function setupExpress() {
            return new Promise((resolve, reject)=> {
                app = express();
                app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({extended: false}));
                app.post('/lessees', (req, res)=> {
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
                app.post('/lessees/:lesseeID/stations', (req, res)=> {
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
                app.delete('/lessees/:lesseeID/stations/:stationID', (req, res)=> {
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
                app.delete('/lessees/:lesseeID', (req, res)=> {
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
                app.get('/lessees', (req, res)=> {
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
                app.get('/stations', (req, res)=> {
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
                app.post('/dataSources', (req, res)=> {
                    if (req.body.dataSourceID == "station-datatype-other") {
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
                app.delete('/dataSources/:dataSourceID', (req, res)=> {
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
                app.get('/dataSources', (req, res)=> {
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
                app.post('/permissions', (req, res)=> {
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
                app.delete('/permissions/:permissionID', (req, res)=> {
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
                app.get('/permissions', (req, res)=> {
                    if (req.body.permissionID == "permissionID" || !req.body.permissionID) {
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
                server = app.listen(3001, err=> {
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
        co(setup).then(()=> {
            gateway = new HttpSmartgridLesseeServiceGateway();
            done();
        }).catch(err=> {
            done(err);
        });
    });
    describe('registerLessee(lesseeData, traceContext, callback)', ()=> {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('register lessee', ()=> {
            it('should return null if no this lesseeData', done=> {
                let lesseeData = {};
                gateway.registerLessee(lesseeData, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done=> {
                let lesseeData = {};
                lesseeData.lesseeID = "lesseeID";
                lesseeData.lesseeName = "lesseeName";
                gateway.registerLessee(lesseeData, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('addStationToLessee(lesseeID, stationData, traceContext, callback)', ()=> {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('add station to lessee', ()=> {
            it('should return null if no this lesseeID', done=> {
                let lesseeID = "noLesseeID";
                let stationData = {};
                stationData.stationID = "stationID";
                stationData.stationName = "stationName";
                gateway.addStationToLessee(lesseeID, stationData, traceContext, (err, stationID)=> {
                    _.isNull(stationID).should.be.eql(true);
                    done();
                });
            });
            it('should return null if no this station data', done=> {
                let lesseeID = "lesseeID";
                let stationData = {};
                gateway.addStationToLessee(lesseeID, stationData, traceContext, (err, stationID)=> {
                    _.isNull(stationID).should.be.eql(true);
                    done();
                });
            });
            it('is ok', done=> {
                let lesseeID = "lesseeID";
                let stationData = {};
                stationData.stationID = "stationID";
                stationData.stationName = "stationName";
                gateway.addStationToLessee(lesseeID, stationData, traceContext, (err, stationID)=> {
                    stationID.should.be.eql("stationID");
                    done();
                });
            });
        });
    });
    describe('delStationFromLessee(lesseeID, stationID, traceContext, callback)', ()=> {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('del station from lessee', ()=> {
            it('should return null if no this lesseeID', done=> {
                let lesseeID = "noLesseeID";
                let stationID = "stationID";
                gateway.delStationFromLessee(lesseeID, stationID, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('should return null if no this stationID', done=> {
                let lesseeID = "lesseeID";
                let stationID = "noStationID";
                gateway.delStationFromLessee(lesseeID, stationID, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done=> {
                let lesseeID = "lesseeID";
                let stationID = "stationID";
                gateway.delStationFromLessee(lesseeID, stationID, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('delLessee(lesseeID, traceContext, callback)', ()=> {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('del lessee', ()=> {
            it('should return null if no this lesseeID', done=> {
                let lesseeID = "noLesseeID";
                gateway.delLessee(lesseeID, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done=> {
                let lesseeID = "lesseeID";
                gateway.delLessee(lesseeID, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('getLessees(lesseeID, traceContext, callback)', ()=> {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('get lessee', ()=> {
            it('should return null if no this lesseeID', done=> {
                let lesseeID = "noLesseeID";
                gateway.getLessees(lesseeID, traceContext, (err, lesseesJSON)=> {
                    _.isNull(lesseesJSON).should.be.eql(true);
                    done();
                });
            });
            it('is ok', done=> {
                let lesseeID = "lesseeID";
                gateway.getLessees(lesseeID, traceContext, (err, lesseesJSON)=> {
                    _.isNull(lesseesJSON).should.be.eql(false);
                    done();
                });
            });
            it('is ok', done=> {
                let lesseeID = "";
                gateway.getLessees(lesseeID, traceContext, (err, lesseesJSON)=> {
                    _.isNull(lesseesJSON).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('getStations(stationID, traceContext, callback)', ()=> {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('get station', ()=> {
            it('should return null if no this stationID', done=> {
                let stationID = "noStationID";
                gateway.getStations(stationID, traceContext, (err, stationsJSON)=> {
                    _.isNull(stationsJSON).should.be.eql(true);
                    done();
                });
            });
            it('is ok', done=> {
                let stationID = "stationID";
                gateway.getStations(stationID, traceContext, (err, stationsJSON)=> {
                    _.isNull(stationsJSON).should.be.eql(false);
                    done();
                });
            });
            it('is ok', done=> {
                let stationID = "";
                gateway.getStations(stationID, traceContext, (err, stationsJSON)=> {
                    _.isNull(stationsJSON).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('registerDataSource(dataSource, traceContext, callback)', ()=> {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('register dataSource', ()=> {
            it('fail if dataSource is illegal', done=> {
                let dataSource = {};
                gateway.registerDataSource(dataSource, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done=> {
                let dataSource = {};
                dataSource.dataSourceID = "station-datatype-other";
                dataSource.dataSourceType = "dataSourceType";
                dataSource.lessee = "lesseeID";
                dataSource.station = "stationID";
                gateway.registerDataSource(dataSource, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('delDataSource(dataSourceID, traceContext, callback)', ()=> {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('del dataSource', ()=> {
            it('should return null if no this dataSourceID', done=> {
                let dataSourceID = "noDataSourceID";
                gateway.delDataSource(dataSourceID, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done=> {
                let dataSourceID = "station-datatype-other";
                gateway.delDataSource(dataSourceID, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('getDataSources(dataSourceID, traceContext, callback)', ()=> {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('get dataSource', ()=> {
            it('should return null if no this dataSourceID', done=> {
                let dataSourceID = "noDataSourceID";
                gateway.getDataSources(dataSourceID, traceContext, (err, dataSourcesJSON)=> {
                    _.isNull(dataSourcesJSON).should.be.eql(true);
                    done();
                });
            });
            it('is ok', done=> {
                let dataSourceID = "station-datatype-other";
                gateway.getDataSources(dataSourceID, traceContext, (err, dataSourcesJSON)=> {
                    _.isNull(dataSourcesJSON).should.be.eql(false);
                    done();
                });
            });
            it('is ok', done=> {
                let dataSourceID = "";
                gateway.getDataSources(dataSourceID, traceContext, (err, dataSourcesJSON)=> {
                    _.isNull(dataSourcesJSON).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('registerPermission(permissionData, traceContext, callback)', ()=> {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('register permission', ()=> {
            it('fail if permission is illegal', done=> {
                let permissionData = {};
                gateway.registerPermission(permissionData, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done=> {
                let permissionData = {};
                permissionData.permissionID = "permissionID";
                permissionData.permissionName = "permissionName";
                gateway.registerPermission(permissionData, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('delPermission(permissionID, traceContext, callback)', ()=> {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('del permission', ()=> {
            it('should return null if no this permissionID', done=> {
                let permissionID = "noPermissionID";
                gateway.delPermission(permissionID, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done=> {
                let permissionID = "permissionID";
                gateway.delPermission(permissionID, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('getPermission(permissionID, traceContext, callback)', ()=> {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('get permission', ()=> {
            it('should return null if no this permissionID', done=> {
                let permissionID = "noPermissionID";
                gateway.getPermission(permissionID, traceContext, (err, permissionJSON)=> {
                    _.isNull(permissionJSON).should.be.eql(true);
                    done();
                });
            });
            it('is ok', done=> {
                let permissionID = "permissionID";
                gateway.getPermission(permissionID, traceContext, (err, permissionJSON)=> {
                    _.isNull(permissionJSON).should.be.eql(false);
                    done();
                });
            });
            it('is ok', done=> {
                let permissionID = "";
                gateway.getPermission(permissionID, traceContext, (err, permissionJSON)=> {
                    _.isNull(permissionJSON).should.be.eql(false);
                    done();
                });
            });
        });
    });
    after(done=> {
        function teardownExpress() {
            return new Promise((resolve, reject)=> {
                server.close(err=> {
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
        co(teardown).then(()=> {
            done();
        }).catch(err=> {
            done(err);
        })
    });
});