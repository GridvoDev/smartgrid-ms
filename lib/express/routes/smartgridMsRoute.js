'use strict';
const _ = require('underscore');
const express = require('express');
const errCodeTable = require('../util/errCode.js');
const {expressWithZipkinTraceContextFeach:traceContextFeach} = require("gridvo-common-js");
const {logger} = require('../../util');

let router = express.Router();
router.post('/smartgridMs', (req, res)=> {
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
    });
});

module.exports = router;