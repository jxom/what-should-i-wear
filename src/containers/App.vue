<template>
  <div>
    <welcome
      v-if="!isDressing && !outfit"
      :onDressClient="handleDressClient"
    ></welcome>
    <loading v-if="isDressing"></loading>
    <outfit v-if="!isDressing && outfit" :outfit="outfit"></outfit>
  </div>
</template>

<script>
  import Welcome from './Welcome'
  import Loading from '../components/Loading'
  import Outfit from './Outfit'

  export default {
    components: {
      Welcome,
      Loading,
      Outfit,
    },
    name: 'app',
    data: () => ({ isDressing: false, outfit: null }),
    methods: {
      async handleDressClient({ latitude, longitude }) {
        if (latitude && longitude) {
          const params = { lat: latitude, lng: longitude }
          this.isDressing = true
          const res = await this.$http.get('https://climate.now.sh', {
            params,
          })
          this.isDressing = false
          this.outfit = 'clothes'
        }
      }
    }
  }
</script>

<style>
  html, body, #app {
    height: 100%;
    width: 100%;
  }
  body {
    background-color: #f9f9f9;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif !important;
    -webkit-font-smoothing: antialiased !important;
  }
  * {
    box-sizing: border-box;
  }
  .wrapper {
    background-color: #f9f9f9;
    height: 100%;
    margin-top: 50px;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>

<style module>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
