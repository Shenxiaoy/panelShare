<template>
	<div>
		<div class="main">
			<p>
				<!--<span>在线人数：{{mans}}</span>-->
				<span>welcome <span style="color: darkorchid">{{username}}</span>~</span>
			</p>
			<Panel>
				3333
			</Panel>
		</div>
	</div>
</template>

<script>
import Panel from '../components/template/panel'
import {mapState} from 'vuex'
import {getCookie} from '../utils/utils'

export default {
  name: "index",
  components: {
    Panel
  },
  data () {
    return {
      mans: '', // 在线人数
	  username: decodeURIComponent(getCookie('username'))
	}
  },
  mounted () {

  },
  methods: {

  },
  computed: mapState({

  })
}
</script>

<style scoped>
.main {
	margin-left: 200px;
	margin-top: 60px;
}
</style>