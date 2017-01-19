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
                    if (!lesseeData || !lesseeData.lesseeID || !lesseeData.lesseeName) {
                        callback(null, false);
                        return;
                    }
                    callback(null, true);
                }
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
    describe('#post:/smartgridMs\n' +
        'input:{lesseeID:"",lesseeName:""}\n' +
        'output:{errcode:0,errmsg:"",isSuccess:""}', ()=> {
        context('request for register a lessee', ()=> {
            it('should response message with errcode:Fail if post body is illegal', done=> {
                var body = {};
                request(server)
                    .post(`/smartgridMs`)
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
                        res.body.errmsg.should.be.eql("Fail");
                        done();
                    });
            });
            it('should response message with errcode:OK and isSuccess:true if success', done=> {
                var body = {
                    lesseeID: "lesseeID",
                    lesseeName: "lesseeName"
                };
                request(server)
                    .post(`/smartgridMs`)
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
                        res.body.errmsg.should.be.eql("OK");
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
        });
    });
});