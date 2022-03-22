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

const cloudantpassword = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_PASSWORD_DEV : process.env.CLOUDANT_PASSWORD_PROD;
const cloudanturl = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_URL_DEV : process.env.CLOUDANT_URL_PROD;
const cloudantusername = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_USERNAME_DEV : process.env.CLOUDANT_USERNAME_PROD;

const db2db = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_DB_DEV : process.env.DB2_DB_PROD;
const db2host = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_HOST_DEV : process.env.DB2_HOST_PROD;
const db2password = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_PASSWORD_DEV : process.env.DB2_PASSWORD_PROD;
const db2port = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_PORT_DEV : process.env.DB2_PORT_PROD;
const db2ssldsn = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_SSLDSN_DEV : process.env.DB2_SSLDSN_PROD;
const db2username = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_USERNAME_DEV : process.env.DB2_USERNAME_PROD;

sed('-i', '<CLOUDANTDB.PASSWORD>', '"' + cloudantpassword + '"', envfile);
sed('-i', '<CLOUDANTDB.URL>', '"' + cloudanturl + '"', envfile);
sed('-i', '<CLOUDANTDB.USERNAME>', '"' + cloudantusername + '"', envfile);

sed('-i', '<DB2DB.DB>', '"' + db2db + '"', envfile);
sed('-i', '<DB2DB.HOST>', '"' + db2host + '"', envfile);
sed('-i', '<DB2DB.PASSWORD>', '"' + db2password + '"', envfile);
sed('-i', '<DB2DB.PORT>', db2port, envfile);
sed('-i', '<DB2DB.SSLDSN>', '"' + db2ssldsn + '"', envfile);
sed('-i', '<DB2DB.USERNAME>', '"' + db2username + '"', envfile);

console.log("Finish setting env vars in env.ts");
