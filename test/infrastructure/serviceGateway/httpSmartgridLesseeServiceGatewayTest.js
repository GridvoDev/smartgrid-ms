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
                //lesseeData.corpID = "";
                gateway.registerLessee(lesseeData, traceContext, (err, isSuccess)=> {
                    isSuccess.should.be.eql(true);
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