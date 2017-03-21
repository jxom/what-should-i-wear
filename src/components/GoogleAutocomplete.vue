<template>
  <input
    :class="classname"
    :id="id"
    :placeholder="placeholder"
    :value="value"
    v-on:input="update($event.target.value)"
  />
</template>

<script>
  export default {
    name: 'VueGoogleAutocomplete',
    props: {
      id: {
        type: String,
        required: true
      },
      classname: String,
      placeholder: {
        type: String,
        default: 'Start typing'
      },
      value: {
        type: String,
      }
    },
    data: () => ({ autocomplete: null }),
    mounted() {
      this.autocomplete = new google.maps.places.Autocomplete(
        document.getElementById(this.id)
      );
      this.autocomplete.addListener('place_changed', () => {
        let place = this.autocomplete.getPlace();
        let addressComponents = {
          street_number: 'short_name',
          route: 'long_name',
          locality: 'long_name',
          administrative_area_level_1: 'short_name',
          country: 'long_name',
          postal_code: 'short_name'
        };
        let returnData = {};
        if (place.address_components !== undefined) {
          // Get each component of the address from the place details
          for (let i = 0; i < place.address_components.length; i++) {
            let addressType = place.address_components[i].types[0];
            if (addressComponents[addressType]) {
              let val = place.address_components[i][addressComponents[addressType]];
                  returnData[addressType] = val;
            }
          }
          returnData['latitude'] = place.geometry.location.lat();
          returnData['longitude'] = place.geometry.location.lng();
          // return returnData object and PlaceResult object
          this.$emit('placechanged', returnData, this.autocomplete.getPlace());
        }
      });
    },
    methods: {
      update(val) {
        this.$emit('placechanged', null)
        this.$emit('input', val)
      }
    }
  }
</script>

<style>
  .pac-icon {
    display: none;
  }
  .pac-item {
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-family: "Lato", Helvetica, Arial, sans-serif !important;
  }
</style>
