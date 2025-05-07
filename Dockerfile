# Usar Node.js como imagen base
FROM node:20-slim

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Crear directorio dist/public si no existe
RUN mkdir -p dist/public

# Copiar archivos estáticos a dist/public
RUN cp -r public/* dist/public/

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/app.js"]