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
    describe('#delLessee(lesseeID, traceContext, callback)', ()=> {
        context('del lessee from smartgrid-lessee service)', ()=> {
            it('return false if no this lesseeID is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.delLessee = (lesseeID, traceContext, callback)=> {
                    callback(null, false);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let lesseeID = "noLesseeID";
                service.delLessee(lesseeID, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('return true if have this lesseeID', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.delLessee = (lesseeID, traceContext, callback)=> {
                    callback(null, true);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let lesseeID = "lesseeID";
                service.delLessee(lesseeID, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('#getLessees(lesseeID, traceContext, callback)', ()=> {
        context('get lessee from smartgrid-lessee service)', ()=> {
            it('return false if no this lesseeID is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getLessees = (lesseeID, traceContext, callback)=> {
                    callback(null, null);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let lesseeID = "noLesseeID";
                service.getLessees(lesseeID, {}, (err, lessees)=> {
                    _.isNull(lessees).should.be.eql(true);
                    done();
                });
            });
            it('return true if have this lesseeID', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getLessees = (lesseeID, traceContext, callback)=> {
                    callback(null, []);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let lesseeID = "lesseeID";
                service.getLessees(lesseeID, {}, (err, lessees)=> {
                    _.isNull(lessees).should.be.eql(false);
                    done();
                });
            });
            it('return true if lesseeID is null', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getLessees = (lesseeID, traceContext, callback)=> {
                    callback(null, []);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let lesseeID = "";
                service.getLessees(lesseeID, {}, (err, lessees)=> {
                    _.isNull(lessees).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('#getStations(stationID, traceContext, callback)', ()=> {
        context('get lessee from smartgrid-lessee service)', ()=> {
            it('return false if no this stationID is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getStations = (stationID, traceContext, callback)=> {
                    callback(null, null);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let stationID = "noStationID";
                service.getStations(stationID, {}, (err, stations)=> {
                    _.isNull(stations).should.be.eql(true);
                    done();
                });
            });
            it('return true if have this stationID', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getStations = (stationID, traceContext, callback)=> {
                    callback(null, []);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let stationID = "stationID";
                service.getStations(stationID, {}, (err, stations)=> {
                    _.isNull(stations).should.be.eql(false);
                    done();
                });
            });
            it('return true if stationID is null', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getStations = (stationID, traceContext, callback)=> {
                    callback(null, []);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let stationID = "";
                service.getStations(stationID, {}, (err, stations)=> {
                    _.isNull(stations).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('#addDataSource(dataSource, traceContext, callback)', ()=> {
        context('add dataSource from smartgrid-lessee service)', ()=> {
            it('return false if no this dataSource is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.registerDataSource = (dataSource, traceContext, callback)=> {
                    callback(null, false);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                service.addDataSource({}, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('return true if have this lesseeData', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.registerDataSource = (dataSource, traceContext, callback)=> {
                    callback(null, true);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let dataSource = {};
                dataSource.dataSourceID = "station-datatype-other";
                dataSource.dataSourceType = "dataSourceType";
                dataSource.lessee = "lesseeID";
                dataSource.station = "stationID";
                service.addDataSource(dataSource, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('#delDataSource(dataSourceID, traceContext, callback)', ()=> {
        context('del dataSource from smartgrid-lessee service)', ()=> {
            it('return false if no this dataSourceID is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.delDataSource = (dataSourceID, traceContext, callback)=> {
                    callback(null, false);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let dataSourceID = "noDataSourceID";
                service.delDataSource(dataSourceID, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('return true if have this dataSourceID', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.delDataSource = (dataSourceID, traceContext, callback)=> {
                    callback(null, true);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let dataSourceID = "dataSourceID";
                service.delDataSource(dataSourceID, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('#getDataSources(dataSourceID, traceContext, callback)', ()=> {
        context('get dataSource from smartgrid-lessee service)', ()=> {
            it('return false if no this dataSourceID is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getDataSources = (dataSourceID, traceContext, callback)=> {
                    callback(null, null);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let dataSourceID = "noDataSourceID";
                service.getDataSources(dataSourceID, {}, (err, datas)=> {
                    _.isNull(datas).should.be.eql(true);
                    done();
                });
            });
            it('return true if have this dataSourceID', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getDataSources = (dataSourceID, traceContext, callback)=> {
                    callback(null, []);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let dataSourceID = "station-datatype-other";
                service.getDataSources(dataSourceID, {}, (err, datas)=> {
                    _.isNull(datas).should.be.eql(false);
                    done();
                });
            });
            it('return true if dataSourceID is null', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getDataSources = (dataSourceID, traceContext, callback)=> {
                    callback(null, []);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let dataSourceID = "";
                service.getDataSources(dataSourceID, {}, (err, datas)=> {
                    _.isNull(datas).should.be.eql(false);
                    done();
                });
            });
        });
    });
    after(()=> {
        muk.restore();
    });
});