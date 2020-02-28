## Servidores
- VPN __webmuni__
- ip privada: __172.16.158.198__
- ip pública: __186.33.219.133__
- Accesos usuarios acoconier/halvarado/jdocile/mtanielian/pchacon

### DEMO
- url https://demo-microcreditos.paisdigital.modernizacion.gob.ar/public/
- repositorio: https://repositorio.paisdigital.modernizacion.gob.ar/desarrolloPD/micro-creditos/situacion-crediticia
- git pull en `/var/www/html/situacion-crediticia`
- Compilar `npm run build`

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

2. Cambiar los datos de configuración en el archivo:

    - /src/constants.js.dist

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

