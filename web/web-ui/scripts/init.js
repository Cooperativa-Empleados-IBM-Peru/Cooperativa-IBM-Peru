const os = require('os');
const platform = process.platform;
const osrelease = os.release();

const shell = require('shelljs');

const sed = shell.sed;
const cp = shell.cp;

const envtmpl = '../src/environments/env.ts.template';
const envfile = '../src/environments/env.ts';

const apptmpl = '../localdev-config.json.template';
const appfile = '../localdev-config.json';

const nodetmpl = '../.env.template';
const nodefile = '../.env';

const runningenv = platform === 'win32' ?
    `Windows` :
    (osrelease.includes('microsoft') ?
    `WSL` :
    `linux`
    ) ;

console.log("Running in : " + runningenv);
cp(envtmpl, envfile);
cp(apptmpl, appfile);
cp(nodetmpl, nodefile);

console.log("Reading env vars from travis");

const coopeapiurl = process.env.TRAVIS_BRANCH === 'dev' ? process.env.COOPEAPI_URL_DEV : process.env.COOPEAPI_URL_PROD;

const appidid = process.env.TRAVIS_BRANCH === 'dev' ? process.env.APPID_ID_DEV : process.env.APPID_ID_PROD;
const appidoauthurl = process.env.TRAVIS_BRANCH === 'dev' ? process.env.APPID_OAUTHURL_DEV : process.env.APPID_OAUTHURL_PROD;
const appidprofilesurl = process.env.TRAVIS_BRANCH === 'dev' ? process.env.APPID_PROFILESURL_DEV : process.env.APPID_PROFILESURL_PROD;
const appidsecret = process.env.TRAVIS_BRANCH === 'dev' ? process.env.APPID_SECRET_DEV : process.env.APPID_SECRET_PROD;
const appidtenantid = process.env.TRAVIS_BRANCH === 'dev' ? process.env.APPID_TENANTID_DEV : process.env.APPID_TENANTID_PROD;
const appidredirecturl = process.env.TRAVIS_BRANCH === 'dev' ? process.env.APPID_REDIRECTURL_DEV : process.env.APPID_REDIRECTURL_PROD;

const cloudanturl = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_URL_DEV : process.env.CLOUDANT_URL_PROD;
const cloudantuser = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_USER_DEV : process.env.CLOUDANT_USER_PROD;
const cloudantpassword = process.env.TRAVIS_BRANCH === 'dev' ? process.env.CLOUDANT_PWD_DEV : process.env.CLOUDANT_PWD_PROD;

const db2db = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_DATABASE_DEV : process.env.DB2_DATABASE_PROD;
const db2hostname = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_HOSTNAME_DEV : process.env.DB2_HOSTNAME_PROD;
const db2user = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_USER_DEV : process.env.DB2_USER_PROD;
const db2pwd = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_PASSWORD_DEV : process.env.DB2_PASSWORD_PROD;
const db2port = process.env.TRAVIS_BRANCH === 'dev' ? process.env.DB2_PORT_DEV : process.env.DB2_PORT_PROD;

console.log("Updating env vars in env.ts");

sed('-i', '<COOPEAPI.URL>', '"' + coopeapiurl + '"', envfile);
sed('-i', '<CLOUDANT.URL>', '"' + cloudanturl + '"', envfile);
sed('-i', '<CLOUDANT.USERNAME>', '"' + cloudantuser + '"', envfile);
sed('-i', '<CLOUDANT.PASSWORD>', '"' + cloudantpassword + '"', envfile);

console.log("Updating env vars in local-dev.config.json");

sed('-i', '<APPID.CLIENTID>', '"' + appidid + '"', appfile);
sed('-i', '<APPID.OAUTHSERVERURL>', '"' + appidoauthurl + '"', appfile);
sed('-i', '<APPID.PROFILESURL>', '"' + appidprofilesurl + '"', appfile);
sed('-i', '<APPID.SECRET>', '"' + appidsecret + '"', appfile);
sed('-i', '<APPID.TENANTID>', '"' + appidtenantid + '"', appfile);
sed('-i', '<APPID.REDIRECTURI>', '"' + appidredirecturl + '"', appfile);

console.log("Updating env vars in .env");

sed('-i', '<DB2.DATABASE>', '"' + db2db + '"', nodefile);
sed('-i', '<DB2.HOSTNAME>', '"' + db2hostname + '"', nodefile);
sed('-i', '<DB2.USER>', '"' + db2user + '"', nodefile);
sed('-i', '<DB2.PWD>', '"' + db2pwd + '"', nodefile);
sed('-i', '<DB2.PORT>', db2port, nodefile);

console.log("Finish setting env vars in env.ts");
