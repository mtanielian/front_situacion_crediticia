<template>
    <div class="container">
	<div class="row">
	<div class="col-md-8 col-md-offset-2">
	    <br>
 	    <h2>Iniciar reclamo</h2>
        <hr>
        <div class="alert alert-info" role="alert" style="margin-top:20px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        </div>         
        <div 
            class="col-md-12 alert alert-info" 
            style="display: block; overflow: auto; margin-top: 20px; font-size: 16px"
        >
            <div class="col-md-12 col-xs-12 text-uppercase">
                <strong>{{this.user.family_name}} {{this.user.given_name}}</strong> - 
                <span>CUIL <strong>{{this.user.cuit}}</strong></span>
            </div>  
        </div>
        <div class="col-md-12 alert">
            <table class="table table-bordered table-responsive">
                <thead style=" background-color:#aecff0">
                    <tr>
                        <td width="31%">Entidad<sup>2</sup></td>
                        <td width="9%">Periodo<sup>3</sup></td>
                        <td width="9%">Situación<sup>4</sup></td>
                        <td width="10%">Monto<sup>5</sup></td>
                        <td width="5%">Meses de atraso<sup>6</sup></td>
                        <td width="17%">Observaciones<sup>7</sup></td>
                        <td width="17%">Reclamar</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='deuda in aDeudas' :key='deuda.id'>
                        <td>{{deuda.persona_juridica.razon_social}}</td>
                        <td>{{ setDatePay(deuda.detalle) }}</td>
                        <td>{{deuda.situacion.descripcion}}</td>
                        <td>{{deuda.monto_credito}}</td>
                        <td>{{deuda.cuotas_atrasadas}}</td>
                        <td>{{deuda.observaciones}}</td>
                        <td><input type="checkbox" v-model="reclamo.id" :value="deuda.id" ></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-12">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" v-model="reclamo.email" >
                <div class="form-group" v-if="errors.reclamo_email">
                    <small class="text-danger">
                        {{errors.msg.reclamo_email}}
                    </small>      
                </div>
            </div>
            <div class="form-group col-md-12 row">
                <label for="cod_area" style="display: block">Teléfono:</label>
                <div class="inputGroupContainer">
                    <div class="input-group col-md-2 col-sm-5 col-xs-5" style="float:left;padding: initial;display: table;padding-right: 10px;">
                        <input v-model="reclamo.cod_area" placeholder="Cód. Area" class="form-control col-md-5 col-sm-3" value="" type="text" maxlength="5" oninput="this.value=this.value.replace(/[^0-9]/g,'');">
                    </div>
                    <div class="input-group col-md-3 col-sm-6 col-xs-6" style="padding-left: 5px;">
                        <input v-model="reclamo.numero" style="border-radius: 0px 6px 6px 0px;" placeholder="Número" class="form-control col-md-7 col-sm-9" value="" type="text" maxlength="8" oninput="this.value=this.value.replace(/[^0-9]/g,'');">
                    </div>
                </div>
                <div class="form-group" v-if="errors.reclamo_telefono">
                    <small class="text-danger">
                       {{errors.msg.reclamo_telefono}}
                    </small>      
                </div>
            </div>
            <div class="form-group">
                <label for="reclamoTipo">Tipo de reclamo:</label>
                <select class="form-control" v-model="reclamo.tipo">
                    <option value=""></option>
                    <option value="1">Monto Icorrecto</option>
                    <option value="2">Entidad Incorrecta</option>
                    <option value="3">Datos Incorrectos</option>
                </select>
                <div class="form-group" v-if="errors.reclamo_tipo">
                    <small class="text-danger">
                        Se debe especificar un tipo de reclamo.
                    </small>      
                </div>

            </div>
            <div class="form-group">
                <label for="reclamoDescripcion">Breve descripcion de su reclamo:</label>
                <textarea style="height:190px" class="form-control" v-model="reclamo.descripcion">
                </textarea>
                <div class="form-group" v-if="errors.reclamo_descripcion">
                    <small class="text-danger">
                        El campo descripción es obligatorio.
                    </small>      
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <button class="btn btn-link" v-on:click='goBack'>Cancelar Reclamo</button>
		<button class="btn btn-success" v-on:click='sendReclamo'>Enviar Reclamo</button>
        </div>
    </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import { constants } from '../constants'

export default {
    props : ['user', 'jwt'],
    mounted(){
        axios
        .post(constants.REST_CREDITO_SEARCH_CUIL, {            
            cuil : this.user.cuit,           
        })
        .then((response) => { 
            if (response.data.data.length > 0) 
                this.aDeudas = response.data.data;
            
        })
    },
    methods : {
        setDatePay (deuda_detalle) {
            
            let date = deuda_detalle[deuda_detalle.length - 1].fecha_pago
            let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
            let oDate = new Date(date)
            return months[oDate.getMonth()] + "/" + oDate.getFullYear()

        },
        goBack() {
            document.location.href = ""
        },
        validEmail(email) {
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        sendReclamo() {
            let error = false;
            this.errors.reclamo_email = false;
            this.errors.reclamo_telefono = false;
            this.errors.reclamo_tipo = false;
            this.errors.reclamo_descripcion = false;
            
            if (this.reclamo.email == '') {
                error = true;
                this.errors.reclamo_email = true;
                this.errors.msg.reclamo_email = " El Email es obligatorio.";
            } else if (!this.validEmail(this.reclamo.email)) {
                error = true;
                this.errors.reclamo_email = true;
                this.errors.msg.reclamo_email = " El Email ingresado es inválido.";
            }

            if (this.reclamo.cod_area == '' || this.reclamo.numero == '') {
                error = true;
                this.errors.reclamo_telefono = true;
                this.errors.msg.reclamo_telefono = " El teléfono es obligatorio.";
            } else if ((this.reclamo.cod_area + this.reclamo.numero).length != 10) {
                error = true;
                this.errors.reclamo_telefono = true;
                this.errors.msg.reclamo_telefono = " El teléfono ingresado es inválido..";
            }

            if (this.reclamo.tipo == '') {
                error = true;
                this.errors.reclamo_tipo = true;
            }

            if (this.reclamo.descripcion == '') {
                error = true;
                this.errors.reclamo_descripcion = true;
            }

            if(!error) {
                if (this.reclamo.id.length == 0) {
                    alert(`
                        Para poder iniciar el reclamo, 
                        se debe seleccionar al menos una deuda del listado de deudas`
                    )
                } else {
                
                    axios
                    .post(constants.REST_SAVE_RECLAMO, {            
                        jwt : this.jwt,
                        reclamo : this.reclamo
                    })
                    .then((response) => { 
                        console.log(response)               
                    })
                    
                }
            }
        }
    },
    data () {
        return {
            aDeudas : [],
            errors : {
                reclamo_email : false,
                reclamo_telefono : false,
                reclamo_tipo : false,
                reclamo_descripcion : false,
                msg : {
                    reclamo_email : '',
                    reclamo_telefono : '',
                }
            },
            reclamo : {
                email : '',
                cod_area : '',
                numero : '',
                tipo : '',
                descripcion : '',
                id : []
            }
        }
    }
}
</script>