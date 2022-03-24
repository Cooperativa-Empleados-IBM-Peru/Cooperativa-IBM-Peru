# Cooperativa IBM Perú - Carga data

Java program to upload the data of Cooperativa to DB2 in Cloud

## Parameters
Se aceptan los siguientes parámetros :  
    **cargasocios** : Esta opción cargará el file de socios a la bd  
    **cargadata**   : Esta opción cargará los files de datos de la cuentas de los socios a la bd  
    **getfiles**    : Esta opción traerá los files de datos via sftp del server Domino  
    **help**        : Muestra esta información de ayuda  
    
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

## Properties
El file *resources/coopeibm.properties* contiene la siguiente información. Debe actualizarse la ubicación de los files segun sea necesario.  

coope.environment=dev / test / prod  
coope.support=cooperat@pe.ibm.com  

coopesftp.server=*sftp server hostname*  
coopesftp.user=*sftp user*  
coopesftp.clave=*sftp password*  
coopesftp.path=*/home/coope/*  

coopetxt.country=815  
coopetxt.path=*local path for files ex : /mnt/c/code/filescoope/*  
coopetxt.socios=coope-socios.csv  
coopetxt.admins=coope-admins.txt  
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

## Credenciales
El file *resources/env.json* son las credenciales para conectarse al db2. Este file se obtiene del servicio db2 on cloud de la aplicación.

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
- 208 : PS
- 209 : Especial 1
- 210 : Especial 2

# Compilación del .jar
mvn dependency:copy-dependencies
