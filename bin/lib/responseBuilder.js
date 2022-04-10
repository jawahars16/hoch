const chalk = require("chalk");

const statusCodeDictionary = {
  200: chalk.green,
  500: chalk.red,
  0: chalk.yellow,
};
const DEFAULT_CHARACTER = "*";

const getResponse = (response) =>
  response.response ? response.response : response;

const print = (response, character) => {
  const res = getResponse(response);
  const _character = character || DEFAULT_CHARACTER;
  const statusCodeInDictionary = statusCodeDictionary[res.status]
    ? res.status
    : 0;
  process.stdout.write(
    statusCodeDictionary[statusCodeInDictionary](_character)
  );
};

const build = (response, responseTime) => {
  const res = getResponse(response);
  return {
    status: res.status,
    responseTime: responseTime,
  };
};

module.exports = { print, build };
