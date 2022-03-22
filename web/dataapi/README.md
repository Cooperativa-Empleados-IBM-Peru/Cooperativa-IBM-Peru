# coopeibm-dataapi

[![Build Status](https://travis.ibm.com/IGAPeru/coopeibm-dataapi.svg?token=5nxyP1jzqq1iZT5wjNUD&branch=master)](https://travis.ibm.com/IGAPeru/coopeibm-dataapi)

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

Estas son las APIs utilizadas por la aplicación de la **Cooperativa de Empleados de IBM Perú** para leer la data de db2 (y cloudant próximamente)

## Seteo de variables de entorno
Algunas variables de entorno usadas para conectarse a las bases de datos se setean en travis, en el archivo *travis.yml* y en variables de entorno en la configuración de Travis.
Esto se hace asi por seguridad, pues no se pueden subir las llaves ni apikeys a Github.
  
En Travis se debe definir la siguiente variable de entorno para hacer el deploy de la app en IBM Cloud.
- CF_APIKEY
  
A los siguientes nombres de variables definidas en Travis, se les agrega al final **_DEV** o **_PROD** según la branch (*dev* o *master*)

- CLOUDANT_PASSWORD
- CLOUDANT_URL
- CLOUDANT_USERNAME
  
- DB2_DB
- DB2_HOST
- DB2_PASSWORD
- DB2_PORT
- DB2_SSLDSN
- DB2_USERNAME
