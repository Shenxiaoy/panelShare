const mongoose = require('mongoose')
const Schema = mongoose.Schema
const panelNotes = require('./db/panelNotes')
mongoose.connect('mongodb://139.199.98.207:27017/test1', {
  useNewUrlParser:true
})

const db = mongoose.connection

db.on('error', function (error) {
  console.log(error, 'db 连接失败')
})
db.on('open', function (db1) {
  console.log('db 连接成功！')
})

// 消息集合
const msgSchema = new Schema({
  name: String,
  msg: String,
  time: Date,
  url: String,
  head: String,
  username: String,
  room: String
})

//消息发送关联信息集合
const relationSchema = new Schema({
  username: String,
  room: String,
  time: Date,
  area: String
})


const Msg = mongoose.model('msg', msgSchema)
const Outline = mongoose.model('outLine', relationSchema)

/*const doc1 = new Blog({
  name: 'test',
  msg: 'this is test'
})
doc1.save()*/

// Blog.create({name:'sas', msg: 'kkksdsdskkk'})

// Blog.find({}, null, {limit: 1}, function(err, docs) {
//   console.log(docs, '000')
// })


module.exports = {
  Msg,
  Outline,
  panelNotes: panelNotes.panelNotes
}


