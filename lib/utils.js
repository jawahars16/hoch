const chalk = require("chalk");

const calculateResponseTime = (startTime) => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    return responseTime;
}

const statusCodeColor = code => {
    if (!code) {
        return chalk.red;
    }
    // if code starts with 2, return green
    // if code starts with 5, return red
    // if code starts with 3, return yellow
    // else return red
    const statusCode = code.toString();
    if (statusCode.startsWith("2")) {
        return chalk.green;
    }
    if (statusCode.startsWith("5")) {
        return chalk.red;
    }
    if (statusCode.startsWith("3") || statusCode.startsWith("4")) {
        return chalk.yellow;
    }
    return chalk.red;
}

const statusCodeDescriptionDictionary = {
    200: "OK",
    500: "Internal Server Error",
    404: "Not Found",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    502: "Bad Gateway",
    501: "Not Implemented",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    408: "Request Timeout",
    429: "Too Many Requests",
    301: "Moved Permanently",
    302: "Found",
    307: "Temporary Redirect",
    308: "Permanent Redirect",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    207: "Multi-Status",
    208: "Already Reported",
    226: "IM Used",
    300: "Multiple Choices",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    306: "Switch Proxy",
    402: "Payment Required",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "I'm a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",
    426: "Upgrade Required",
    428: "Precondition Required",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required",
    0: "Unknown",
}


module.exports = { calculateResponseTime, statusCodeDescriptionDictionary, statusCodeColor }