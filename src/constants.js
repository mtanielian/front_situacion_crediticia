export const constants = Object.freeze({
    // Datos provenidos por PAEC - https://autenticar.gob.ar
    RELAM : '',
    URL : '',
    SSL_REQUIRED : '',
    CLIENT_ID : '',
    SCOPE : '',
    CREDENTIALS : {
      SECRET : ''
    },
    FLOW : '',
    ON_LOAD : '',
    CHECK_LOGIN_IFRAME : '',

    //wS - REST al backend de Symfony
    REST_CREDITO_SEARCH : "[agregar_host]/api/public/credito/search",
    REST_CREDITO_SEARCH_CUIL : "[agregar_host]/api/public/credito/search/cuil",
    REST_SAVE_RECLAMO : "[agregar_host]/api/public/reclamos",

    //Recaptcha V2 - https://www.google.com/recaptcha/admin?hl=es Crear el key (habilitar los host necesarios)
    RECAPTCHA_SITE_KEY : '6LeeLbkUAAAAADNXknzO1cuw9paFaPXYUP4Jemo9'
});
