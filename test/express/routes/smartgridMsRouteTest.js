const _ = require('underscore');
const co = require('co');
const async = require('async');
const should = require('should');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const smartgridMsRoute = require('../../../lib/express/routes/smartgridMsRoute.js');
const errCodeTable = require('../../../lib/express/util/errCode.js');
const {expressZipkinMiddleware, createZipkinTracer} = require("gridvo-common-js");

describe('smartgridMs route use case test', () => {
    let app;
    let server;
    before(done => {
        function setupExpress() {
            return new Promise((resolve, reject) => {
                app = express();
                app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({extended: false}));
                app.use(expressZipkinMiddleware({
                    tracer: createZipkinTracer({}),
                    serviceName: 'test-service'
                }));
                app.use('/', smartgridMsRoute);
                let mockSmartgridLesseeService = {};
                let mockDataCollectService = {};
                mockSmartgridLesseeService.addLessee = function (lesseeData, traceContext, callback) {
                    if (!lesseeData || !lesseeData.lesseeID || !lesseeData.lesseeName || !lesseeData.corpID) {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                };
                mockSmartgridLesseeService.addStation = function (lesseeID, stationData, traceContext, callback) {
                    if (!lesseeID || lesseeID == "noLesseeID" || !stationData || !stationData.stationID || !stationData.stationName) {
                        callback(null, null);
                        return;
                    }
                    callback(null, stationData.stationID);
                };
                mockSmartgridLesseeService.delStation = function (lesseeID, stationID, traceContext, callback) {
                    if (!lesseeID || !stationID) {
                        callback(null, false);
                        return;
                    }
                    if (lesseeID == "noLesseeID" || stationID == "noStationID") {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                };
                mockSmartgridLesseeService.delLessee = function (lesseeID, traceContext, callback) {
                    if (!lesseeID || lesseeID == "noLesseeID") {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                };
                mockSmartgridLesseeService.getLessee = function (lesseeID, traceContext, callback) {
                    if (!lesseeID || lesseeID == "noLesseeID") {
                        callback(null, null);
                        return;
                    }
                    callback(null, []);
                };
                mockSmartgridLesseeService.getLessees = function (traceContext, callback) {
                    callback(null, []);
                };
                mockSmartgridLesseeService.getStation = function (stationID, traceContext, callback) {
                    if (!stationID || stationID == "noStationID") {
                        callback(null, null);
                        return;
                    }
                    callback(null, []);
                };
                mockSmartgridLesseeService.getStations = function (traceContext, callback) {
                    callback(null, []);
                };
                mockDataCollectService.addDataSource = function (dataSourceData, traceContext, callback) {
                    if (!dataSourceData || !dataSourceData.dataSourceID || !dataSourceData.lessee || !dataSourceData.station || !dataSourceData.dataType) {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                };
                mockDataCollectService.delDataSource = function (dataSourceID, traceContext, callback) {
                    if (!dataSourceID || dataSourceID == "noDataSourceID") {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                };
                mockDataCollectService.getDataSource = function (dataSourceID, traceContext, callback) {
                    if (!dataSourceID || dataSourceID == "noDataSourceID") {
                        callback(null, null);
                        return;
                    }
                    callback(null, []);
                };
                mockDataCollectService.getDataSources = function (queryOpts, traceContext, callback) {
                    callback(null, []);
                };
                mockSmartgridLesseeService.addPermission = function (permissionData, traceContext, callback) {
                    if (!permissionData || !permissionData.permissionID || !permissionData.permissionName) {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                };
                mockSmartgridLesseeService.delPermission = function (permissionID, traceContext, callback) {
                    if (!permissionID || permissionID == "noPermissionID") {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                };
                mockSmartgridLesseeService.getPermission = function (permissionID, traceContext, callback) {
                    if (!permissionID || permissionID == "noPermissionID") {
                        callback(null, null);
                        return;
                    }
                    callback(null, []);
                };
                mockSmartgridLesseeService.getPermissions = function (traceContext, callback) {
                    callback(null, []);
                };
                mockSmartgridLesseeService.addRole = function (roleData, traceContext, callback) {
                    if (!roleData || !roleData.roleID || !roleData.roleName || !roleData.permissionID) {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                };
                mockSmartgridLesseeService.getRoles = function (traceContext, callback) {
                    callback(null, {});
                };
                mockSmartgridLesseeService.getRole = function (roleID, traceContext, callback) {
                    if (!roleID || roleID == "noRoleID") {
                        callback(null, null);
                        return;
                    }
                    callback(null, {});
                };
                mockSmartgridLesseeService.delRole = function (roleID, traceContext, callback) {
                    if (!roleID || roleID == "noRoleID") {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                };
                mockSmartgridLesseeService.assignPermissionToRole = function (permissionID, roleID, traceContext, callback) {
                    if (!roleID || !permissionID || roleID == "noRoleID" || permissionID == "noPermissionID") {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                };
                mockSmartgridLesseeService.canclePermissionofRole = function (permissionID, roleID, traceContext, callback) {
                    if (!roleID || !permissionID || roleID == "noRoleID" || permissionID == "noPermissionID") {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                };
                app.set('smartgridLesseeService', mockSmartgridLesseeService);
                app.set('dataCollectService', mockDataCollectService);
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
            done();
        }).catch(err => {
            done(err);
        });
    });
    describe('#post:/lessees\n' +
        'input:{lesseeID:"",lesseeName:""}\n' +
        'output:{errcode:0,errmsg:"",isSuccess:""}', () => {
        context('request for register a lessee', () => {
            it('should response message with errcode:fail if post body is illegal', done => {
                var body = {};
                request(server)
                    .post(`/lessees`)
                    .send(body)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        res.body.errmsg.should.be.eql("fail");
                        done();
                    });
            });
            it('should response message with errcode:ok and isSuccess:true if success', done => {
                var body = {
                    lesseeID: "lesseeID",
                    lesseeName: "lesseeName",
                    corpID: "corpID"
                };
                request(server)
                    .post(`/lessees`)
                    .send(body)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        res.body.errmsg.should.be.eql("ok");
                        done();
                    });
            });
        });
    });
    describe('#post:/lessees/:lesseeID/stations\n' +
        'input:{stationID:"",stationName:""}\n' +
        'output:{errcode:0,errmsg:"",stationID:""}', () => {
        context('request for adding a station to the lessee', () => {
            it('should response message with errcode:Fail if post body is illegal', done => {
                var lesseeID = "lesseeID";
                var body = {};
                request(server)
                    .post(`/lessees/${lesseeID}/stations`)
                    .send(body)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:Fail if no a such lessee', done => {
                var lesseeID = "noLesseeID";
                var body = {
                    stationID: "stationID",
                    stationName: "stationName"
                };
                request(server)
                    .post(`/lessees/${lesseeID}/stations`)
                    .send(body)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK and stationID if success', done => {
                var lesseeID = "lesseeID";
                var body = {
                    stationID: "stationID",
                    stationName: "stationName"
                };
                request(server)
                    .post(`/lessees/${lesseeID}/stations`)
                    .send(body)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        res.body.stationID.should.be.eql("stationID");
                        done();
                    });
            });
        });
    });
    describe('#delete:/lessees/:lesseeID/stations/:stationID\n' +
        'input:{stationID:""}\n' +
        'output:{errcode:0,errmsg:"",isSuccess:""}', () => {
        context('request for delete a station to the lessee', () => {
            it('should response message with errcode:Fail if no a such lessee', done => {
                var lesseeID = "noLesseeID";
                var stationID = "stationID";
                request(server)
                    .del(`/lessees/${lesseeID}/stations/${stationID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:Fail if no a such station', done => {
                var lesseeID = "lesseeID";
                var stationID = "noStationID";
                request(server)
                    .del(`/lessees/${lesseeID}/stations/${stationID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccess:true if success', done => {
                var lesseeID = "lesseeID";
                var stationID = "stationID";
                request(server)
                    .del(`/lessees/${lesseeID}/stations/${stationID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
        });
    });
    describe('#delete:/lessees/:lesseeID\n' +
        'input:{lesseeID:""}\n' +
        'output:{errcode:0,errmsg:"",isSuccess:""}', () => {
        context('request for delete a lessee', () => {
            it('should response message with errcode:Fail if no a such lessee', done => {
                var lesseeID = "noLesseeID";
                request(server)
                    .del(`/lessees/${lesseeID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccess:true if success', done => {
                var lesseeID = "lesseeID";
                request(server)
                    .del(`/lessees/${lesseeID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
        });
    });
    describe('#get:/lessees/:lesseeID\n' +
        'input:{lesseeID:""}\n' +
        'output:{errcode:0,errmsg:"",lessee:""}', () => {
        context('request for get lessee', () => {
            it('should response message with errcode:Fail if post body is illegal', done => {
                let lesseeID = "noLesseeID";
                request(server)
                    .get(`/lessees/${lesseeID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:ok', done => {
                let lesseeID = "lesseeID";
                request(server)
                    .get(`/lessees/${lesseeID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
        });
    });
    describe('#get:/lessees\n' +
        'output:{errcode:0,errmsg:"",lessees:""}', () => {
        context('request for get lessee', () => {
            it('should response message with errcode:ok', done => {
                request(server)
                    .get(`/lessees`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
        });
    });
    describe('#get:/stations:/stationID\n' +
        'input:{stationID:""}\n' +
        'output:{errcode:0,errmsg:"",station:""}', () => {
        context('request for get station', () => {
            it('should response message with errcode:Fail if post body is illegal', done => {
                let stationID = "noStationID";
                request(server)
                    .get(`/stations/${stationID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:ok', done => {
                let stationID = "stationID";
                request(server)
                    .get(`/stations/${stationID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
        });
    });
    describe('#get:/stations\n' +
        'output:{errcode:0,errmsg:"",stations:""}', () => {
        context('request for get station', () => {
            it('should response message with errcode:ok', done => {
                request(server)
                    .get(`/stations`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
        });
    });
    describe('#post:/data-sources\n' +
        'input:{dataSourceData:""}\n' +
        'output:{errcode:0,errmsg:"",isSuccess:""}', () => {
        context('request for register a dataSource', () => {
            it('should response message with errcode:Fail if post body is illegal', done => {
                var body = {};
                request(server)
                    .post(`/data-sources`)
                    .send(body)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        res.body.errmsg.should.be.eql("fail");
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccess:true if success', done => {
                var body = {
                    dataSourceID: "station-type-other",
                    dataType: "dataType",
                    station: "stationID",
                    lessee: "lesseeID"
                };
                request(server)
                    .post(`/data-sources`)
                    .send(body)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        res.body.errmsg.should.be.eql("ok");
                        done();
                    });
            });
        });
    });
    describe('#get:/data-sources/dataSourceID\n' +
        'input:{dataSourceID:""}\n' +
        'output:{errcode:0,errmsg:"",dataSource:""}', () => {
        context('request for get dataSource', () => {
            it('should response message with errcode:Fail if post body is illegal', done => {
                let dataSourceID = "noDataSourceID";
                request(server)
                    .get(`/data-sources/${dataSourceID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:ok', done => {
                let dataSourceID = "station-type-other";
                request(server)
                    .get(`/data-sources/${dataSourceID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
        });
    });
    describe('#get:/data-sources\n' +
        'input:{queryOpts:""}\n' +
        'output:{errcode:0,errmsg:"",dataSources:""}', () => {
        context('request for get dataSources', () => {
            it('should response message with errcode:ok', done => {
                request(server)
                    .get(`/data-sources?queryOpts=`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
        });
    });
    describe('#delete:/data-sources/:dataSourceID\n' +
        'input:{dataSourceID:""}\n' +
        'output:{errcode:0,errmsg:"",isSuccess:""}', () => {
        context('request for delete a dataSource', () => {
            it('should response message with errcode:Fail if no a such dataSource', done => {
                let dataSourceID = "noDataSourceID";
                request(server)
                    .del(`/data-sources/${dataSourceID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccess:true if success', done => {
                let dataSourceID = "station-type-other";
                request(server)
                    .del(`/data-sources/${dataSourceID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
        });
    });
    describe('#post:/permissions\n' +
        'input:{permissionData:""}\n' +
        'output:{errcode:0,errmsg:"",isSuccess:""}', () => {
        context('request for register a permission', () => {
            it('should response message with errcode:Fail if post body is illegal', done => {
                var body = {};
                request(server)
                    .post(`/permissions`)
                    .send(body)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        res.body.errmsg.should.be.eql("fail");
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccess:true if success', done => {
                var body = {
                    permissionID: "permissionID",
                    permissionName: "permissionName"
                };
                request(server)
                    .post(`/permissions`)
                    .send(body)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        res.body.errmsg.should.be.eql("ok");
                        done();
                    });
            });
        });
    });
    describe('#get:/permissions\n' +
        'input:{permissionID:""}\n' +
        'output:{errcode:0,errmsg:"",permission:""}', () => {
        context('request for get permission', () => {
            it('should response message with errcode:Fail if post body is illegal', done => {
                let permissionID = "noPermissionID"
                request(server)
                    .get(`/permissions/${permissionID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:ok', done => {
                let permissionID = "permissionID"
                request(server)
                    .get(`/permissions/${permissionID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
        });
    });
    describe('#get:/permissions\n' +
        'input:{permissionID:""}\n' +
        'output:{errcode:0,errmsg:"",permissions:""}', () => {
        context('request for get permission', () => {
            it('should response message with errcode:ok', done => {
                request(server)
                    .get(`/permissions`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
        });
    });
    describe('#post:/roles\n' +
        'input:{roleID:"",roleName:"",permissionID:""}\n' +
        'output:{errcode:0,errmsg:"",isSuccess:""}', () => {
        context('request for register a role', () => {
            it('should response message with errcode:FAIL if post body is illegal', (done) => {
                let body = {};
                request(server)
                    .post(`/roles`)
                    .send(body)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK if success', (done) => {
                let body = {
                    roleID: "roleID",
                    roleName: "roleName",
                    permissionID: "permissionID"
                };
                request(server)
                    .post(`/roles`)
                    .send(body)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
        });
    });
    describe('#get:/roles/:roleID\n' +
        'input:{roleID:""}\n' +
        'output:{errcode:0,errmsg:"",role:""}', () => {
        context('request for get role', () => {
            it('should response message with errcode:FAIL if no a such role', (done) => {
                let roleID = "noRoleID";
                request(server)
                    .get(`/roles/${roleID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK and role if success', (done) => {
                let roleID = "roleID";
                request(server)
                    .get(`/roles/${roleID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
        });
    });
    describe('#get:/roles\n' +
        'output:{errcode:0,errmsg:"",roles:""}', () => {
        context('request for get all roles', () => {
            it('should response message with errcode:OK and roles if success', (done) => {
                request(server)
                    .get(`/roles`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
        });
    });
    describe('#post:/roles/:roleID/permissions\n' +
        'input:{permissionID: ""}\n' +
        'output:{errcode:0,errmsg:"",isSuccess:""}', () => {
        context('request for assign permission to role', () => {
            it('should response message with errcode:FAIL if no a such role', (done) => {
                let roleID = "noRoleID";
                let body = {
                    permissionID: "permissionID"
                };
                request(server)
                    .post(`/roles/${roleID}/permissions`)
                    .send(body)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:FAIL if no a such permission', (done) => {
                let roleID = "roleID";
                let body = {};
                request(server)
                    .post(`/roles/${roleID}/permissions`)
                    .send(body)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccesss:true if success', (done) => {
                let roleID = "roleID";
                let body = {
                    permissionID: "permissionID"
                };
                request(server)
                    .post(`/roles/${roleID}/permissions`)
                    .send(body)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        res.body.isSuccess.should.be.eql(true);
                        done();
                    });
            });
        });
    });
    describe('#delete:/roles/:roleID/permissions\n' +
        'input:{permissionID: ""}\n' +
        'output:{errcode:0,errmsg:"",isSuccess:""}', () => {
        context('request for cancle permission of role', () => {
            it('should response message with errcode:FAIL if no a such role', (done) => {
                let roleID = "noRoleID";
                let body = {
                    permissionID: "permissionID"
                };
                request(server)
                    .del(`/roles/${roleID}/permissions`)
                    .send(body)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:FAIL if no a such permission', (done) => {
                let roleID = "roleID";
                let body = {};
                request(server)
                    .del(`/roles/${roleID}/permissions`)
                    .send(body)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccesss:true if success', (done) => {
                let roleID = "roleID";
                let body = {
                    permissionID: "permissionID"
                };
                request(server)
                    .del(`/roles/${roleID}/permissions`)
                    .send(body)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        res.body.isSuccess.should.be.eql(true);
                        done();
                    });
            });
        });
    });
    describe('#delete:/permissions/:permissionID\n' +
        'input:{permissionID:""}\n' +
        'output:{errcode:0,errmsg:"",isSuccess:""}', () => {
        context('request for delete a permission', () => {
            it('should response message with errcode:FAIL if no a such permission', (done) => {
                let permissionID = "noPermissionID";
                request(server)
                    .del(`/permissions/${permissionID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccess:true if success', (done) => {
                let permissionID = "permissionID";
                request(server)
                    .del(`/permissions/${permissionID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
        });
    });
    describe('#delete:/roles/:roleID\n' +
        'input:{roleID:""}\n' +
        'output:{errcode:0,errmsg:"",isSuccess:""}', () => {
        context('request for delete a role', () => {
            it('should response message with errcode:FAIL if no a such role', (done) => {
                let roleID = "noRoleID";
                request(server)
                    .del(`/roles/${roleID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccess:true if success', (done) => {
                let roleID = "roleID";
                request(server)
                    .del(`/roles/${roleID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
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
        });
    });
});