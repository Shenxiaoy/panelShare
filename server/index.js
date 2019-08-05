const koa = require('koa')
const path = require('path')
const router = require('koa-router')()
const cors = require('koa2-cors')
const serve = require('koa-static')
const IO = require('koa-socket-2')
const app = new koa()

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
router.get('/diy', async (ctx, next) => {
  ctx.response.body = 'you visit success!'
})

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(9998, function () {
  console.log('post:' + 9998)
})