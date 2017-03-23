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
        <div v-show="isFetchingLocationPermissions">
          <loading-icon></loading-icon>
          Finding where you live... #stalker
        </div>
        <div class="form-group" v-show="!isFetchingLocationPermissions">
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
    <div :class="$style.marginTop50" class="row text-center">
      Made with no 👖 on by <a href="https://github.com/jxom" target="_blank">Jake Moxey</a>
    </div>
  </div>
</template>

<script>
  import GoogleAutocomplete from '@/components/GoogleAutocomplete'
  import LoadingIcon from '@/components/LoadingIcon'
  import shirt from './shirt.png'

  export default {
    name: 'welcome',
    components: {
      GoogleAutocomplete,
      LoadingIcon,
    },
    props: {
      onDressClient: {
        type: Function,
        required: true
      }
    },
    data: () => ({
      shirt,
      placeData: null,
      placeInput: '',
      isFetchingLocationPermissions: true,
    }),
    mounted() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
          this.isFetchingLocationPermissions = false;
          if (latitude && longitude) {
            const params = {
              latlng: `${latitude},${longitude}`,
              key: 'AIzaSyCZw6cBCELkfCluoErvZetAYA92upRWUWo',
            }
            const res = await this.$http.get('https://maps.googleapis.com/maps/api/geocode/json', { params })
            this.placeData = { latitude, longitude }
            this.placeInput = res.body.results[0].formatted_address
          }
        }, () => {
          this.isFetchingLocationPermissions = false
        })
      } else {
        this.isFetchingLocationPermissions = false
      }
    },
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

  @media screen and (max-width: 768px) {
    .header {
      font-size: 30px;
    }
  }

  .marginTop20 {
    margin-top: 20px;
  }

  .marginTop50 {
    margin-top: 50px;
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
