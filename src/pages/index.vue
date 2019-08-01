<template>
	<div>
		<div class="left">
			<RoomList></RoomList>
		</div>
		<div class="main">
			<p>
				<span>在线人数：{{mans}}, </span>
				<span>welcome <span style="color: darkorchid">{{username}}</span>~</span>
			</p>
			<Panel></Panel>
		</div>
	</div>
</template>

<script>
import Panel from '../components/template/panel'
import RoomList from '../components/template/roomList'
import {mapState} from 'vuex'
import {getCookie} from '../utils/utils'

export default {
  name: "index",
  components: {
	Panel,
	RoomList
  },
  data () {
	return {
	}
  },
  mounted () {

  },
  methods: {},
  computed: mapState({
	username: state => state.username ? state.username : getCookie('username') ? decodeURIComponent(getCookie('username')) : '',
	mans: 'mans'
  })
}
</script>

<style scoped>
	.main {
		position: absolute;
		left: 180px;
		top: 50px;
	}
	.left {
		position: absolute;
		left: 10px;
		top: 120px;
	}
</style>