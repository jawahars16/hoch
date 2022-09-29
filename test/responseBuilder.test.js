const responseBuilder = require('../lib/responseBuilder')

describe('Print response', () => {

    it('should print response', () => {
        const response = {
            status: 200
        }

        process.stdout.write = jest.fn();
        responseBuilder.print(response);
        expect(process.stdout.write).toHaveBeenCalledWith('\u001b[32m*\u001b[39m');
    })

    it('should print error response', () => {
        const response = {
            status: 500
        }

        process.stdout.write = jest.fn();
        responseBuilder.print(response);
        expect(process.stdout.write).toHaveBeenCalledWith('\u001b[31m*\u001b[39m');
    })

    it('should print error', () => {
        const response = {
            code: "ERROR"
        }

        process.stdout.write = jest.fn();
        responseBuilder.printError(response);
        expect(process.stdout.write).toHaveBeenCalledWith('\u001b[31m*\u001b[39m');
    })

    it('should build response body', () => {
        const response = {
            status: 200
        }

        const status = responseBuilder.build(response, 1000);
        expect(status).toEqual({
            status: 200,
            responseTime: 1000
        });
    })

    it('should build error response body', () => {
        const response = {
            status: 500
        }

        const status = responseBuilder.error(response, 1000);
        expect(status).toEqual({
            status: 500,
            responseTime: 1000
        });
    })

    it('should build error response body without status code', () => {
        const response = {
            code: "ERROR"
        }

        const status = responseBuilder.error(response, 1000);
        expect(status).toEqual({
            status: 'ERROR',
            responseTime: 1000
        });
    })
});

describe('Build response', () => {
    it('should build response', () => {
        const response = {
            status: 200
        }

        const responseTime = 100
        const res = responseBuilder.build(response, responseTime)
        expect(res.status).toBe(200)
        expect(res.responseTime).toBe(100)
    })
})