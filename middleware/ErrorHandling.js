function errorHandling ( err,req,res,next ) {
    if (err || res.statusCode >= 400){
        res.json ({
            status: err.status || res.statusCodes || 500,
            msg: 'An error occcured while processing. Try again later'+ err.message
        })
    } else {
        next()}
}

export {
    errorHandling
}