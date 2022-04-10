#! /usr/bin/env node
const axios = require("axios");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { calculateResponseTime } = require("./lib/utils");
const responseBuilder = require("./lib/responseBuilder");
const responses = {};

// make a HTTP request
const requestHttp = (endpoint, method) => {
  return new Promise((resolve, reject) => {
    // measure response time
    const start = Date.now();

    axios
      .get(endpoint)
      .then((res) => {
        const responseTime = calculateResponseTime(start);
        resolve(responseBuilder.build(res));
        responseBuilder.print(res);
      })
      .catch((error) => {
        const responseTime = calculateResponseTime(start);
        resolve(responseBuilder.build(res));
        responseBuilder.print(error);
      });
  });
};

const argv = yargs(hideBin(process.argv)).argv;
const attack = async () => {
  const code = await requestHttp(argv.url || argv._[0], "GET");
  responses[code] = responses[code] + 1 || 1;
};

const onExit = () => {
  console.log(responses);
  process.exit();
};

process.on("exit", onExit);
process.on("SIGINT", onExit);

setInterval(attack, argv.interval * 1000 || 1000);
