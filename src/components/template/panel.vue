<template>
	<div class="panel-wraper">
		<div class="panel-main" ref="panel">
			<div v-for="item in msgList">
				<div >
					<div v-if="item.name === username" style="justify-content: flex-end" class="panel-row-msg">
						<span class="panel-msg-content" style="background-color: #9EEA6A" >{{item.msg}}</span>
						<span class="panel-head"><img :src="item.url ? item.url : headImg1" alt=""></span>
					</div>
					<div v-else style="justify-content: flex-start" class="panel-row-msg">
						<el-tooltip :content="item.name" placement="left" effect="light">
							<span class="panel-head"><img :src="item.url ? item.url : headImg2" alt=""></span>
						</el-tooltip>
						<span class="panel-msg-content">{{item.msg}}</span>

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
import {Input, Icon, Tooltip} from 'element-ui'
import Login from './login'
import socket from '../../pages/ioRequest'
import {mapState} from 'vuex'
import {getCookie} from '../../utils/utils'
import event from './main'

export default {
  name: "panel",
  components: {
    [Input.name]: Input,
	[Icon.name]: Icon,
	Login,
	[Tooltip.name]: Tooltip
  },
  data () {
    return {
	  message: '',
	  msgList: [],
	  // room: 'world',
	  headImg1: require('../../assets/head/1.png'),
	  headImg2: require('../../assets/head/2.png'),
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
	},
	/*
	* 进入房间消息初始化
	* **/
	joinRoomSocketInit () {
	  const _this = this
	  this.msgList = []
	  // 加入聊天室 默认房间为world
	  socket.emit('joinRoom', {room: this.room, username: this.username})

	  // 初始化消息列表、在线统计人数
	  socket.on('joinRoom', function (data) {
		_this.$store.commit('getMans', data.onlineUsers)
		_this.msgList = data.initMsgs
		_this.scrollBottom()
	  })

	  // 实际在线人数更新
	  socket.on('onlineUsers', function (data) {
		_this.$store.commit('getMans', data.onlineUsers)
	  })

	}

  },

  mounted () {
    const _this = this
	event.$on('ok', function (data) {
	  _this.joinRoomSocketInit()
	})

	  this.joinRoomSocketInit()
	  // 同一个房间广播接受消息
	  socket.on('receiveMsg', function (data) {
		console.log(data, '-------------------')
		if (data.room !== _this.room) {
		  return
		}
		_this.msgList.push(data)
		_this.scrollBottom()
	  })

  },
  computed: mapState({
	username: state => state.username ? state.username : getCookie('username') ? decodeURIComponent(getCookie('username')) : '',
	room: 'room'
  })

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
		/*border: 1px solid darkorchid;*/
		overflow: hidden;
	}
	.panel-head img {
		display: inline-block;
		width: 30px;
		height: 30px;

	}
	.panel-msg-content {
		max-width: 50%;
		background: #ffffff;
		padding: 10px;
		border-radius: 2px;

	}

</style>