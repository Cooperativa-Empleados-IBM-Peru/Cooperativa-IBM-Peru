const express = require("express");
const session = require("express-session");
const passport = require("passport");
const appID = require("ibmcloud-appid");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const ibmdb = require('ibm_db');
const { v4: uuidv4 } = require('uuid');
const cron = require('node-cron');
const converter = require('json-2-csv');

const WebAppStrategy = appID.WebAppStrategy;

// configuracion del Dotenv
dotenv.config();

//db2 config
const connStr = `DATABASE=${process.env.DB2_DATABASE};HOSTNAME=${process.env.DB2_HOSTNAME};UID=${process.env.DB2_USER};PWD=${process.env.DB2_PWD};PORT=${process.env.DB2_PORT};PROTOCOL=TCPIP;Security=SSL;`;

// crear instancia Express
const app = express();
const port = process.env.PORT || 6001;

var env = process.env.NODE_ENV || "dev";

const sched5 = cron.schedule("*/15 * * * *", () => {
	var currdatetime = new Date();
    console.log('running a task every 15 minutes!! ' + currdatetime);

	ibmdb.open(connStr, function (err,conn) {
		if (err) reject(err);
		
		// Save last login info
		var sql = `SELECT * FROM ${process.env.DB2_USER}.USERSLOGIN`;

		conn.query(sql, function (err, data) {
			if (err) {
				reject(err);
			  } else {
//				console.log(data);

				converter.json2csv(data, (err, csv) => {
					if (err) {
						throw err;
					}
				
					// print CSV string
//					console.log(csv);
				});

			  }
	
		  conn.close();
		});

	  });

});

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
let webAppStrategy = new WebAppStrategy(getAppIDConfig());
passport.use(webAppStrategy);
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

app.get(CALLBACK_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME, {failureRedirect: '/error'}));

// Ruta: Aplicacion Angular
// Middleware: Auth user
app.use("/", passport.authenticate(WebAppStrategy.STRATEGY_NAME), express.static(__dirname + "/dist"));

// Ruta: Cerrar sesion
// Middleware: Auth user
app.get("/logout", passport.authenticate(WebAppStrategy.STRATEGY_NAME), (req, res) => {
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

app.listen(port);

function getAppIDConfig() {
//  let config;
  try {
    config = require("./localdev-config.json");
  } catch (e) {
    let vcapApplication = JSON.parse(process.env["VCAP_APPLICATION"]);
    return {
      redirectUri:
        "https://" + vcapApplication["application_uris"][0] + CALLBACK_URL
    };
  }
  return config;
}

function getInfo ( email ){
	return new Promise(function (resolve, reject) {
		ibmdb.open(connStr, function (err,conn) {
			if (err) reject(err);
			
			// Save last login info
			let sqlins = `INSERT INTO ${process.env.DB2_USER}.USERSLOGIN (EMAILEMPLEADO, FECLOGIN) VALUES ('${email}', CURRENT TIMESTAMP);`;
			let sqlqry = `SELECT c.UUID FROM ${process.env.DB2_USER}.VWSOCIOSACTIVOS c WHERE c.EMAILEMPLEADO = '${email}' OR c.EMAILEMPEADO2 = '${email}';`;

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
