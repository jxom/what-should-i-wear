<template>
  <div>
    <div class="row text-center">
      <h3 :class="$style.title">You should wear</h3>
    </div>
    <div class="row text-center">
      <div v-if="predictedOutfit.head" :class="[$style.outfitItem, $style.hat, `col-md-3 col-sm-6`]">
        <div>
          <img :class="$style.outfitItemImage" :src="getOutfitItemImage(predictedOutfit.head)"  />
        </div>
        <div :class="$style.marginTop20">
          <div :class="$style.outfitItemText" v-html="humanizeOutfitItem(predictedOutfit.head)"></div>
        </div>
      </div>
      <div
        :class="[
          $style.outfitItem,
          $style.torso,
          `col-md-${predictedOutfit.head ? '3' : '4'}`,
          `col-sm-${predictedOutfit.head ? '6' : '12'}`
        ]"
      >
        <div>
          <img :class="$style.outfitItemImage" :src="getOutfitItemImage(predictedOutfit.torso)"  />
        </div>
        <div :class="$style.marginTop20">
          <div :class="$style.outfitItemText" v-html="humanizeOutfitItem(predictedOutfit.torso)"></div>
        </div>
      </div>
      <div :class="[$style.outfitItem, $style.pants, `col-md-${predictedOutfit.head ? '3' : '4'} col-sm-6`]">
        <div>
          <img :class="$style.outfitItemImage" :src="getOutfitItemImage(predictedOutfit.pants)"  />
        </div>
        <div :class="$style.marginTop20">
          <div :class="$style.outfitItemText" v-html="humanizeOutfitItem(predictedOutfit.pants)"></div>
        </div>
      </div>
      <div :class="[$style.outfitItem, $style.feet, `col-md-${predictedOutfit.head ? '3' : '4'} col-sm-6`]">
        <div>
          <img :class="$style.outfitItemImage" :src="getOutfitItemImage(predictedOutfit.feet)"  />
        </div>
        <div :class="$style.marginTop20">
          <div :class="$style.outfitItemText" v-html="humanizeOutfitItem(predictedOutfit.feet)"></div>
        </div>
      </div>
    </div>
    <div class="row text-center" :class="$style.paddingTop40">
      <button
        class="btn btn-lg btn-info"
        v-on:click="handleUndressClient()"
      >
        Dress me again in a different location!
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'outfit',
    props: {
      outfit: {
        type: Object
      },
      handleUndressClient: {
        type: Function
      }
    },
    computed: {
      predictedOutfit () {
        if (this.outfit) {
          return this.outfit
        }
        return {}
      }
    },
    methods: {
      humanizeOutfitItem (outfitItem) {
        if (!outfitItem) {
          return ''
        } else if (Array.isArray(outfitItem)) {
          let humanizedOutfitItem = []
          outfitItem.forEach((item, i) => {
            if (i === 0) {
              humanizedOutfitItem = [...humanizedOutfitItem, `<strong class="capitalize">${item.value}</strong>`]
            } else {
              humanizedOutfitItem = [...humanizedOutfitItem, `<strong>${item.value}</strong>`]
            }
            if (i !== outfitItem.length - 1) humanizedOutfitItem = [...humanizedOutfitItem, 'or']
          })
          return humanizedOutfitItem.join(' ')
        } else if (outfitItem.value.slice(-1) !== 's') {
          return `A <strong>${outfitItem.value}</strong>`
        }
        return `<strong class="capitalize">${outfitItem.value}</strong>`
      },
      getOutfitItemImage (outfitItem) {
        if (!outfitItem) {
          return ''
        } else if (Array.isArray(outfitItem)) {
          return outfitItem[0].image
        }
        return outfitItem.image
      }
    }
  }
</script>

<style>
.capitalize {
  text-transform:capitalize;
}
</style>

<style module>
  .title {
    margin-top: 30px !important;
    margin-bottom: 30px !important;
  }

  .outfitItem {
    height: 300px;
    padding: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .outfitItemText {
    font-weight: 200;
  }

  .outfitItemImage {
    width: 128px;
  }

  .hat {
    background-color: #3498db;
  }

  .torso {
    background-color: #2ecc71;
  }

  .pants {
    background-color: #f1c40f;
  }

  .feet {
    background-color: #e74c3c;
  }

  .marginTop20 {
    margin-top: 20px;
  }

  .paddingTop40 {
    padding-top: 40px;
  }
</style>
