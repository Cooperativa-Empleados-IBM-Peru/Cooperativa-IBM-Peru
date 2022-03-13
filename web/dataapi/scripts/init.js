const os = require('os');
const platform = process.platform;
const osrelease = os.release();

const shell = require('shelljs');

const sed = shell.sed;
const cp = shell.cp;

const envtmpl = '../src/datasources/env.ts.template';
const envfile = '../src/datasources/env.ts';

const runningenv = platform === 'win32' ?
    `Windows` :
    (osrelease.includes('microsoft') ?
        `WSL` :
        `linux`
    );

console.log("Running in : " + runningenv);
cp(envtmpl, envfile);

console.log("Updating env vars in env.ts");

const cloudantapikey = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_APIKEY_DEV : process.env.CLOUDANT_APIKEY_PROD;
const cloudanthost = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_HOST_DEV : process.env.CLOUDANT_HOST_PROD;
//const cloudantiamapikeydesc = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_IAMAPIKEYDESC_DEV : process.env.CLOUDANT_IAMAPIKEYDESC_PROD;
const cloudantiamapikeyname = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_IAMAPIKEYNAME_DEV : process.env.CLOUDANT_IAMAPIKEYNAME_PROD;
const cloudantiamrole = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_IAMROLE_DEV : process.env.CLOUDANT_IAMROLE_PROD;
const cloudantiamserviceid = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_IAMSERVICEID_DEV : process.env.CLOUDANT_IAMSERVICEID_PROD;
const cloudantpassword = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_PASSWORD_DEV : process.env.CLOUDANT_PASSWORD_PROD;
const cloudantport = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_PORT_DEV : process.env.CLOUDANT_PORT_PROD;
const cloudanturl = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_URL_DEV : process.env.CLOUDANT_URL_PROD;
const cloudantusername = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_USERNAME_DEV : process.env.CLOUDANT_USERNAME_PROD;

const db2db = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_DB_DEV : process.env.DB2_DB_PROD;
//const db2dsn = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_DSN_DEV : process.env.DB2_DSN_PROD;
const db2host = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_HOST_DEV : process.env.DB2_HOST_PROD;
//const db2hostname = process.env.TRAVIS_BRANCH === 'dev' ? pess.env.DB2_HOSTNAME_DEV : process.env.DB2_HOSTNAME_PROD;
//const db2httpsurl = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_HTTPSURL_DEV : process.env.DB2_HTTPSURL_PROD;
//const db2jdbcurl = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_JDBCURL_DEV : process.env.DB2_JDBCURL_PROD;
const db2password = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_PASSWORD_DEV : process.env.DB2_PASSWORD_PROD;
const db2port = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_PORT_DEV : process.env.DB2_PORT_PROD;
const db2ssldsn = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_SSLDSN_DEV : process.env.DB2_SSLDSN_PROD;
//const db2ssljdbcurl = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_SSLJDBCURL_DEV : process.env.DB2_SSLJDBCURL_PROD;
//const db2uri = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_URI_DEV : process.env.DB2_URI_PROD;
const db2username = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_USERNAME_DEV : process.env.DB2_USERNAME_PROD;

sed('-i', '<CLOUDANTDB.APIKEY>', '"' + cloudantapikey + '"', envfile);
sed('-i', '<CLOUDANTDB.HOST>', '"' + cloudanthost + '"', envfile);
//sed('-i', '<CLOUDANTDB.IAMAPIKEYDESCRIPTION>', '"' + cloudantiamapikeydesc + '"', envfile);
sed('-i', '<CLOUDANTDB.IAMAPIKEYNAME>', '"' + cloudantiamapikeyname + '"', envfile);
sed('-i', '<CLOUDANTDB.IAMROLECRN>', '"' + cloudantiamrole + '"', envfile);
sed('-i', '<CLOUDANTDB.IAMSERVICEIDCRN>', '"' + cloudantiamserviceid + '"', envfile);
sed('-i', '<CLOUDANTDB.PASSWORD>', '"' + cloudantpassword + '"', envfile);
sed('-i', '<CLOUDANTDB.PORT>', cloudantport, envfile);
sed('-i', '<CLOUDANTDB.URL>', '"' + cloudanturl + '"', envfile);
sed('-i', '<CLOUDANTDB.USERNAME>', '"' + cloudantusername + '"', envfile);

sed('-i', '<DB2DB.DB>', '"' + db2db + '"', envfile);
//sed('-i', '<DB2DB.DSN>', '"' + db2dsn + '"', envfile);
sed('-i', '<DB2DB.HOST>', '"' + db2host + '"', envfile);
//sed('-i', '<DB2DB.HOSTNAME>', '"' + db2hostname + '"', envfile);
//sed('-i', '<DB2DB.HTTPSURL>', '"' + db2httpsurl + '"', envfile);
//sed('-i', '<DB2DB.JDBCURL>', '"' + db2jdbcurl + '"', envfile);
sed('-i', '<DB2DB.PASSWORD>', '"' + db2password + '"', envfile);
sed('-i', '<DB2DB.PORT>', db2port, envfile);
sed('-i', '<DB2DB.SSLDSN>', '"' + db2ssldsn + '"', envfile);
//sed('-i', '<DB2DB.SSLJDBCURL>', '"' + db2ssljdbcurl + '"', envfile);
//sed('-i', '<DB2DB.URI>', '"' + db2uri + '"', envfile);
sed('-i', '<DB2DB.USERNAME>', '"' + db2username + '"', envfile);

console.log("Finish setting env vars in env.ts");
