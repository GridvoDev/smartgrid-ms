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
            logger.error(lesseeData, traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        res.json(resultJSON);
        logger.info("add lessee success", traceContext);
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
router.get('/lessees', (req, res)=> {
    let resultJSON = {};
    let lesseeID = req.query.lesseeID;
    let smartgridLesseeService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    smartgridLesseeService.getLessees(lesseeID, traceContext, (err, lessees)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!lessees) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("get lessee fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        resultJSON.lessees = lessees;
        res.json(resultJSON);
        logger.info("get lessee success", traceContext);
    });
});
router.get('/stations', (req, res)=> {
    let resultJSON = {};
    let stationID = req.query.stationID;
    let smartgridLesseeService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    smartgridLesseeService.getStations(stationID, traceContext, (err, stations)=> {console.log(stations);
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!stations) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("get station fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        resultJSON.stations = stations;
        res.json(resultJSON);
        logger.info("get station success", traceContext);
    });
});
router.post('/dataSources', (req, res)=> {
    let resultJSON = {};
    let dataSource = req.body;
    let dataSourceService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    dataSourceService.addDataSource(dataSource, traceContext, (err, isSuccess)=> {
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
router.delete('/dataSources/:dataSourceID', (req, res)=> {
    let resultJSON = {};
    let dataSourceID = req.params.dataSourceID;
    let dataSourceService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    dataSourceService.delDataSource(dataSourceID, traceContext, (err, isSuccess)=> {
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
router.get('/dataSources', (req, res)=> {
    let resultJSON = {};
    let dataSourceID = req.query.dataSourceID;
    let dataSourceService = req.app.get('smartgridLesseeService');
    let traceContext = traceContextFeach(req);
    dataSourceService.getDataSources(dataSourceID, traceContext, (err, datas)=> {
        if (err) {
            logger.error(err.message, traceContext);
            return;
        }
        if (!datas) {
            resultJSON.errcode = errCodeTable.FAIL.errCode;
            resultJSON.errmsg = errCodeTable.FAIL.errMsg;
            res.json(resultJSON);
            logger.error("get dataSource fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        res.json(resultJSON);
        logger.info("get dataSource success", traceContext);
    });
});

module.exports = router;