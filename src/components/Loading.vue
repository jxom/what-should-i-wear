<template>
  <div class="wrapper">
    <div class="row text-center">
      <img v-bind:src="hanger" />
    </div>
    <div class="row text-center" :class="$style.marginTop20">
      <h5>Getting your clothes out the wardrobe...</h5>
    </div>
  </div>
</template>

<script>
  import hanger from './hanger.png'
  export default {
    name: 'loading',
    data: () => ({ hanger })
  }
</script>

<style module>
  .marginTop20 {
    margin-top: 20px !important;
  }
</style>
