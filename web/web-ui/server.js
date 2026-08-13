const express = require("express");
const session = require("express-session");
const passport = require("passport");
const appID = require("ibmcloud-appid");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const ibmdb = require('ibm_db');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const WebAppStrategy = appID.WebAppStrategy;

// configuracion del Dotenv
dotenv.config();

//db2 config
const connStr = `DATABASE=${process.env.DB2_DATABASE};HOSTNAME=${process.env.DB2_HOSTNAME};UID=${process.env.DB2_USERNAME};PWD=${process.env.DB2_PASSWORD};PORT=${process.env.DB2_PORT};PROTOCOL=TCPIP;Security=SSL;`;

// crear instancia Express
const app = express();

// Constants
const PORT = process.env.PORT || 6001;
const HOST = '0.0.0.0';
var env = process.env.NODE_ENV || "dev";

// service uri
let SERVICE_URI = "";
if(process.env.APPID_REDIRECT_URI) {
	SERVICE_URI = process.env.APPID_REDIRECT_URI;
} else if (env === 'production') {
	SERVICE_URI = `https://${process.env.CE_APP}.${process.env.CE_SUBDOMAIN}.${process.env.CE_DOMAIN}`;
} else {
	SERVICE_URI = `http://localhost:${PORT}`;
}

// Configurar CORS
app.use(cors({
	origin: SERVICE_URI,
	optionsSuccessStatus: 200
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Configurar la sesion de la aplicacion
app.use(
  session({
	secret: uuidv4(),
    resave: true,
    saveUninitialized: true,
    proxy: true,
	cookie: { secure: process.env.FORCE_HTTPS }
  })
);
// Configurar Passport
app.use(passport.initialize());
app.use(passport.session());

// Configurar Passport con APP ID
const CALLBACK_URL = "/ibm/cloud/appid/callback";
let webAppStrategy = new WebAppStrategy({
	clientId: process.env.APPID_CLIENT_ID,
	tenantId: process.env.APPID_TENANT_ID,
	secret: process.env.APPID_SECRET,
	profilesUrl: process.env.APPID_PROFILES_URL,
	oauthServerUrl: process.env.APPID_OAUTH_SERVER_URL,
	redirectUri: SERVICE_URI + CALLBACK_URL
});
passport.use(webAppStrategy);
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

// Handle Login
app.get('/login', passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
	successRedirect: '/',
	forceLogin: true
}));

// Handle callback
app.get(CALLBACK_URL, passport.authenticate(
	WebAppStrategy.STRATEGY_NAME, 
	{failureRedirect: '/error'}
	));

// Ruta: Aplicacion Angular
// Middleware: Auth user
const angularDist = env === 'production' ? "/dist" : "/client/dist";
app.use("/", 
	passport.authenticate(WebAppStrategy.STRATEGY_NAME), 
	express.static(__dirname + angularDist)
	);

// Ruta: Cerrar sesion
// Middleware: Auth user
app.get("/logout", 
	passport.authenticate(WebAppStrategy.STRATEGY_NAME), (req, res) => {
  		WebAppStrategy.logout(req);
  		res.redirect("/");
	});

// Ruta: Obtener el email
// Middleware: Auth user
app.get("/api/token", passport.authenticate(WebAppStrategy.STRATEGY_NAME),(req, res) => {

  var accessToken = req.session[WebAppStrategy.AUTH_CONTEXT].accessToken;
  var email = req.session[WebAppStrategy.AUTH_CONTEXT].identityTokenPayload.email;
  getInfo(email).then((uuid) =>{
  	res.json({
	  "email": email,
	  "token": accessToken,
	  "uuid": uuid
  	});
  }, function(err) {
        console.log(err);
  });

});

// Ruta: Revisar el estado de la aplicacion
// Middleware: -
app.get('/health', (req, res, next) => {
  res.json({status: 'UP'})
});

// Ruta: Error
// Middleware: -
app.get("/error", (req, res) => {
  res.send("Authentication Error");
});

app.listen(PORT, HOST, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});

function getInfo ( email ){

	return new Promise(function (resolve, reject) {
		ibmdb.open(connStr, function (err,conn) {
			if (err) reject(err);
			// Save last login info
			let sqlins = `INSERT INTO ${process.env.DB2_USERNAME}.USERSLOGIN (EMAILEMPLEADO, FECLOGIN) VALUES ('${email}', CURRENT TIMESTAMP);`;
			let sqlqry = `SELECT c.UUID FROM ${process.env.DB2_USERNAME}.VWSOCIOSACTIVOS c WHERE c.EMAILEMPLEADO = '${email}' OR c.EMAILEMPLEADO2 = '${email}';`;

			conn.query(sqlins, function (err2, result) {
				if (err2) throw err2;
				console.log("1 record inserted into USERSLOGIN");
			  }),

			  conn.query(sqlqry, function (err, data) {
			  if (err) {
				reject(err);
			  } else {
				let uuid;
				uuid = data.length == 1 ? data[0].UUID.trim() : "";
	
				resolve(uuid);
			  }
	
			  conn.close();
			});
		  });
	 });
}
