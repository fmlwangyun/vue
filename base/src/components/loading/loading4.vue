<template>
  <div ref="loading" class="loading_4" v-if="loading">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {

    }
  }

</script>

<style lang="less" scoped="scoped">


</style>
