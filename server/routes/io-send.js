const db = require('../db')
var onlineNum = []

function ioSend (ctx) {
  const { socket } = ctx

  /*
  *
  *
  * **/
  socket.on('message', data => {
	socket.broadcast.emit('message', data)

  })

  socket.on('joinRoom', async data => {
	socket.join(data.roomName)
	const info = await getMsg()
	console.log(info, '-----------')
	socket.emit('joinRoom', {
	  mans: onlineNum.length,
	  initMsgs: info
	})
  })

  socket.on('leaveRoom', data => {
	socket.leave(data.roomName)
  })

  socket.on('sendMsg', async data => {
    const date = new Date
	data.time = date
    db.Msg.create(data)
	const sendInfo = await getMsg()
	socket.broadcast.to(data.room).emit('receiveMsg', sendInfo)
  })

  // 在线人数
  socket.on('onlineUsers', data => {
	if(!onlineNum.includes(data.interimName)) {
	  onlineNum.push(data.interimName)
	}
	
	// socket.broadcast.emit('init', {mans: onlineNum.length})
	socket.emit('init', {mans: onlineNum.length})
  })

  socket.on('leaveChat', data => {
	console.log(onlineNum)
	const id = data.id

	if(onlineNum.indexOf(id) !== -1) {
	  const index = onlineNum.indexOf(id)
	  onlineNum.splice(index, 1)
	  socket.broadcast.emit('onlineHeight', {mans: onlineNum.length})
	  socket.emit('onlineHeight', {mans: onlineNum.length})
	}

  })
}

async function getMsg () {
  let list = []
  await db.Msg.find({}, null, {limit: 4}, function (error, data) {
    list = data
  })
  //  db.Msg.find({}).sort({'_id': -1}).limit(3).exec(await function (error, data) {
	// list = data
  // })
  return list
}

module.exports = ioSend