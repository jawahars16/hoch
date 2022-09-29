const chalk = require("chalk");
const utils = require('../lib/utils');

describe('Calculate response time', () => {
    it('should calculate response time', () => {
        const start = new Date('10/16/1987 12:00:00');
        Date.now = jest.fn(() => new Date('10/16/1987 12:01:00').getTime());
        const res = utils.calculateResponseTime(start);
        expect(res).toBe(60000);
    })
})

describe('Status Code', () => {
    it('should return green color for 200', () => {
        const color = utils.statusCodeColor(200);
        expect(color('*') == chalk.green('*')).toBe(true);
    })

    it('should return red color for 500', () => {
        const color = utils.statusCodeColor(500);
        expect(color('*') == chalk.red('*')).toBe(true);
    })

    it('should return yellow color for 301', () => {
        const color = utils.statusCodeColor(301);
        expect(color('*') == chalk.yellow('*')).toBe(true);
    })

    it('should return yellow color for 404', () => {
        const color = utils.statusCodeColor(404);
        expect(color('*') == chalk.yellow('*')).toBe(true);
    })

    it('should return red color for others', () => {
        const color = utils.statusCodeColor("unknown");
        expect(color('*') == chalk.red('*')).toBe(true);
    })
})