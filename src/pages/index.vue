<template>
	<div>
		<div class="main">
			<p>在线人数：{{mans}}</p>
			<Panel>
				3333
			</Panel>
		</div>
	</div>
</template>

<script>
import Panel from '../components/template/panel'
// import io from 'socket.io-client'
// const socket = io('http://localhost:3003')
import socket from './ioRequest'

export default {
  name: "index",
  components: {
    Panel
  },
  data () {
    return {
      mans: '', // 在线人数
	}
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped>
.main {
	margin-left: 200px;
	margin-top: 60px;
}
</style>