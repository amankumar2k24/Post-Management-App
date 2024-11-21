const success = (message, results, statusCode) => {
    return {
        message,
        error: false,
        code: statusCode,
        count: results.length,
        results
    }
}

const error = (message, statusCode) => {
    return {
        message,
        error: true,
        code: statusCode,
    }
}

const validateRes = (errors) => {
    return {
        message: errors,
        error: true,
        code: 422
    }
}

module.exports = {
    success, error, validateRes
}

