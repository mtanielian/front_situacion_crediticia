<template>
    <div class="container">
	    <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div v-if='aDeudas'>
                    <h2>Consulta de información para el CUIT-CUIL-CDI {{cuit}}</h2>
                    <hr>
                    <p>
                        En el siguiente cuadro, el monto de deuda se encuentra expresado en miles de pesos 
                        con un decimal.
                    </p>
                    <br>
                    <table class="table table-bordered table-responsive">
                        <thead style=" background-color:#aecff0">
                            <tr>
                                <td width="37%">Denominación del deudor<sup>1</sup></td>
                                <td width="31%">Entidad<sup>2</sup></td>
                                <td width="9%">Periodo<sup>3</sup></td>
                                <td width="9%">Situación<sup>4</sup></td>
                                <td width="10%">Monto<sup>5</sup></td>
                                <td width="5%">Meses de atraso<sup>6</sup></td>
                                <td width="17%">Observaciones<sup>7</sup></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for='deuda in aDeudas' :key='deuda.id'>
                                <td>{{ setFullName(deuda.persona_fisica) }}</td>
                                <td>{{deuda.persona_juridica.razon_social}}</td>
                                <td>{{ setDatePay(deuda.detalle) }}</td>
                                <td>{{deuda.situacion.descripcion}}</td>
                                <td>{{deuda.monto_credito}}</td>
                                <td>{{deuda.cuotas_atrasadas}}</td>
                                <td>{{deuda.observaciones}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <h2>Consulta de información para el CUIT-CUIL-CDI {{cuit}}</h2>
                    <div class="alert alert-success">
                        <center><b>No existen deudas registradas para el CUIT-CUIL-CDI {{cuit}}</b></center>
                    </div>
                </div>
                <br><br>
                <button class="btn btn-link" v-on:click='goBack'>Volver</button>
                <button  class="btn btn-primary" v-if="aDeudas.length > 0" v-on:click='initReclaim'>Iniciar Reclamo</button>
            </div>
        </div>
        <div id="modalLoginMessage" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" style="color:red; text-align:center"> 
                            Aviso
                        </h4>        
                    </div>
                    <div class="modal-body">
                        <p>
                            Para poder iniciar tu reclamo, primero tenés que validar tu
                            DNI en la página de RENAPER
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" v-on:click='loginRenaper' class="btn btn-default" data-dismiss="modal">IR A RENAPER</button>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
const axios =  require('axios');
import Keycloak from 'keycloak-js'
import { constants } from '../constants'

let initOptions = {
  "realm": constants.RELAM,
  "url": constants.URL,
  "ssl-required": constants.SSL_REQUIRED,
  "clientId": constants.CLIENT_ID,
  "scope" : constants.SCOPE,
  "credentials": {
    "secret": constants.CREDENTIALS.SECRET,
  }
}

let keycloak = Keycloak(initOptions);

export default {
    props : ['cuit', 'verify'],
    mounted() {
        console.log(constants)
        let url = "";
        axios
            .post(constants.REST_CREDITO_SEARCH, {            
                cuil : this.cuit,
                verify : this.verify
            })
            .then((response) => { 
                console.log(response)
                if (response.data.data.length > 0) 
                    this.aDeudas = response.data.data;
        })
    },
    data() {
        return {
            aDeudas : ''
        }
    },
    methods : {
        setFullName(deuda) {
            let name = "";
            if (deuda.nombre)
                name += deuda.nombre;
            if (deuda.apellido)
                name += ' '+ deuda.apellido;
            
            if(deuda.apellido_nombre)
                name = deuda.apellido_nombre;

            return name;
        },
        setDatePay (deuda_detalle) {
            if (deuda_detalle.length > 0) {
                let date = deuda_detalle[deuda_detalle.length - 1].fecha_pago
                let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                let oDate = new Date(date)
                return months[oDate.getMonth()] + "/" + oDate.getFullYear()
            } else {
                return ""
            }
        },
        initReclaim() {
            $("#modalLoginMessage").modal("show");
        },
        loginRenaper() {    
            keycloak.init(
                { flow: constants.FLOW, onLoad: constants.ON_LOAD, checkLoginIframe: constants.CHECK_LOGIN_IFRAME }
            )
            .success(function(authenticated) {
                console.log(authenticated);
            }).error(function(e) {
                console.log(e);
            });

        },
        goBack() {
            this.$emit('goBack');
        }
    }
    
    
}
</script>