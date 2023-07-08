# Stage 1: Build
FROM node:16-slim AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración del proyecto (angular.json, package.json, etc.)
COPY . .

# Instalar las dependencias necesarias y compilar la aplicación de Angular
RUN apt-get update && \
    apt-get install -y build-essential openssl libssl-dev libbz2-dev python3 libxml2 && \
    npm install && npm run build:prod

# Stage 2: Run
FROM node:16-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración del proyecto (angular.json, package.json, etc.)
COPY . .

# Copiar los archivos generados en el stage anterior
COPY --from=build /app/dist ./dist

RUN apt-get update && \
    apt-get install -y build-essential openssl libssl-dev libbz2-dev python3 libxml2

# Instalar las dependencias necesarias y compilar la aplicación de Angular
RUN npm ci --only=production

# Exponer el puerto en el que el servidor Express estará escuchando
EXPOSE 6001

# Definir el comando de inicio del servidor Express
CMD [ "npm", "start" ]