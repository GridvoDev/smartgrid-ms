'use strict';
const _ = require('underscore');
const express = require('express');
const errCodeTable = require('../util/errCode.js');
const {expressWithZipkinTraceContextFeach:traceContextFeach} = require("gridvo-common-js");
const {logger} = require('../../util');

let router = express.Router();
router.post('/lessees', (req, res)=> {
    let resultJSON = {};
    let lesseeData = req.body;
    let smartgridLesseeService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    smartgridLesseeService.addLessee(lesseeData, traceContext, (err, isSuccess)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!isSuccess) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("add lessee fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        res.json(resultJSON);
        logger.info("add lessee success", traceContext);
        logger.error(lesseeData, traceContext);
    });
});
router.post('/lessees/:lesseeID/stations', (req, res)=> {
    let resultJSON = {};
    let lesseeID = req.params.lesseeID;
    let stationData = req.body;
    let smartgridLesseeService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    smartgridLesseeService.addStation(lesseeID, stationData, traceContext, (err, stationID)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!stationID) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            resultJSON.stationID = null;
            res.json(resultJSON);
            logger.error("add station fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        resultJSON.stationID = stationID;
        res.json(resultJSON);
        logger.info("add station success", traceContext);
    });
});
router.delete('/lessees/:lesseeID/stations/:stationID', (req, res)=> {
    let resultJSON = {};
    let lesseeID = req.params.lesseeID;
    let stationID = req.params.stationID;
    let smartgridLesseeService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    smartgridLesseeService.delStation(lesseeID, stationID, traceContext, (err, isSuccess)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!isSuccess) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("delete station fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        res.json(resultJSON);
        logger.info("delete station success", traceContext);
    });
});
router.delete('/lessees/:lesseeID', (req, res)=> {
    let resultJSON = {};
    let lesseeID = req.params.lesseeID;
    let smartgridLesseeService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    smartgridLesseeService.delLessee(lesseeID, traceContext, (err, isSuccess)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!isSuccess) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("delete lessee fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        res.json(resultJSON);
        logger.info("delete lessee success", traceContext);
    });
});
router.get('/lessees/:lesseeID', (req, res)=> {
    let resultJSON = {};
    let lesseeID = req.params.lesseeID;
    let smartgridLesseeService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    smartgridLesseeService.getLessee(lesseeID, traceContext, (err, lessee)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!lessee) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("get lessee fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        resultJSON.lessee = lessee;
        res.json(resultJSON);
        logger.info("get lessee success", traceContext);
    });
});
router.get('/lessees', (req, res)=> {
    let resultJSON = {};
    let smartgridLesseeService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    smartgridLesseeService.getLessees(traceContext, (err, lessees)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!lessees) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("get all lessee fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        resultJSON.lessees = lessees;
        res.json(resultJSON);
        logger.info("get all lessee success", traceContext);
    });
});
router.get('/stations/:stationID', (req, res)=> {
    let resultJSON = {};
    let stationID = req.params.stationID;
    let smartgridLesseeService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    smartgridLesseeService.getStation(stationID, traceContext, (err, station)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!station) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("get station fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        resultJSON.station = station;
        res.json(resultJSON);
        logger.info("get station success", traceContext);
    });
});
router.get('/stations', (req, res)=> {
    let resultJSON = {};
    let smartgridLesseeService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    smartgridLesseeService.getStations(traceContext, (err, stations)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!stations) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("get all station fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        resultJSON.stations = stations;
        res.json(resultJSON);
        logger.info("get all station success", traceContext);
    });
});
router.post('/data-sources', (req, res)=> {
    let resultJSON = {};
    let dataSource = req.body;
    let dataCollectService = req.app.get('dataCollectService');
    let traceContext = traceContextFeach(req);
    dataCollectService.addDataSource(dataSource, traceContext, (err, isSuccess)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!isSuccess) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("add dataSource fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        res.json(resultJSON);
        logger.info("add dataSource success", traceContext);
    });
});
router.delete('/data-sources/:dataSourceID', (req, res)=> {
    let resultJSON = {};
    let dataSourceID = req.params.dataSourceID;
    let dataCollectService = req.app.get('dataCollectService');
    let traceContext = traceContextFeach(req);
    dataCollectService.delDataSource(dataSourceID, traceContext, (err, isSuccess)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!isSuccess) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("delete dataSource fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        res.json(resultJSON);
        logger.info("delete dataSource success", traceContext);
    });
});
router.get('/data-sources/:dataSourceID', (req, res)=> {
    let resultJSON = {};
    let dataSourceID = req.params.dataSourceID;
    let dataCollectService = req.app.get('dataCollectService');
    let traceContext = traceContextFeach(req);
    dataCollectService.getDataSource(dataSourceID, traceContext, (err, dataSource)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!dataSource) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("get dataSource fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        resultJSON.dataSource = dataSource;
        res.json(resultJSON);
        logger.info("get dataSource success", traceContext);
    });
});
router.get('/data-sources', (req, res)=> {
    let resultJSON = {};
    let queryOpts = req.query.queryOpts;
    let dataCollectService = req.app.get('dataCollectService');
    let traceContext = traceContextFeach(req);
    dataCollectService.getDataSources(queryOpts, traceContext, (err, dataSources)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!dataSources) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("get all dataSource fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        resultJSON.dataSources = dataSources;
        res.json(resultJSON);
        logger.info("get all dataSource success", traceContext);
    });
});
router.post('/permissions', (req, res)=> {
    let resultJSON = {};
    let permissionData = req.body;
    let smartgridLesseeService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    smartgridLesseeService.addPermission(permissionData, traceContext, (err, isSuccess)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!isSuccess) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("add permission fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        res.json(resultJSON);
        logger.info("add permission success", traceContext);
    });
});
router.delete('/permissions/:permissionID', (req, res)=> {
    let resultJSON = {};
    let permissionID = req.params.permissionID;
    let smartgridLesseeService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    smartgridLesseeService.delPermission(permissionID, traceContext, (err, isSuccess)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!isSuccess) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("delete permission fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        res.json(resultJSON);
        logger.info("delete permission success", traceContext);
    });
});
router.get('/permissions/:permissionID', (req, res)=> {
    let resultJSON = {};
    let permissionID = req.params.permissionID;
    let smartgridLesseeService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    smartgridLesseeService.getPermission(permissionID, traceContext, (err, permission)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!permission) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("get permission fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        res.json(resultJSON);
        logger.info("get permission success", traceContext);
    });
});
router.get('/permissions', (req, res)=> {
    let resultJSON = {};
    let smartgridLesseeService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    smartgridLesseeService.getPermissions(traceContext, (err, permissions)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!permissions) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("get permission fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        resultJSON.permissions = permissions;
        res.json(resultJSON);
        logger.info("get permission success", traceContext);
    });
});

module.exports = router;