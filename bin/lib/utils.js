const calculateResponseTime = (startTime) => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    return responseTime;
}

module.exports = { calculateResponseTime }