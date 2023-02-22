const logOrigUrlMiddleware = (req, res, next) => {
    console.log('originalURL:', req.originalUrl);
    next();
}

export default logOrigUrlMiddleware;