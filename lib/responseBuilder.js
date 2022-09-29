const utils = require('./utils');
const chalk = require("chalk");

const DEFAULT_CHARACTER = "*";

const getResponse = (response) => {
  response.response ? response.response : response;
}

const getStatusCodefromAxiosResponse = response => {
  return response.response ? response.response.status : response.status;
}

const print = (response) => {
  const code = getStatusCodefromAxiosResponse(response);
  const message = utils.statusCodeColor(code)(DEFAULT_CHARACTER)
  process.stdout.write(message);
};

const printError = (error) => {
  const code = getStatusCodefromAxiosResponse(error);
  process.stdout.write(
    utils.statusCodeColor(code)(DEFAULT_CHARACTER)
  );
}


const build = (response, responseTime) => {
  const code = getStatusCodefromAxiosResponse(response);
  return {
    status: code,
    responseTime: responseTime,
  };
};

const error = (error, responseTime) => {
  let code = getStatusCodefromAxiosResponse(error);
  if (!code) {
    code = error.code;
  }
  return {
    status: code,
    responseTime: responseTime,
  };
}

module.exports = { print, build, error, printError };
