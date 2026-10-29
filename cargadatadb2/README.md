# Cooperativa IBM Perú - Carga data

Java program to upload the data of Cooperativa to DB2 database in Cloud

## Build
Requires JDK 21 and Maven. Run from the `cargadatadb2` folder:

```bash
mvn clean package assembly:single
```

This generates, in `target/`:
- `coopeibm-cargadatadb2-1.7.0-jar-with-dependencies.jar` : runnable jar (includes all dependencies)
- `coopeibm-cargadatadb2-1.7.0.jar` : jar with only the project classes (needs the jars in `target/dependency`)

## Run
The program reads its configuration from `./resources` (relative to the current directory), so run it from a folder
that contains the `resources/` folder (`coopeibm.properties`, `log4j2.properties`):

```bash
java -jar target/coopeibm-cargadatadb2-1.7.0-jar-with-dependencies.jar <parameter>
```

## Parameters
Se aceptan los siguientes parámetros :
    **cargadata**     : Esta opción cargará los files de datos de la cuentas de los socios a la bd
    **getfiles**      : Esta opción traerá los files de datos via sftp del server Domino
    **fullcargadata** : Esta opción traerá los files via sftp, y los cargará en la bd (igual: **FULL**)
    **help**          : Muestra esta información de ayuda
    
## Tables
An SQL File with the definition of the Tables and Views is included in the resoures folder

## Files
El proceso carga los files en el siguiente orden  
- Socios (Optional)  
  
- Maestro Clientes y Saldos (movim)  
- Movimiento ahorro (movim)  
- Movimiento miscelaneo (movim)  
- Movimiento aportación (movim)  
- movimiento bloqueo (movim)  
- Maestro préstamo (movim)  
- Plan pagos (movim)  
- Certificado Cuenta Plazo (movim)  
- Garantes (movim)  
- Garantizado Socios (movim)  
  
- Fondo resposición Automovil FRA (auto)  
- Siniestro fondos (auto)  
  
- Videos (not used)  

## Configuration

All runtime configuration lives in the `resources/` folder. Two files are required:

| File | Template in repo | Contains secrets? |
|---|---|---|
| `resources/coopeibm.properties` | `resources/coopeibm.properties.template` | ✅ Yes — git-ignored |
| `resources/log4j2.properties` | `resources/log4j2.properties` | No — copy as-is |

Set up from the templates:

```bash
cp resources/coopeibm.properties.template resources/coopeibm.properties
# then edit coopeibm.properties with the real values

cp resources/log4j2.properties <deployment-dir>/resources/log4j2.properties
# no edits needed for normal use
```

The file has three sections:

### Environment
```properties
coope.environment=dev          # dev | test | prod
coope.support=<email>
```

### SFTP server (IBM Domino)
```properties
coopesftp.server=<hostname>
coopesftp.user=<username>
coopesftp.clave=<password>
coopesftp.path=/home/coope/
```

### DB2 on Cloud
Obtain `jdbcurl`, `username` and `password` from the IBM Cloud Db2 service credentials page.
```properties
db2.jdbcurl=jdbc:db2://<host>:<port>/<db>:sslConnection=true;sslTrustStoreLocation=./resources/coope-truststore.p12;sslTrustStorePassword=<truststore-password>;loginTimeout=30;
db2.username=<username>
db2.password=<password>
```
- `loginTimeout` : seconds to wait for the connection. Without it a failing connection can look like a hang.

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


### Flat-file paths
```properties
coopetxt.country=815
coopetxt.path=<local path, e.g. /mnt/c/cargacoope/filescoope/>
coopetxt.maestro=prusal.txt
coopetxt.movimientos=movaho.txt
coopetxt.miscelaneos=movmis.txt
coopetxt.aportaciones=movapo.txt
coopetxt.bloqueo=movblq.txt
coopetxt.prestamos=maepre.txt
coopetxt.pagos=planpg.txt
coopetxt.certificados=maecer.txt
coopetxt.garantes=relgar.txt
coopetxt.garantizados=relgzd.txt
coopetxt.fondoreposicionauto=maefra.txt
coopetxt.fondosiniestroauto=maesin.txt
coopetxt.videos=videos.txt
# Optional — only needed on days when personal-data changes are present:
# coopetxt.sociospersonal=datsoc.txt
```

## Detalles
1. La carga de socios debería hacerse solo una vez (carga inicial), sin embargo se deja el proceso por si es necesario
2. Se puede traer los files via sftp (en caso el programa no esté corriendo en el Power8 de la cooperativa)
3. La carga se hace en tablas temporales en db2 por performance
   - Si se carga directo a las tablas de la aplicación, se demora demasiado porque se tiene que hacer un SQL query por cada registro (línea en el file)
   - Al cargar a tablas temporales, cargamos todo el file (registro por registro) sin necesidad de hacer queries.
   - Si falla algo a mitad del proceso, no se afectan las tablas de la aplicación, los usuarios siguen viendo su data (aunque no esté actualizada).
4. Al finalizar la carga, se usan *Stored Procedures* en la base de datos. Esto también por performance.
   - Un Stored Procedure limpia (elimina todos los registros) de las tablas temporales. Esto para poder hacer la carga en esas tablas.
   - Otro Stored Procedure Limpia las tablas de producción, e inmediatamente copia la data de las tablas temporales a las tablas de producción.
5. Se usan vistas para tener disponibles los cálculos de *montos* y *totales*. Esto no era posible de hacer en Cloudant.
  
## Tipos de datos
Algunos files (y por tanto alguas tablas) tienen un campo para indicar un tipo de registro.  
A continuación documentamos los diferentes tipos de datos/registros que se pueden encontrar en la bd.  
Esta info la sacamos del código de la bd de la Cooperativa en Notes

# Tipo de Moneda
- 01 : Soles
- 02 : Dólares

# Tipo de Certificados
- 01 : Certificado Soles
- 02 : Certificado Dólares
- 03 : CTS Soles
- 04 : CTS Dólares

# Tipo de Préstamos
- 201 : A sola firma
- 202 : Corto Plazo
- 203 : Académico (Mediano Plazo)
- 204 : Largo Plazo
- 205 : Hipotecario
- 206 : Consumo
- 207 : Automóvil
- 208 : Escolar (antes: PS)
- 209 : Traslado Hipotecario (antes: Especial 1)
- 210 : Salud (antes : Especial 2)
- 211 : Hipotecario Especial
- 212 : Largo Plazo Especial


