<template>
    <div class="container">
        <div class="row">
	<br><br>    
            <div class="col-md-8 col-md-offset-2">
                <div class="clearfix pagina-interior">
                    <h2>Central de Deudores</h2>
		<hr>
                    <p class="post-pagina-interior">
                        Obtené aquí un informe consolidado por clave de identificación fiscal (CUIT, CUIL o CDI) respecto de financiaciones otorgadas por entidades financieras, fideicomisos financieros, entidades no financieras emisoras de tarjetas de crédito / compra y otros proveedores no financieros de créditos y, además, cheques rechazados.
                    </p>
                    <p class="post-pagina-interior">
                        La información disponible en esta consulta es suministrada por las entidades. 
                        Su difusión no implica conformidad por parte de este Banco Central.
                    </p>
                    <br>	
                    <table>
                        <tbody>
                             <tr>
                                <td>
                                    <input type="text" v-model="cuit"
                                        placeholder="Ingresá el DNI/CUIT/CUIL a consultar"
                                        maxlength="11"
                                        class="form-control"
                                        v-on:keyup.enter='getDataByCUIT'
                                        oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                                    >
                                    <div class="form-group" v-if="error_cuil" style="margin-bottom:0px !important">
                                        <small class="text-danger" style="font-weight:bold">
                                            DNI/CUIT/CUIL Inválido.
                                        </small>      
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <vue-recaptcha 
                                        style=" margin-top:20px"
                                        @verify="markRecaptchaAsVerified"
                                        :loadRecaptchaScript="true"
                                        :sitekey="this.recaptcha_key"
                                        data-callback="test"
                                    ></vue-recaptcha>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="hidden" name="Action" value="Go">
                                    <br>
                                    <button type="button" v-on:click="getDataByCUIT" class="btn btn-primary">Consultar</button>
                                    <br>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
      	</div>
    </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import { constants } from '../constants'

export default {
    components: { VueRecaptcha },
    methods : {
        markRecaptchaAsVerified(response) {
            console.log(response);
            this.verify = response;
            this.recaptchaVerify = true;
        },
        validCuit() {
            if (this.cuit.length < 7 || this.cuit.length > 11) {
                return false;
            } 

            return true;
        },
        getDataByCUIT() {
            if(this.cuit && this.validCuit()) {
                this.error_cuil = false;
                if(this.recaptchaVerify) {                    
                    this.$emit('showDebts', {cuit : this.cuit, verify : this.verify});
                }
            } else {
                this.error_cuil = true;
            }
        }
    },
    data() {
        return {
            recaptcha_key : constants.RECAPTCHA_SITE_KEY,
            recaptchaVerify : '',
            verify : '',
            cuit: '',
            error_cuil : false
        }
    }
}
</script>
