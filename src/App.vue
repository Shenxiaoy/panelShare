<template>
	<div id="app">
		<router-view></router-view>
	</div>

</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style>
	html body {
		width: 100%;
		height: 100%;
		background-color: #f5f6fa;
	}
	#app {
		width: 100%;
		height: 100%;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}

</style>
