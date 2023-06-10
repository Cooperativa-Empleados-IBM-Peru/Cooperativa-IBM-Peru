# Establecer la imagen base de Node.js para construir la aplicación de Angular
FROM node:16-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración del proyecto (angular.json, package.json, etc.)
COPY . .

RUN apt-get update && \
    apt-get install -y build-essential openssl libssl-dev libbz2-dev python3 libxml2

# Instalar las dependencias
RUN npm install
# Compilar la aplicación de Angular
RUN npm run build

# Exponer el puerto en el que el servidor Express estará escuchando
EXPOSE 6001

# Definir el comando de inicio del servidor Express
CMD [ "npm", "start" ]