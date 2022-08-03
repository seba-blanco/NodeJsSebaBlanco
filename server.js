const express = require('express');
const session = require('express-session')
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const usersDB =  require('./src/models/Users')

const compression = require('compression');
const fs = require('fs');
const path = require('path');
const { EXPIRATION_TIME } = require('./src/config/global')
const passport = require('passport');
const log4js = require("log4js");
// const {sendNewUserMail} = require('./src/utils/mailManager')


const ValidateLogin = require('./src/middlewares/securityMiddleware');
const {validatePass} = require('./src/utils/passValidator');
const {createHash} = require('./src/utils/hashGenerator')

const parseArgs = require('minimist');
const options = {default:{PORT:8080, SERVER_MODE:'FORK'}};

console.log(`parameters: ${JSON.stringify(process.argv)}`);
console.log(`el puerto: ${process.argv[2]}`);
const args = parseArgs(process.argv.slice(2), options);

const app = express();
// const routerProducts = require("./src/routes/ProductRouter");
// const routerCarrito = require("./src/routes/CartRouter");
const logInRouter = require('./src/routes/logInRouter');

const LocalStrategy = require('passport-local').Strategy;

app.use(session({
    secret: 'Peron',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: parseInt(EXPIRATION_TIME)
    },
    rolling: true,
    resave: true,
    saveUninitialized: true
}))


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize())
app.use(passport.session())




// app.use("/api/productos", routerProducts);
// app.use("/api/carrito", routerCarrito);

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

const PORT = parseInt(process.argv[2]);
const SERVER_MODE = args['SERVER_MODE'];
console.log(`server mode: ${SERVER_MODE}`);
console.log(`port: ${PORT}`);


if (SERVER_MODE =='FORK') {
    app.listen(PORT, () => {
        console.log('SERVER ON en http://localhost:' + PORT);
    
    });
    app.on("Error", (error) => console.log(`error en servidor ${error}`));
}
else {
    console.log("entering cluster_mode");
    if (cluster.isMaster) {
        
        for (let i=0; i<numCPUs; i++){
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    }
}

passport.use('login', new LocalStrategy(
    (username, password, callback) => {
        usersDB.findOne({ username: username }, (err, user) => {
            if (err) {
                return callback(err)
            }

            if (!user) {
                console.log('No se encontro usuario');
                return callback(null, false)
            }

            if(!validatePass(user, password)) {
                console.log('Invalid Password');
                return callback(null, false)
            }

            return callback(null, user)
        })
    }
))

passport.use('signup', new LocalStrategy(
    {passReqToCallback: true}, (req, username, password, callback) => {
        console.log(req.body);
        console.log(username);
         usersDB.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log('Hay un error al registrarse');
                return callback(err)
            }

            if (user) {
                console.log('El usuario ya existe');
                return callback(null, false)
            }

            console.log(req.body);

            const newUser = {
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                username: username,
                age:req.body.age,
                address:req.body,address,
                cellphone:req.body.cellphone,
                imgAvatar:'AVATAR',
                password: createHash(password)
            }

            console.log(newUser);


                usersDB.create(newUser, (err, userWithId) => {
                if (err) {
                    console.log('Hay un error al registrarse');
                    return callback(err)
                }
                
                //sendNewUserMail(userWithId);
                console.log(userWithId);
                console.log('Registro de usuario satisfactoria');

                return callback(null, userWithId)
            })
        })
    }
))

passport.serializeUser((user, callback) => {
    callback(null, user._id)
})

passport.deserializeUser((id, callback) => {
    usersDB.findById(id, callback)
})



//  LOGIN
app.get('/login', async (req, res) => {
    res.render('pages/login');

})
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), logInRouter.postLogin);

app.get('/faillogin', (req, res) => {

    res.send('intento de inicio de sesion no valido')
});

//  SIGNUP
app.get('/signup', logInRouter.getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), logInRouter.postSignup);
app.get('/failsignup', (req, res) => {

    res.send('no pudimos crear su usuario')
});

app.get('/', ValidateLogin, (req,res) =>{
 
    res.render('pages/index', {UserLogged: req.user.firstName});  

})

app.get('/logout',ValidateLogin, logInRouter.getLogout);

// const server =app.listen(PORT, () => {

//     console.log(`servidor http escuchando en el puerto ${server.address().port} `)
// })

// server.on("error", error => console.log(`Error en servidor ${error}`));