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

const cloudantpassword = secrets.CLOUDANT_PWD;
const cloudanturl = secrets.CLOUDANT_URL;
const cloudantusername = secrets.CLOUDANT_USER;

const db2db = secrets.DB2_DATABASE;
const db2host = secrets.DB2_HOSTNAME;
const db2password = secrets.DB2_PASSWORD;
const db2port = secrets.DB2_PORT;
const db2ssldsn = secrets.DB2_SSLDSN;
const db2username = secrets.DB2_USER;

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
