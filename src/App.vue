<template>
  <div>
    <component 
      v-bind:is="component" 
      v-on:showDebts='showDebts($event)'
      v-on:goBack='goBack'
      :user="user"
      :cuit="cuit"
      :verify="verify"
      :jwt="jwt"
    ></component>
  </div>
</template>

<script>
import Home from './components/home'
import ListDeudas from './components/list-deudas.vue'
import FormReclamo from './components/form-reclamos'
import VueJwtDecode from 'vue-jwt-decode'

const axios = require('axios');

export default {
  components : {Home, ListDeudas, FormReclamo},
  created() {
    if (document.location.href.includes('access_token')) {
      this.jwt = this.getUrlVars()["access_token"];
      this.user = VueJwtDecode.decode(this.jwt);

      this.component = 'FormReclamo'
    }
  },
  methods : {
    getUrlVars() {
      let vars = {};
      let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, 
        function(m,key,value) {
          vars[key] = value;
      });

      return vars;
    },
    showDebts(e) {
      console.log(e)
      this.cuit = e.cuit
      this.verify = e.verify
      this.component = 'ListDeudas'
    },
    goBack() {
      this.component = 'Home'
    }
  },
  data() {
    return {
      component : 'Home',
      cuit : '',
      verify : '',
      user : '',
      jwt : ''
    }
  }
}
</script>
