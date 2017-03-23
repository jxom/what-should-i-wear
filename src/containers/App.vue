<template>
  <div>
    <welcome
      v-show="!isDressing && !outfit"
      :onDressClient="handleDressClient"
    ></welcome>
    <dressing v-show="isDressing"></dressing>
    <outfit
      v-show="!isDressing && outfit"
      :outfit="outfit"
      :handleUndressClient="handleUndressClient"
    ></outfit>
  </div>
</template>

<script>
  import Welcome from './Welcome'
  import Dressing from '../components/Dressing'
  import Outfit from './Outfit'

  export default {
    components: {
      Welcome,
      Dressing,
      Outfit
    },
    name: 'app',
    data: () => ({ isDressing: false, outfit: null }),
    methods: {
      async handleDressClient ({ latitude, longitude }) {
        if (latitude && longitude) {
          const params = { lat: latitude, lng: longitude, getOutfitPrediction: true }
          this.isDressing = true
          const res = await this.$http.get('https://climate.now.sh', {
            params
          })
          this.isDressing = false
          this.outfit = res.body.outfitPrediction
        }
      },
      handleUndressClient () {
        this.outfit = null
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
    -webkit-font-smoothing: antialiased !important;
    font-family: "Lato", Helvetica, Arial, sans-serif !important;
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
