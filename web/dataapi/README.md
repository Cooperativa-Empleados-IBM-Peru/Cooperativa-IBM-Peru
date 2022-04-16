# coopeibm-dataapi

[![Cooperativa web dataapi](https://github.com/Cooperativa-Empleados-IBM-Peru/Cooperativa-IBM-Peru/actions/workflows/pr-web-dataapi.yml/badge.svg)](https://github.com/Cooperativa-Empleados-IBM-Peru/Cooperativa-IBM-Peru/actions/workflows/pr-web-dataapi.yml)

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

Estas son las APIs utilizadas por la aplicación de la **Cooperativa de Empleados de IBM Perú** para leer la data de db2 (y cloudant próximamente)

## Seteo de variables de entorno
Algunas variables de entorno usadas para conectarse a las bases de datos se setean como secrets en el repositorio de Github, o en los Environments de UAT y PROD en el mismo Github.
Esto se hace asi por seguridad, pues no se pueden subir las llaves ni apikeys a Github.
  
En Github secrets se debe definir la siguiente variable de entorno para hacer el deploy de la app en IBM Cloud.
- IBM_CLOUD_APIKEY
- IBM_CLOUD_USERNAME
- IBM_CLOUD_ORG
- IBM_CLOUD_SPACE

  
Las siguientes variables son definidas en los Environments de UAT y PROD en Github

- CLOUDANT_DB
- CLOUDANT_MODEL
- CLOUDANT_PWD
- CLOUDANT_URL
- CLOUDANT_USER
  
- DB2_DATABASE
- DB2_HOSTNAME
- DB2_PASSWORD
- DB2_PORT
- DB2_SSLDSN
- DB2_USER
