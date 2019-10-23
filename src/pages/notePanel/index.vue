<template>
	<div class="panel-app">
		<div style="display: inline-block" contenteditable="true" class="box-wrap" ref="notePanel">

		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
  name: "notePanel",
  data () {
	return {}
  },
  components: {},
  mounted () {
	this.$refs.notePanel.addEventListener('paste', function (e) {
	  // console.log(e)
	  const cbd = e.clipboardData
	  const ua = window.navigator.userAgent
	  if (!(e.clipboardData && e.clipboardData.items)) {
		return
	  }
	  // Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
	  if (cbd.items && cbd.items.length === 2 && cbd.items[0].kind === "string" && cbd.items[1].kind === "file" &&
		cbd.types && cbd.types.length === 2 && cbd.types[0] === "text/plain" && cbd.types[1] === "Files" &&
		ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49) {
		return
	  }

	  for (let i = 0; i < cbd.items.length; i++) {
		const item = cbd.items[i]
		if (item.kind == "file") {
		  // console.log(item, '---------=====')
		  const blob = item.getAsFile()
		  if (blob.size === 0) {
			return
		  }
		  // blob 就是从剪切板获得的文件 可以进行上传或其他操作
		  let imgSrc = ''
		  const data = new FormData()
		  data.append('file', blob)
		  data.append('token', '9h5kHWHnr20ObcQ45Efmw7Y2J8Dn_0lvl6ch0cTZ:V8M-iZIxEqh-DyJaACrUA_5WhD4=:eyJzY29wZSI6ImNvbyIsImRlYWRsaW5lIjoxNTg2NjU5NTUxfQ==')
		  axios({
			method: 'post',
			url: 'http://upload-z2.qiniup.com',
			data: data
		  }).then(result => {
			imgSrc = `http://image.shenxiaoyu.cn/${result.data.key}`
			let imgs = new Image()
			imgs.src = imgSrc
			imgs.style.display = 'inline-block'
			imgs.style.maxWidth = '100%'
			this.appendChild(imgs)

		  })
		  // $.ajax({
			//   url: 'http://upload-z2.qiniup.com',
			//   type: 'POST',
			//   cache: false,
			//   data: data,
			//   processData: false,
			//   contentType: false,
			//   success:function(res){
			// 	  var obj = JSON.parse(res);
			// 	  var wrap = $('#editDiv');
			// 	  var file = obj.data.toString();
			// 	  var img = document.createElement("img");
			// 	  img.src = file;
			// 	  wrap.appendChild(img);
			//   },error:function(){
		  //
			//   }
		  // })
		  //不与后台进行交互 直接预览start
		  // const reader = new FileReader()
		  // let imgs = new Image()
		  // imgs.file = blob
		  // reader.onload = (function (aImg) {
			// return function (e) {
			//   aImg.src = e.target.result
			// }
		  // })(imgs)
		  // reader.readAsDataURL(blob)
		  // this.appendChild(imgs)
		}
	  }

	}, false)

	this.$refs.notePanel.addEventListener('blur', function (e) {
	  axios({
		method: 'post',
		url: 'http://139.199.98.207:9997/notepanel/main/message',
		data: {title: '我的便签', str: this.innerHTML}
	  })
	}, false)

	this.getMessage()

  },
  methods: {
    getMessage () {
	  axios({
		method: 'get',
		url: 'http://139.199.98.207:9997/notepanel/main/message'
	  }).then(json => {
	    console.log(json)
		this.$refs.notePanel.innerHTML = json.data.str
	  })
	}
  }
}
</script>

<style scoped>
	.panel-app {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.box-wrap {
		width: 400px;
		height: 60vh;
		box-shadow: 0 0 3px 0 slateblue;
		overflow: auto;
		resize: both;
		padding: 20px;
		text-align: left;
		line-height: 20px;
		border-radius: 3px;
	}

	.box-wrap:hover {
		/*border: 1px solid #b6adeb;*/
	}

	@media screen and (max-width: 600px) {
		.box-wrap {
			/*position: fixed;*/
			width: 80vw;
			height: 80vh;
			padding: 5vw;
		}
		.panel-app {
			justify-content: center;
		}
	}


</style>