'use strict';
const _ = require('underscore');
const should = require('should');
const muk = require('muk');
const DataCollectService = require('../../../lib/application/service/dataCollectService');

describe('DataCollectService use case test', ()=> {
    let service;
    before(()=> {
        service = new DataCollectService();
    });
    describe('#addDataSource(dataSource, traceContext, callback)', ()=> {
        context('add dataSource from smartgrid-lessee service)', ()=> {
            it('return false if no this dataSource is fail', done=> {
                let mockHttpDataCollectServiceGateway = {};
                mockHttpDataCollectServiceGateway.registerDataSource = (dataSource, traceContext, callback)=> {
                    callback(null, false);
                };
                muk(service, "_httpDataCollectServiceGateway", mockHttpDataCollectServiceGateway);
                service.addDataSource({}, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('return true if have this lesseeData', done=> {
                let mockHttpDataCollectServiceGateway = {};
                mockHttpDataCollectServiceGateway.registerDataSource = (dataSource, traceContext, callback)=> {
                    callback(null, true);
                };
                muk(service, "_httpDataCollectServiceGateway", mockHttpDataCollectServiceGateway);
                let dataSourceData = {};
                dataSourceData.dataSourceID = "station-type-other";
                dataSourceData.dataType = "dataType";
                dataSourceData.station = "stationID";
                dataSourceData.lessee = "lesseeID";
                service.addDataSource(dataSourceData, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    // describe('#delDataSource(dataSourceID, traceContext, callback)', ()=> {
    //     context('del dataSource from smartgrid-lessee service)', ()=> {
    //         it('return false if no this dataSourceID is fail', done=> {
    //             let mockHttpDataCollectServiceGateway = {};
    //             mockHttpDataCollectServiceGateway.delDataSource = (dataSourceID, traceContext, callback)=> {
    //                 callback(null, false);
    //             };
    //             muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpDataCollectServiceGateway);
    //             let dataSourceID = "noDataSourceID";
    //             service.delDataSource(dataSourceID, {}, (err, isSuccess)=> {
    //                 isSuccess.should.be.eql(false);
    //                 done();
    //             });
    //         });
    //         it('return true if have this dataSourceID', done=> {
    //             let mockHttpDataCollectServiceGateway = {};
    //             mockHttpDataCollectServiceGateway.delDataSource = (dataSourceID, traceContext, callback)=> {
    //                 callback(null, true);
    //             };
    //             muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpDataCollectServiceGateway);
    //             let dataSourceID = "dataSourceID";
    //             service.delDataSource(dataSourceID, {}, (err, isSuccess)=> {
    //                 isSuccess.should.be.eql(true);
    //                 done();
    //             });
    //         });
    //     });
    // });
    // describe('#getDataSources(dataSourceID, traceContext, callback)', ()=> {
    //     context('get dataSource from smartgrid-lessee service)', ()=> {
    //         it('return false if no this dataSourceID is fail', done=> {
    //             let mockHttpDataCollectServiceGateway = {};
    //             mockHttpDataCollectServiceGateway.getDataSources = (dataSourceID, traceContext, callback)=> {
    //                 callback(null, null);
    //             };
    //             muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpDataCollectServiceGateway);
    //             let dataSourceID = "noDataSourceID";
    //             service.getDataSources(dataSourceID, {}, (err, dataSoueceJSON)=> {
    //                 _.isNull(dataSoueceJSON).should.be.eql(true);
    //                 done();
    //             });
    //         });
    //         it('return true if have this dataSourceID', done=> {
    //             let mockHttpDataCollectServiceGateway = {};
    //             mockHttpDataCollectServiceGateway.getDataSources = (dataSourceID, traceContext, callback)=> {
    //                 callback(null, []);
    //             };
    //             muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpDataCollectServiceGateway);
    //             let dataSourceID = "station-datatype-other";
    //             service.getDataSources(dataSourceID, {}, (err, dataSoueceJSON)=> {
    //                 _.isNull(dataSoueceJSON).should.be.eql(false);
    //                 done();
    //             });
    //         });
    //         it('return true if dataSourceID is null', done=> {
    //             let mockHttpDataCollectServiceGateway = {};
    //             mockHttpDataCollectServiceGateway.getDataSources = (dataSourceID, traceContext, callback)=> {
    //                 callback(null, []);
    //             };
    //             muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpDataCollectServiceGateway);
    //             let dataSourceID = "";
    //             service.getDataSources(dataSourceID, {}, (err, dataSoueceJSON)=> {
    //                 _.isNull(dataSoueceJSON).should.be.eql(false);
    //                 done();
    //             });
    //         });
    //     });
    // });
    after(()=> {
        muk.restore();
    });
});