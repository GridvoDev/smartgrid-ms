'use strict';
const kafka = require('kafka-node');
const express = require('express');
const bodyParser = require('body-parser');
const {logger, tracer} = require('./lib/util');
const {createSmartgridLesseeService,createDataCollectService} = require('./lib/application');
const {smartgridMsRoute} = require('./lib/express');
const {expressZipkinMiddleware} = require("gridvo-common-js");

let app;
let {ZOOKEEPER_SERVICE_HOST = "127.0.0.1", ZOOKEEPER_SERVICE_PORT = "2181"} = process.env;
let Producer = kafka.HighLevelProducer;
let client = new kafka.Client(`${ZOOKEEPER_SERVICE_HOST}:${ZOOKEEPER_SERVICE_PORT}`);
let initProducer = new Producer(client);
initProducer.on('ready', function () {
    initProducer.createTopics(["zipkin"], true, (err)=> {
        if (err) {
            logger.error(err.message);
            return;
        }
        client.refreshMetadata(["zipkin"], ()=> {
            initProducer.close(()=> {
                logger.info("smartgrid-ms init kafka topics success");
            });
        });
    });
});
initProducer.on('error', (err)=> {
    logger.error(err.message);
});
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressZipkinMiddleware({
    tracer: tracer,
    serviceName: 'smartgrid-ms'
}));
app.use('/', smartgridMsRoute);
let smartgridLesseeService = createSmartgridLesseeService();
let dataCollectService = createDataCollectService();
app.set('smartgridLesseeService', smartgridLesseeService);
app.set('dataCollectService', dataCollectService);
app.listen(3001, (err)=> {
    if (err) {
        logger.error(err.message);
    }
    else {
        logger.info("smartgrid-ms express server is starting");
    }
});