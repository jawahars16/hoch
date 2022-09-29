#! /usr/bin/env node

const axios = require("axios");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { calculateResponseTime } = require("./lib/utils");
const Table = require('cli-table3');
const utils = require('./lib/utils');
const chalk = require("chalk");

const responseBuilder = require("./lib/responseBuilder");
const responses = {};
let output;

// make a HTTP request
const requestHttp = (endpoint, method) => {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const resolveResponse = (res) => {
      const responseTime = calculateResponseTime(start);
      resolve(responseBuilder.build(res, responseTime));
      responseBuilder.print(res);
    }

    const rejectResponse = (err) => {
      const responseTime = calculateResponseTime(start);
      reject(responseBuilder.error(err, responseTime));
      responseBuilder.printError(err);
    }

    axios({
      method: method,
      url: endpoint,
    }).then(resolveResponse).catch(rejectResponse);
  });
};

const buildOutputTable = (res, err) => {
  output = new Table({
    head: [chalk.blue('Status'), chalk.blue('Description'), chalk.blue('Count')],
  });
  Object.keys(responses).forEach((key) => {
    // if color dictionary has the key, use that color
    // else use the default color
    const color = utils.statusCodeColor(key);
    const description = utils.statusCodeDescriptionDictionary[key] || 'Unknown';

    output.push([
      color(key),
      description,
      responses[key]]);
  });
  console.log("");
  console.log(output.toString());
}

const argv = yargs(hideBin(process.argv)).argv;
const attack = async () => {
  try {
    let url = argv.url || argv._[0];
    
    // if argv.url or argv._[0] not start with http or https, add http
    if (!url.startsWith("http") && !url.startsWith("https")) {
      url = `https://${url}`;
    }

    console.log(url);
    const status = await requestHttp(url, argv.method || argv.X || "GET");
    responses[status.status] = responses[status.status] + 1 || 1;
  } catch (error) {
    responses[error.status] = responses[error.status] + 1 || 1;
  }
};

const onExit = () => {
  buildOutputTable();
  process.exit();
};

process.on("SIGINT", onExit);

const interval = argv.interval || argv.i || 1;
setInterval(attack, interval * 1000 || 1000);
