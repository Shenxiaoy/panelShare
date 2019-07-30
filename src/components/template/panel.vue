<template>
	<div class="panel-wraper">
		<div class="panel-main" ref="panel">
			<div v-for="item in msgList">
				<div >
					<div v-if="item.name === username" style="justify-content: flex-end" class="panel-row-msg">

						<span class="panel-msg-content" >{{item.msg}}</span>
						<span class="panel-head"><i class="el-icon-key"></i></span>
					</div>
					<div v-else style="justify-content: flex-start" class="panel-row-msg">
						<span class="panel-head"><i class="el-icon-key"></i></span>
						<span class="panel-msg-content" >{{item.msg}}</span>

					</div>
				</div>
			</div>
		</div>

		<div class="panel-footer-input">
			<div class="panel-footer-title">
				<i class="el-icon-picture"></i>
				<i class="el-icon-files"></i>
			</div>
			<el-input v-model="message" @keyup.enter.native="handleEnter"></el-input>
		</div>
		<Login></Login>
	</div>
</template>

<script>
import {Input, Icon} from 'element-ui'
import Login from './login'
import socket from '../../pages/ioRequest'
import {mapState} from 'vuex'
import {getCookie} from '../../utils/utils'

export default {
  name: "panel",
  components: {
    [Input.name]: Input,
	[Icon.name]: Icon,
	Login
  },
  data () {
    return {
	  message: '',
	  msgList: [],
	  room: 'world',
	  username: decodeURIComponent(getCookie('username'))
	}
  },
  methods: {
	handleEnter () {
	  if (!this.message) return
	  const username = decodeURIComponent(getCookie('username'))
	  const selfMsg = {msg: this.message, name: username, room: this.room}
	  socket.emit('sendMsg', selfMsg)
	  this.msgList.push(selfMsg)
	  this.message = ''
	  this.scrollBottom()
	},

	scrollBottom () {
	  const _this = this
	  setTimeout(function () {
		_this.$refs.panel.scrollTop = _this.$refs.panel.scrollHeight
	  }, 0)
	}
  },
  mounted () {
    if (this.room) {

	  const _this = this
	  socket.emit('onlineUsers', {interimName: 'sxy'})
	  socket.emit('joinRoom', {roomName: this.room})

	  socket.on('joinRoom', function (data) {
	    _this.msgList = data.initMsgs
		_this.scrollBottom()
	  })
      socket.on('receiveMsg', function (data) {
		_this.msgList.push(data)
		_this.scrollBottom()
	  })
	}
  },
  computed: {
	// username () {
     //  return decodeURIComponent(getCookie('username'))
	// }
  }

}
</script>

<style scoped>
	.panel-wraper {
		width: 800px;
		height: 600px;
		border: 1px solid #F4F4F4;
		border-radius: 4px;
		position: relative;
		background: #F4F4F4;
	}

	.panel-main {
		padding: 10px;
		height: 500px;
		overflow: auto;
	}

	.panel-footer-title {
		width: 100%;
		height: 30px;
		padding: 5px;
		font-size: 22px;
	}

	.panel-footer-input {
		width: 100%;
		height: 80px;
		position: absolute;
		bottom: 0px;
		background: #ffffff;
	}

	.panel-row-msg {
		margin-top: 10px;
		display: flex;
		align-items: flex-start;
	}
	.panel-row-msg span {
		display: inline-block;
		margin-left: 8px;
	}
	.panel-head {
		width: 30px;
		height: 30px;
		font-size: 30px;
		border-radius: 50%;
		border: 1px solid darkorchid;
	}
	.panel-msg-content {
		max-width: 50%;
		background: #ffffff;
		padding: 10px;
		border-radius: 2px;

	}

</style>