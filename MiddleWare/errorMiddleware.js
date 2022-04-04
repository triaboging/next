const ApiError = require('./ApiError');

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    console.log('FatalError:', err)
    return res.status(500).json({message: "Непредвиденная ошибка!", error: err})
}