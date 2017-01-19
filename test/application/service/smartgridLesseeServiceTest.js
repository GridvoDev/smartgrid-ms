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
    describe('#addStation(lesseeID, stationData, traceContext, callback)', ()=> {
        context('add station from smartgrid-lessee service)', ()=> {
            it('return false if no this lesseeID is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.addStationToLessee = (lesseeID, stationData, traceContext, callback)=> {
                    callback(null, null);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let lesseeID = "noLesseeID";
                let stationData = {};
                stationData.stationID = "stationID";
                stationData.stationName = "stationName";
                service.addStation(lesseeID, stationData, {}, (err, stationID)=> {
                    _.isNull(stationID).should.be.eql(true);
                    done();
                });
            });
            it('return false if no station data is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.addStationToLessee = (lesseeID, stationData, traceContext, callback)=> {
                    callback(null, null);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let lesseeID = "lesseeID";
                let stationData = {};
                service.addStation(lesseeID, stationData, {}, (err, stationID)=> {
                    _.isNull(stationID).should.be.eql(true);
                    done();
                });
            });
            it('return true if have this lesseeID and station data', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.addStationToLessee = (lesseeID, stationData, traceContext, callback)=> {
                    callback(null, "stationID");
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let lesseeID = "lesseeID";
                let stationData = {};
                stationData.stationID = "stationID";
                stationData.stationName = "stationName";
                service.addStation(lesseeID, stationData, {}, (err, stationID)=> {
                    stationID.should.be.eql("stationID");
                    done();
                });
            });
        });
    });
    describe('#delStation(lesseeID, stationID, traceContext, callback)', ()=> {
        context('del station from smartgrid-lessee service)', ()=> {
            it('return false if no this lesseeID is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.delStationFromLessee = (lesseeID, stationID, traceContext, callback)=> {
                    callback(null, false);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let lesseeID = "noLesseeID";
                let stationID = "stationID";
                service.delStation(lesseeID, stationID, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('return false if no stationID is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.delStationFromLessee = (lesseeID, stationID, traceContext, callback)=> {
                    callback(null, false);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let lesseeID = "lesseeID";
                let stationID = "noStationID";
                service.delStation(lesseeID, stationID, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('return true if have this lesseeID and stationID', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.delStationFromLessee = (lesseeID, stationID, traceContext, callback)=> {
                    callback(null, true);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let lesseeID = "lesseeID";
                let stationID = "stationID";
                service.delStation(lesseeID, stationID, {}, (err, isSuccess)=> {
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