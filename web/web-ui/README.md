# Cooperativa IBM Perú

[![Build Status](https://travis.ibm.com/IGAPeru/coopeibm-web.svg?token=5nxyP1jzqq1iZT5wjNUD&branch=master)](https://travis.ibm.com/IGAPeru/coopeibm-web)
[![IBM Cloud](https://img.shields.io/badge/IBM%20Cloud-powered-blue.svg)](https://cloud.ibm.com)
[![Angular](https://img.shields.io/badge/Angular-10.0.6-red.svg)](https://angular.io/)

Aplicación de la Cooperativa de Empleados de IBM Perú  
- v1.0.0 permite consultar las cuentas del socio  

Esta aplicación se ha desarrollado utilizando [Angular](https://angular.io/) y las librerías de [Carbon Design System](https://angular.carbondesignsystem.com/) para el UI.  
Utiliza el servivio AppId de IBM Cloud para el login con IBMId

La data de las cuentas del socio se guarda en db2  

## Menús de la aplicación
Los menús de la aplicación son :  

### SOCIOS 
- Préstamos
- Ahorros
- Aportaciones
- Calculadora de Pagos
- Calculadora de Certificados
- Reglamento de Crédito
- Tasas de Interes

### OTROS SERVICIOS
- FRA
- Previsión Social
- Asesoría Legal
- Consumo

### PROVEEDORES Y AVISOS
- Internos
- Proveedores
- Noticias

### ADMINISTRACION
- Lista de socios

## Sobre el acceso
El acceso a la aplicación se hace con el IBMId. Esto para permitir a los ex-empleados que son socios, que puedan acceder a la misma.  
El acceso con w3Id solo permite acceso a los actuales empleados de IBM  
El registro de la aplicación en IBMid se hace por la siguiente página :
- https://ies-provisioner.prod.identity-services.intranet.ibm.com/tools/sso/home

## Seteo de variables de entorno
Algunas variables de entorno usadas para conectarse a las bases de datos, o al IBMid (OpenId Connect)  
se setean en travis, en el archivo *travis.yml* y en variables de entorno en la configuración de Travis.  
Esto se hace asi por seguridad, pues no se pueden subir las llaves ni apikeys a Github.  

A los siguientes nombres de variables definidas en Travis, se les agrega al final **_DEV** o **_PROD** según la branch (*dev* o *master*)
- IBMID_CLIENTNAME
- IBMID_CLIENTID
- IBMID_CLIENTSECRET
- IBMID_AUTHENDPOINT
- IBMID_TOKENENDPOINT
- IBMID_USERINFOENDPOINT
- IBMID_INTROSPECTIONENDPOINT
- IBMID_DISCOVERYENDPOINT
- IBMID_JWKSENDPOINT
- IBMID_ISSUER  
  
- COOPEAPI_URL
- COOPEAPI_APIKEY
- COOPEAPI_SECRET

