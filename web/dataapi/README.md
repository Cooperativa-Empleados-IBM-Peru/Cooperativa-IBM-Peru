# coopeibm-dataapi

[![Build Status](https://travis.ibm.com/IGAPeru/coopeibm-dataapi.svg?token=5nxyP1jzqq1iZT5wjNUD&branch=master)](https://travis.ibm.com/IGAPeru/coopeibm-dataapi)

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

Estas son las APIs utilizadas por la aplicación de la **Cooperativa de Empleados de IBM Perú** para leer la data de db2 (y cloudant próximamente)

## Seteo de variables de entorno
Algunas variables de entorno usadas para conectarse a las bases de datos se setean en travis, en el archivo *travis.yml* y en variables de entorno en la configuración de Travis.
Esto se hace asi por seguridad, pues no se pueden subir las llaves ni apikeys a Github.

A los siguientes nombres de variables definidas en Travis, se les agrega al final **_DEV** o **_PROD** según la branch (*dev* o *master*)

- CLOUDANT_APIKEY
- CLOUDANT_HOST
- CLOUDANT_IAMAPIKEYDESC
- CLOUDANT_IAMAPIKEYNAME
- CLOUDANT_IAMROLE
- CLOUDANT_IAMSERVICEID
- CLOUDANT_PASSWORD
- CLOUDANT_PORT
- CLOUDANT_URL
- CLOUDANT_USERNAME


- DB2_DB
- DB2_DSN
- DB2_HOST
- DB2_HOSTNAME
- DB2_HTTPSURL
- DB2_JDBCURL
- DB2_PASSWORD
- DB2_PORT
- DB2_SSLDSN
- DB2_SSLJDBCURL
- DB2_URI
- DB2_USERNAME

