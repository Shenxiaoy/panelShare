<template>
	<div>
		<p class="slot-title">slot</p>
		<slot name="sxy" v-bind:msg="msg"></slot>
		<slot></slot>
		<div>
			<el-button @click="click">改变</el-button>
			<el-input></el-input>
			<el-button :plain="true" @click="open"><span class="message">弹出提醒</span></el-button>
			<div style="color: red">{{testNum}}</div>
		</div>
	</div>
</template>

<script>

import {Button, Input, Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {store, main} from './store'

export default {
  name: "children4",
  data: function () {
	return {
	  msg: 'wo so solid',
	  num: store.num
	}
  },
  components: {
	[Button.name]: Button,
	[Input.name]: Input,
	[Message.name]: Message
  },
  methods: {
	open: function () {
	  Message.success('dddd')
	},
	click: function () {
	  main.setNum(6)
	}
  },
  computed: {
    testNum () {
      return store.num
	}
  }
}
</script>

<style scoped>
	.slot-title {
		color: red;
	}

	.message {
		color: saddlebrown;
	}
</style>