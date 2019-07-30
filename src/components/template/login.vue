<template>
	<div>
		<el-dialog
				title="请输入登录昵称"
				:visible.sync="visible"
				:close-on-click-modal="false"
		>
			<el-input v-model="username" @keyup.enter.native="submit"></el-input>

		</el-dialog>
	</div>
</template>

<script>
import {Dialog, Input} from 'element-ui'
import {getCookie, setCookie} from '../../utils/utils'
import {mapMutations} from 'vuex'
export default {
  name: 'login',
  components: {
    [Dialog.name]: Dialog,
	[Input.name]: Input
  },
  data () {
    return {
      visible: false,
	  username: ''
	}
  },
  mounted () {
    const name = getCookie('username')
	if (name) {
      this.visible = false
	  this.username = name
	} else {
      this.visible = true
	}

  },
  methods: {
	submit () {
	  const name = this.username
	  if (!name) return
	  setCookie('username', name)
	  this.visible = false
	  this.username = name
	  this.addName(this.userName)
	},
	...mapMutations([
	  'addName'
	])
  }
}
</script>

<style scoped>

</style>