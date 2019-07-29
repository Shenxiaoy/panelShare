const koa = require('koa')
const path = require('path')
const router = require('koa-router')()
const cors = require('koa2-cors')
const serve = require('koa-static')
const IO = require('koa-socket-2')
const ioSend = require('./routes/io-send')
const app = new koa()
const io = new IO()
io.attach(app)

app.use(serve(__dirname + '/static'))

app.use(cors({
  origin: function (ctx) {
	return ctx.header.origin
  }
}))

router.post('/diy/list', async (ctx, next) => {
  const str = {name: 'age', age: 'name'}
  ctx.response.body = JSON.stringify(str)
})

app.use(router.routes())
  .use(router.allowedMethods())

io.on('connection', ioSend)

app.listen(3003, function () {
  console.log('post:' + 3003)
})