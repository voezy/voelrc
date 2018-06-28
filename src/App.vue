<template>
  <div id="app">
    <appHeader></appHeader>
    <appMain></appMain>
  </div>
</template>

<script>
import appHeader from './components/header.vue'
import appMain from './components/main.vue'

export default {
  data () {
    return {}
  },
  components: {
    appHeader,
    appMain
  }
}
</script>

<style lang="less" scoped>

</style>
