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

describe('smartgridMs route use case test', ()=> {
    let app;
    let server;
    before(done=> {
        function setupExpress() {
            return new Promise((resolve, reject)=> {
                app = express();
                app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({extended: false}));
                app.use(expressZipkinMiddleware({
                    tracer: createZipkinTracer({}),
                    serviceName: 'test-service'
                }));
                app.use('/', smartgridMsRoute);
                let mockSmartgridLesseeService = {};
                mockSmartgridLesseeService.addLessee = function (lesseeData, traceContext, callback) {
                    if (!lesseeData || !lesseeData.lesseeID || !lesseeData.lesseeName || !lesseeData.corpID) {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                }
                mockSmartgridLesseeService.addStation = function (lesseeID, stationData, traceContext, callback) {
                    if (!lesseeID || lesseeID == "noLesseeID" || !stationData || !stationData.stationID || !stationData.stationName) {
                        callback(null, null);
                        return;
                    }
                    callback(null, stationData.stationID);
                }
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
                }
                mockSmartgridLesseeService.delLessee = function (lesseeID, traceContext, callback) {
                    if (!lesseeID || lesseeID == "noLesseeID") {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                }
                mockSmartgridLesseeService.getLessees = function (lesseeID, traceContext, callback) {
                    if (lesseeID == "noLesseeID") {
                        callback(null, null);
                        return;
                    }
                    callback(null, []);
                }
                mockSmartgridLesseeService.getStations = function (stationID, traceContext, callback) {
                    if (stationID == "noStationID") {
                        callback(null, null);
                        return;
                    }
                    callback(null, []);
                }
                mockSmartgridLesseeService.addDataSource = function (dataSource, traceContext, callback) {
                    if (!dataSource || !dataSource.dataSourceID || !dataSource.lessee || !dataSource.station || !dataSource.dataSourceType) {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                }
                mockSmartgridLesseeService.delDataSource = function (dataSourceID, traceContext, callback) {
                    if (!dataSourceID || dataSourceID == "noDataSourceID") {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                };
                mockSmartgridLesseeService.getDataSources = function (dataSourceID, traceContext, callback) {
                    if (dataSourceID == "noDataSourceID") {
                        callback(null, null);
                        return;
                    }
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
                    if (permissionID == "noPermissionID") {
                        callback(null, null);
                        return;
                    }
                    callback(null, []);
                };
                app.set('smartgridLesseeService', mockSmartgridLesseeService);
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
            done();
        }).catch(err=> {
            done(err);
        });
    });
    describe('#post:/lessees\n' +
        'input:{lesseeID:"",lesseeName:""}\n' +
        'output:{errcode:0,errmsg:"",isSuccess:""}', ()=> {
        context('request for register a lessee', ()=> {
            it('should response message with errcode:fail if post body is illegal', done=> {
                var body = {};
                request(server)
                    .post(`/lessees`)
                    .send(body)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        res.body.errmsg.should.be.eql("fail");
                        done();
                    });
            });
            it('should response message with errcode:ok and isSuccess:true if success', done=> {
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
                    .end((err, res)=> {
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
        'output:{errcode:0,errmsg:"",stationID:""}', ()=> {
        context('request for adding a station to the lessee', ()=> {
            it('should response message with errcode:Fail if post body is illegal', done=> {
                var lesseeID = "lesseeID";
                var body = {};
                request(server)
                    .post(`/lessees/${lesseeID}/stations`)
                    .send(body)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:Fail if no a such lessee', done=> {
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
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK and stationID if success', done=> {
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
                    .end((err, res)=> {
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
        'output:{errcode:0,errmsg:"",isSuccess:""}', ()=> {
        context('request for delete a station to the lessee', ()=> {
            it('should response message with errcode:Fail if no a such lessee', done=> {
                var lesseeID = "noLesseeID";
                var stationID = "stationID";
                request(server)
                    .del(`/lessees/${lesseeID}/stations/${stationID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:Fail if no a such station', done=> {
                var lesseeID = "lesseeID";
                var stationID = "noStationID";
                request(server)
                    .del(`/lessees/${lesseeID}/stations/${stationID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccess:true if success', done=> {
                var lesseeID = "lesseeID";
                var stationID = "stationID";
                request(server)
                    .del(`/lessees/${lesseeID}/stations/${stationID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
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
        'output:{errcode:0,errmsg:"",isSuccess:""}', ()=> {
        context('request for delete a lessee', ()=> {
            it('should response message with errcode:Fail if no a such lessee', done=> {
                var lesseeID = "noLesseeID";
                request(server)
                    .del(`/lessees/${lesseeID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccess:true if success', done=> {
                var lesseeID = "lesseeID";
                request(server)
                    .del(`/lessees/${lesseeID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
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
        'output:{errcode:0,errmsg:"",lessees:""}', ()=> {
        context('request for delete a lessee', ()=> {
            it('should response message with errcode:Fail if no a such lessee', done=> {
                request(server)
                    .get(`/lessees?lesseeID=noLesseeID`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccess:true if success', done=> {
                request(server)
                    .get(`/lessees?lesseeID=lesseeID`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccess:true if success', done=> {
                request(server)
                    .get(`/lessees?lesseeID=`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
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
        'output:{errcode:0,errmsg:"",stations:""}', ()=> {
        context('request for delete a station', ()=> {
            it('should response message with errcode:Fail if no a such station', done=> {
                request(server)
                    .get(`/stations?stationID=noStationID`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK if success', done=> {
                request(server)
                    .get(`/stations?stationID=stationID`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK if success', done=> {
                request(server)
                    .get(`/stations?stationID=`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
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
    describe('#post:/dataSources\n' +
        'input:{dataSourceData:""}\n' +
        'output:{errcode:0,errmsg:"",isSuccess:""}', ()=> {
        context('request for register a dataSource', ()=> {
            it('should response message with errcode:Fail if post body is illegal', done=> {
                var body = {};
                request(server)
                    .post(`/dataSources`)
                    .send(body)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        res.body.errmsg.should.be.eql("fail");
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccess:true if success', done=> {
                var body = {
                    dataSourceID: "station-datatype-other",
                    dataSourceType: "dataSourceType",
                    station: "stationID",
                    lessee: "lesseeID"
                };
                request(server)
                    .post(`/dataSources`)
                    .send(body)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
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
    describe('#get:/dataSources\n' +
        'input:{dataSourceID:""}\n' +
        'output:{errcode:0,errmsg:"",datas:""}', ()=> {
        context('request for get dataSource', ()=> {
            it('should response message with errcode:Fail if post body is illegal', done=> {
                request(server)
                    .get(`/dataSources?dataSourceID=noDataSourceID`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:ok', done=> {
                request(server)
                    .get(`/dataSources?dataSourceID=`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
            it('should response message with errcode:ok', done=> {
                request(server)
                    .get(`/dataSources?dataSourceID=station-datatype-other`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
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
    describe('#delete:/dataSources/:dataSourceID\n' +
        'input:{dataSourceID:""}\n' +
        'output:{errcode:0,errmsg:"",isSuccess:""}', ()=> {
        context('request for delete a dataSource', ()=> {
            it('should response message with errcode:Fail if no a such dataSource', done=> {
                var dataSourceID = "noDataSourceID";
                request(server)
                    .del(`/dataSources/${dataSourceID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccess:true if success', done=> {
                var dataSourceID = "station-datatype-other";
                request(server)
                    .del(`/dataSources/${dataSourceID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
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
        'output:{errcode:0,errmsg:"",isSuccess:""}', ()=> {
        context('request for register a permission', ()=> {
            it('should response message with errcode:Fail if post body is illegal', done=> {
                var body = {};
                request(server)
                    .post(`/permissions`)
                    .send(body)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        res.body.errmsg.should.be.eql("fail");
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccess:true if success', done=> {
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
                    .end((err, res)=> {
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
        'output:{errcode:0,errmsg:"",datas:""}', ()=> {
        context('request for get permission', ()=> {
            it('should response message with errcode:Fail if post body is illegal', done=> {
                request(server)
                    .get(`/permissions?permissionID=noPermissionID`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
                        done();
                    });
            });
            it('should response message with errcode:ok', done=> {
                request(server)
                    .get(`/permissions?permissionID=`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
                        done();
                    });
            });
            it('should response message with errcode:ok', done=> {
                request(server)
                    .get(`/permissions?permissionID=permissionID`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res)=> {
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
    // describe('#delete:/permissions/:permissionID\n' +
    //     'input:{permissionID:""}\n' +
    //     'output:{errcode:0,errmsg:"",isSuccess:""}', ()=> {
    //     context('request for delete a permission', ()=> {
    //         it('should response message with errcode:Fail if no a such permission', done=> {
    //             var permissionID = "noPermissionID";
    //             request(server)
    //                 .del(`/permissions/${permissionID}`)
    //                 .expect(200)
    //                 .expect('Content-Type', /json/)
    //                 .end((err, res)=> {
    //                     if (err) {
    //                         done(err);
    //                         return;
    //                     }
    //                     res.body.errcode.should.be.eql(errCodeTable.FAIL.errCode);
    //                     done();
    //                 });
    //         });
    //         it('should response message with errcode:OK and isSuccess:true if success', done=> {
    //             var permissionID = "permissionIDr";
    //             request(server)
    //                 .del(`/permissions/${permissionID}`)
    //                 .expect(200)
    //                 .expect('Content-Type', /json/)
    //                 .end((err, res)=> {
    //                     if (err) {
    //                         done(err);
    //                         return;
    //                     }
    //                     res.body.errcode.should.be.eql(errCodeTable.OK.errCode);
    //                     done();
    //                 });
    //         });
    //     });
    // });
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
        });
    });
});