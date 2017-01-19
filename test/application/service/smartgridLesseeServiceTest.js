'use strict';
const _ = require('underscore');
const should = require('should');
const muk = require('muk');
const SmartgridLesseeService = require('../../../lib/application/service/smartgridLesseeService');

describe('SmartgridLesseeService use case test', ()=> {
    let service;
    before(()=> {
        service = new SmartgridLesseeService();
    });
    describe('#addLessee(lesseeData, traceContext, callback)', ()=> {
        context('add lessee from smartgrid-lessee service)', ()=> {
            it('return false if no this lesseeData is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.registerLessee = (lesseeData, traceContext, callback)=> {
                    callback(null, false);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                service.addLessee({}, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('return true if have this lesseeData', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.registerLessee = (lesseeData, traceContext, callback)=> {
                    callback(null, true);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let lesseeData = {};
                lesseeData.lesseeID = "lesseeID";
                lesseeData.lesseeName = "lesseeName";
                lesseeData.corpID = "";
                service.addLessee(lesseeData, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    after(()=> {
        muk.restore();
    });
});