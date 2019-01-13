<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
	name: 'app',
	components: {},
	data() {
	  return {}
	},
	created() {
	  console.log('app created')
	},
	methods: {},
	computed: {},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .app {
    height: 100%;
  }
</style>
