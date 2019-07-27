<template>
	<div class="panel-wraper">
		<div class="panel-main" ref="panel">
			<div v-for="item in msgList" class="panel-row-msg">
				<span class="panel-head"><i class="el-icon-key"></i></span>
				<span class="panel-msg-content">{{item.msg}}</span>
			</div>
		</div>

		<div class="panel-footer-input">
			<div class="panel-footer-title">
				<i class="el-icon-picture"></i>
				<i class="el-icon-files"></i>
			</div>
			<el-input v-model="message" @keyup.enter.native="handleEnter"></el-input>
		</div>
	</div>
</template>

<script>
import {Input, Icon} from 'element-ui'
export default {
  name: "panel",
  components: {
    [Input.name]: Input,
	[Icon.name]: Icon
  },
  data () {
    return {
	  message: '',
	  msgList: []
	}
  },
  methods: {
	handleEnter () {
	  if (!this.message) return
	  const publishDate = +new Date()
	  this.msgList.push({id: 'slef', name: '小小鱼', msg: this.message})
	  this.message = ''
	  console.log(this.$refs.panel.scrollTop, this.$refs.panel.scrollHeight, 'lll')
	  this.$refs.panel.scrollTop = this.$refs.panel.scrollHeight
	}
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
	}
	.panel-head {
		width: 20px;
		height: 20px;
		margin-right: 7px;
		font-size: 20px;
	}
	.panel-msg-content {
		max-width: 50%;
		background: #ffffff;
		padding: 10px;
		border-radius: 2px;

	}

</style>