<template>
	<div>
		<el-card class="box-card">
			<div class="card-content-list">
				<p><a @click="joinRoom('world')" :style="style('world')">世界之窗</a></p>
				<p><a @click="joinRoom('bj')" :style="style('bj')">bei jing</a></p>
			</div>
		</el-card>
	</div>
</template>

<script>
import {Card} from 'element-ui'
import {mapMutations} from 'vuex'
import event from './main'

export default {
  name: "room-list",
  components: {
	[Card.name]: Card
  },
  data () {
	return {
	  roomName: '',
	}
  },
  computed: {

  },
  methods: {
	style (type) {
	  return {
	    color: this.roomName === type ? 'slateblue' : '',
	    'text-shadow': this.roomName === type ? '0 0 1px red' : ''
	  }
	},
	joinRoom (name) {
	  event.$emit('ok', {ok: 1})
	  this.roomName = name
	  this.setRoom(name)
	},
	...mapMutations([
		'setRoom'
	]
	)
  }
}
</script>

<style scoped>
	.box-card {
		width: 130px;
	}
	.card-content-list a:hover {
		cursor: pointer;
		color: slateblue;
		/*text-shadow: 0 0 1px red;*/
	}
</style>