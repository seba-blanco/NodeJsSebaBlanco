// ------------------------------------------------------------------------------
//  ROUTING
// ------------------------------------------------------------------------------
const parseArgs = require('minimist');
const numCPUs = require("os").cpus().length;
const log4js = require('log4js');


infoCompression =  (req, res) => {
    const logger = log4js.getLogger("warn");
    logger.warn('prueba de un warn dentro de un warn ')
    
    logger.info("prueba log info");

    logger.error("prueba log info dentro del warn");

    let args = parseArgs(process.argv);
    
    const info = {
                    plataform: process.platform,
                    nodeVersion: process.version,
                    memoryUsage: `${process.memoryUsage()['rss'] /1000000} MB`,
                    cwd: process.cwd(),
                    pID: process.pid,
                    folder:args._[1],
                    args: process.argv.slice(2),
                    procesadores: `cantidad procesadores: ${numCPUs}`

    }
   
    res.render('pages/information', {info:info});
    
}

info = (req, res) => {
    const logger = log4js.getLogger("error");
    logger.warn('prueba de un warn dentro del error')
    logger.info('prueba del info dentro del warn')
    logger.error("prueba del error dentro del error");
    
    let args = parseArgs(process.argv);
    
    const info = {
                    plataform: process.platform,
                    nodeVersion: process.version,
                    memoryUsage: `${process.memoryUsage()['rss'] /1000000} MB`,
                    cwd: process.cwd(),
                    pID: process.pid,
                    folder:args._[1],
                    args: process.argv.slice(2),
                    procesadores: `cantidad procesadores: ${numCPUs}`

    }
   
    res.render('pages/information', {info:info});
    
}

function getRoot(req, res) {
    res.render('pages/login');
}

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('profile')
    } else {
        res.render('login');
    }
}

function getSignup(req, res) {
    console.log('entre al signup')
    res.render('pages/Signup');
}

function postLogin (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.redirect('login')
    }
}

function postSignup (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.redirect('login')
    }
}

function getProfile (req, res) {
    if (req.isAuthenticated()) {
        let user = req.user;
        res.render('profileUser', { user: user, isUser:true })
    } else {
        res.redirect('login')
    }
}

function getFaillogin (req, res) {
    console.log('error en login');
    res.render('login-error', {});
}

function getFailsignup (req, res) {
    console.log('error en signup');
    res.render('signup-error', {});
}

function getLogout (req, res) {
    req.logout( (err) => {
        if (!err) {
            res.redirect('/login');
        } 
    });
}

function failRoute(req, res){
    res.status(404).render('routing-error', {});
}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.redirect("/login");
    }
}



module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailsignup,
    checkAuthentication,
    getProfile,
    info,
    infoCompression
}
  