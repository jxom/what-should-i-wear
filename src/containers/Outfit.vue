<template>
  <div class="wrapper">
    <div class="row text-center">
      You should wear {{ outfit }}. :)
    </div>
  </div>
</template>

<script>
  export default {
    name: 'outfit',
    props: {
      outfit: {
        type: String
      }
    }
  }
</script>
