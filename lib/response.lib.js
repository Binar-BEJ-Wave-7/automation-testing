class Response {
    constructor(code, data) {
        this.code = code
        this.message = 'success'
        this.data = data
        this.err = {}
    }
}

class ErrorResponse {
    constructor(code, err) {
        this.code = code
        this.message = 'error'
        this.data = {}
        this.err = err
    }
}

module.exports = {Response, ErrorResponse}