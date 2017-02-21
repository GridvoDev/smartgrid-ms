'use strict';
const _ = require('underscore');
const co = require('co');
const should = require('should');
const express = require('express');
const bodyParser = require('body-parser');
const {TraceContext} = require('gridvo-common-js');
const HttpDataCollectServiceGateway = require('../../../lib/infrastructure/serviceGateway/httpDataCollectServiceGateway');

describe('HttpDataCollectServiceGateway use case test', ()=> {
    let app;
    let server;
    let gateway;
    before(done=> {
        function setupExpress() {
            return new Promise((resolve, reject)=> {
                app = express();
                app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({extended: false}));
                app.post('/data-sources', (req, res)=> {
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
            gateway = new HttpDataCollectServiceGateway();
            done();
        }).catch(err=> {
            done(err);
        });
    });
    describe('registerDataSource(dataSourceData, traceContext, callback)', ()=> {
        let traceContext = new TraceContext({
            traceID: "aaa",
            parentID: "bbb",
            spanID: "ccc",
            flags: 1,
            step: 3
        });
        context('register dataSource', ()=> {
            it('fail if dataSource is illegal', done=> {
                let dataSourceData = {};
                gateway.registerDataSource(dataSourceData, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('is ok', done=> {
                let dataSourceData = {};
                dataSourceData.dataSourceID = "station-type-other";
                dataSourceData.dataType = "dataType";
                dataSourceData.station = "stationID";
                dataSourceData.lessee = "lesseeID";
                gateway.registerDataSource(dataSourceData, traceContext, (err, isSuccess)=> {
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