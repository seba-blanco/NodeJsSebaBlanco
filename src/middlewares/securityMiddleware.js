function ValidateLogin(req,res,next) {
    
    if (req.isAuthenticated()) {
        next();
    }
    else {
        console.log('no logueado');
        res.redirect('/login');
    }

};



module.exports = ValidateLogin;