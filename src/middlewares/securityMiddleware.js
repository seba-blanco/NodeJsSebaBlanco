function SecurityMiddleware(req,res,next) {
    
    let admin = req.headers.admin;

    if(admin) {
        next();
    } else {
        res.json({error: -1, descripcion:`ruta ${req.originalUrl}  y metodo ${req.method}  no permitidos`});
    }

    //next();
};

module.exports = SecurityMiddleware;