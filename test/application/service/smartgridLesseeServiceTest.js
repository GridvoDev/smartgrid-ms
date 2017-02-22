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
                lesseeData.corpID = "corpID";
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
    describe('#getLessee(lesseeID, traceContext, callback)', ()=> {
        context('get lessee from smartgrid-lessee service)', ()=> {
            it('return false if no this lesseeID is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getLessee = (lesseeID, traceContext, callback)=> {
                    callback(null, null);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let lesseeID = "noLesseeID";
                service.getLessee(lesseeID, {}, (err, lessee)=> {
                    _.isNull(lessee).should.be.eql(true);
                    done();
                });
            });
            it('return true if have this lesseeID', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getLessee = (lesseeID, traceContext, callback)=> {
                    callback(null, []);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let lesseeID = "lesseeID";
                service.getLessee(lesseeID, {}, (err, lessee)=> {
                    _.isNull(lessee).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('#getLessees(traceContext, callback)', ()=> {
        context('get lessee from smartgrid-lessee service)', ()=> {
            it('return true if lesseeID is null', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getLessees = (traceContext, callback)=> {
                    callback(null, []);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                service.getLessees({}, (err, lessees)=> {
                    _.isNull(lessees).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('#getStation(stationID, traceContext, callback)', ()=> {
        context('get lessee from smartgrid-lessee service)', ()=> {
            it('return false if no this stationID is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getStation = (stationID, traceContext, callback)=> {
                    callback(null, null);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let stationID = "noStationID";
                service.getStation(stationID, {}, (err, station)=> {
                    _.isNull(station).should.be.eql(true);
                    done();
                });
            });
            it('return true if have this stationID', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getStation = (stationID, traceContext, callback)=> {
                    callback(null, []);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let stationID = "stationID";
                service.getStation(stationID, {}, (err, station)=> {
                    _.isNull(station).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('#getStations(traceContext, callback)', ()=> {
        context('get lessee from smartgrid-lessee service)', ()=> {
            it('return true if stationID is null', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getStations = (traceContext, callback)=> {
                    callback(null, []);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                service.getStations({}, (err, stations)=> {
                    _.isNull(stations).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('#addPermission(permissionData, traceContext, callback)', ()=> {
        context('add permission from smartgrid-lessee service)', ()=> {
            it('return false if no this permission is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.registerPermission = (permissionData, traceContext, callback)=> {
                    callback(null, false);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                service.addPermission({}, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('return true if have this lesseeData', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.registerPermission = (permissionData, traceContext, callback)=> {
                    callback(null, true);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let permissionData = {};
                permissionData.permissionID = "permissionID";
                permissionData.permissionName = "permissionName";
                service.addPermission(permissionData, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('#delPermission(permissionID, traceContext, callback)', ()=> {
        context('del permission from smartgrid-lessee service)', ()=> {
            it('return false if no this permissionID is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.delPermission = (permissionID, traceContext, callback)=> {
                    callback(null, false);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let permissionID = "noPermissionID";
                service.delPermission(permissionID, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(false);
                    done();
                });
            });
            it('return true if have this dataSourceID', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.delPermission = (permissionID, traceContext, callback)=> {
                    callback(null, true);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let permissionID = "permissionID";
                service.delPermission(permissionID, {}, (err, isSuccess)=> {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('#getPermission(permissionID, traceContext, callback)', ()=> {
        context('get permission from smartgrid-lessee service)', ()=> {
            it('return false if no this permissionID is fail', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getPermission = (permissionID, traceContext, callback)=> {
                    callback(null, null);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let permissionID = "noPermissionID";
                service.getPermission(permissionID, {}, (err, permission)=> {
                    _.isNull(permission).should.be.eql(true);
                    done();
                });
            });
            it('return true if have this dataSourceID', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getPermission = (permissionID, traceContext, callback)=> {
                    callback(null, {});
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let permissionID = "permissionID";
                service.getPermission(permissionID, {}, (err, permission)=> {
                    _.isNull(permission).should.be.eql(false);
                    done();
                });
            });
        });
    });
    describe('#getPermissions(traceContext, callback)', ()=> {
        context('get permission from smartgrid-lessee service)', ()=> {
            it('return true if dataSourceID is null', done=> {
                let mockHttpSmartgridLesseeServiceGateway = {};
                mockHttpSmartgridLesseeServiceGateway.getPermissions = (traceContext, callback)=> {
                    callback(null, []);
                };
                muk(service, "_httpSmartgridLesseeServiceGateway", mockHttpSmartgridLesseeServiceGateway);
                let permissionID = "";
                service.getPermissions({}, (err, permissions)=> {
                    _.isNull(permissions).should.be.eql(false);
                    done();
                });
            });
        });
    });
    after(()=> {
        muk.restore();
    });
});