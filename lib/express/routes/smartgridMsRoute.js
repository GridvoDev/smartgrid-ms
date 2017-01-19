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
            logger.error("delete station from lessee fail", traceContext);
            return;
        }
        resultJSON.errcode = errCodeTable.OK.errCode;
        resultJSON.errmsg = errCodeTable.OK.errMsg;
        res.json(resultJSON);
        logger.info("delete station from lessee success", traceContext);
    });
});

module.exports = router;