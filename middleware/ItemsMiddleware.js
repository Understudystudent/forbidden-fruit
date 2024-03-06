let ItemMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        status: 500,
        msg: 'Internal Server Error',
    });
};

export default ItemMiddleware;

