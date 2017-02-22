'use strict';
const _ = require('underscore');
const {createHttpSmartgridLesseeServiceGateway} = require('../../infrastructure');

class Service {
    constructor() {
        this._httpSmartgridLesseeServiceGateway = createHttpSmartgridLesseeServiceGateway();
    }

    addLessee(lesseeData, traceContext, callback) {
        if (!lesseeData || !lesseeData.lesseeID || !lesseeData.lesseeName || !lesseeData.corpID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.registerLessee(lesseeData, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }

    addStation(lesseeID, stationData, traceContext, callback) {
        if (!lesseeID || !stationData || !stationData.stationID || !stationData.stationName) {
            callback(null, null);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.addStationToLessee(lesseeID, stationData, traceContext, (err, stationID) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, stationID);
            }
        );
    }

    delStation(lesseeID, stationID, traceContext, callback) {
        if (!lesseeID || !stationID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.delStationFromLessee(lesseeID, stationID, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }
    delLessee(lesseeID, traceContext, callback) {
        if (!lesseeID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.delLessee(lesseeID, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }
    getLessee(lesseeID, traceContext, callback) {
        if (!lesseeID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.getLessee(lesseeID, traceContext, (err, lessee) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, lessee);
            }
        );
    }
    getLessees(traceContext, callback) {
        this._httpSmartgridLesseeServiceGateway.getLessees(traceContext, (err, lessees) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, lessees);
            }
        );
    }
    getStation(stationID, traceContext, callback) {
        if (!stationID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.getStation(stationID, traceContext, (err, station) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, station);
            }
        );
    }
    getStations(traceContext, callback) {
        this._httpSmartgridLesseeServiceGateway.getStations(traceContext, (err, stations) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, stations);
            }
        );
    }
    addPermission(permissionData, traceContext, callback) {
        if (!permissionData || !permissionData.permissionID || !permissionData.permissionName) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.registerPermission(permissionData, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }
    delPermission(permissionID, traceContext, callback) {
        if (!permissionID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.delPermission(permissionID, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }
    getPermission(permissionID, traceContext, callback) {
        if (!permissionID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.getPermission(permissionID, traceContext, (err, permission) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, permission);
            }
        );
    }
    getPermissions(traceContext, callback) {
        this._httpSmartgridLesseeServiceGateway.getPermissions(traceContext, (err, permissions) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, permissions);
            }
        );
    }
    addRole(roleData, traceContext, callback) {
        if (!roleData || !roleData.roleID || !roleData.roleName || !roleData.permissionID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.registerRole(roleData, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }
    delRole(roleID, traceContext, callback) {
        if (!roleID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.delRole(roleID, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }
    getRole(roleID, traceContext, callback) {
        if (!roleID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.getRole(roleID, traceContext, (err, role) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, role);
            }
        );
    }
    getRoles(traceContext, callback) {
        this._httpSmartgridLesseeServiceGateway.getRoles(traceContext, (err, roles) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, roles);
            }
        );
    }
    assignPermissionToRole(permissionID, roleID, traceContext, callback) {
        if (!permissionID || !roleID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.assignPermissionToRole(permissionID, roleID, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }
    canclePermissionofRole(permissionID, roleID, traceContext, callback) {
        if (!permissionID || !roleID) {
            callback(null, false);
            return;
        }
        this._httpSmartgridLesseeServiceGateway.canclePermissionofRole(permissionID, roleID, traceContext, (err, isSuccess) => {
                if (err) {
                    callback(err, false);
                    return;
                }
                callback(null, isSuccess);
            }
        );
    }

}

module.exports = Service;