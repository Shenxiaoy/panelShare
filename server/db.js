const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://139.199.98.207:27017/test1', {
  useNewUrlParser:true
})

const db = mongoose.connection

db.on('error', function (error) {
  console.log(error, '--')
})
db.on('open', function (db1) {
  console.log('open', '++')
})

// 消息集合
const msgSchema = new Schema({
  name: String,
  msg: String,
  time: Date,
  head: String,
  userName: String,
  isSelf: Boolean,
  roomName: String
})

//消息发送关联信息集合
const relationSchema = new Schema({
  roomList: Array,
  onlineNum: Number
})


const Msg = mongoose.model('msg', msgSchema)

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
  Msg
}


