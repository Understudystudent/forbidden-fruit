function errorHandling(err, req, res, next) {
    if (err || res.statusCode >= 400) {
        const status = err.status || res.statusCode || 500;
        const message = err.message || 'An error occurred while processing. Please try again later.';
        
        // Send a JSON response with the error details
        res.status(status).json({
            status: status,
            msg: message
        });
    } else {
        next();
    }
}

export {
    errorHandling
};
