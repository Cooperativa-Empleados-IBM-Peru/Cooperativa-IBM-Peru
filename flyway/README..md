# Script de Flyway para bd de Cooperativa IBM
Este script permitirá crear las diferentes tablas y vistas necesarias en la bd de la Cooperativa de IBM. \
La base de datos que se utiliza es db2 en IBM cloud

## Preparacion

### Database settings
En el folder **conf** copiar el file *flyway.conf.template* con el nombre *flyway.conf* y reemplazar las siguientes variables en el mismo : \
<host> hostname de la base de datos \
<port> puerto para conectarse a la base de datos \
<database> nombre de la base de datos \
<db2user> usuario para conectarse a la base de datos \
<db2password> clave del usuario \

### Database certificate
Las instancias de db2 en IBM Cloud necesitan un certificado para poder conectarse de manera segura con SSL. \
Descargar el certificado de la consola web de la base de datos, el nombre el file será : *DigiCertGlobalRootCA.crt* \
Una vez descargado el certificado, agregarlo a un keystore con nombre *db2cloud.jks* y grabar el mismo en la carpeta **drivers**

> Puede utilizarse *keytool* o *KeyStore Explorer* para crear el keystore.

#### Crear certificado
```bash
keytool -importcert -alias db2-cert -file DigiCertGlobalRootCA.crt -keystore db2cloud.jks  -storetype PKCS12 -storepass changeit
```

#### Verificar certificado
```bash
keytool -list -v -keystore db2cloud.jks -alias db2-cert
```

#### Listar todos los certificados
```bash
keytool -list -keystore db2cloud.jks
```

## Ejecución
Una vez seteadas las configuraciones de la base de datos, y creado el keystore, se puede ejecutar las migraciones con el siguiente comando :

```bash
docker run --rm -it -v "$PWD"/sql:/flyway/sql -v "$PWD"/conf:/flyway/conf -v "$PWD"/drivers:/flyway/drivers flyway/flyway:11 migrate
```

O descargar el cli de flyway, generar el file `config/flyway.toml` y ejecutar
```bash
flyway -configFiles="conf/flyway.toml" info
```

Este comando ejecutará las migraciones de la bd desde una imagen docker de flyway

Otros comandos de flyway
```
clean
info
validate
baseline
repair
```
