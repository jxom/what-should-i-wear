<template>
  <div class="wrapper">
    <div class="row text-center">
      <img v-bind:src="shirt" />
    </div>
    <div class="row text-center">
      <div class="col-xs-12">
        <h1 :class="$style.header">What should I wear today?</h1>
      </div>
    </div>
    <div class="row text-center" :class="$style.marginTop20">
      <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4">
        <div class="form-group">
          <google-autocomplete
            id="where"
            classname="form-control"
            placeholder="Where are you?"
            :class="$style.input"
            v-on:placechanged="handleReceivePlaceData"
            v-model="placeInput"
          ></google-autocomplete>
        </div>
      </div>
    </div>
    <div v-if="placeData && placeInput" class="row text-center">
      <div class="row text-center" :class="$style.marginTop20">
        <button
          class="btn btn-lg btn-info"
          v-on:click="handleDressClient()"
          :class="$style.button"
        >
          Dress me
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import GoogleAutocomplete from '@/components/GoogleAutocomplete'
  import shirt from './shirt.png'
  export default {
    name: 'welcome',
    components: {
      GoogleAutocomplete
    },
    props: {
      onDressClient: {
        type: Function,
        required: true
      }
    },
    data: () => ({ shirt, placeData: null, placeInput: '' }),
    methods: {
      handleDressClient() {
        this.onDressClient(this.placeData)
      },
      handleReceivePlaceData(placeData) {
        this.placeData = placeData
      }
    }
  }
</script>

<style module>
  .header {
    color: #84dbff;
    font-size: 70px;
    font-weight: 700;
  }

  .marginTop20 {
    margin-top: 20px;
  }

  .input {
    height: inherit;
    padding: 10px;
    font-size: 15px;
  }

  .button {
    padding: 15px 40px !important;
  }
</style>
