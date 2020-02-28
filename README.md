### DEMO
- url https://demo-microcreditos.paisdigital.modernizacion.gob.ar/public/

### USUARIO DE PRUEBA
20258663552

## Build Setup

### Requerimientos Técnicos 	

||SOFTWARE|
|---|------|
||Linux|
|Servidor Web| Node JS > 10.X.X 
|Herramientas adicionales| NPM > 6 
|Base de datos| -
|Lenguaje|Java Script - VUEJS (VueCLI) 

### Instalación

1. Descargar/Clonar el código de la aplicación

Es necesario contar con los datos de conexión a [PAEC](https://autenticar.gob.ar) para poder activar la verificacion de personas en caso de querer generar un reclamo sobre la información que se muestra.

El backend debe estar funcionando, los datos se consumen de una API REST que provee el backend.

Por último, es necesario configurar una cuenta de [Google Recaptcha v2](https://developers.google.com/recaptcha/intro) para evitar spam/flood de pedidos y confirmar que el pedido a la API REST viene desde un origen autorizado.


3. Para proceder con la instalación, el servidor debe contar con [npm](https://nodejs.org/en/) 

Ubicados en donde se encuentra el proyecto, ejecutar:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

