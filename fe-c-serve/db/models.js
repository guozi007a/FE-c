// 引入mongoose
const mongoose = require('mongoose')
// 连接指定数据库 数据库的名字是fe-c
mongoose.connect('mongodb://localhost:27017/fe-c', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const connection = mongoose.connection 
// 监听 连接成功 打印db connect success!
connection.on('connected', () => {
    console.log('db connect success!')
})
// 临时加的一句处理错误的代码
process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error);
  process.exit(1) // To exit with a 'failure' code
});

// 创建用户文档 包含用户的各种信息
const userSchema = mongoose.Schema({
    username: {type: String, required: true}, // 用户名
    password: {type: String, required: true}, // 密码
    avatar: {type: String}, // 头像
    nickname: {type: String}, // 昵称
    intro: {type: String}, // 简介
    sex: {type: String}, // 性别
})
// 根据文档userSchema，创建集合user，用UserModel接收
const UserModel = mongoose.model('user', userSchema)

// 创建用户提问问题的文档 包含问题的标题和内容
const quesSchema = mongoose.Schema({
  quesTittle: {type: String}, // 问题标题
  quesContent: {type: String}, // 问题内容
  publishDate: {type: String}, // 发布时间
  nickname: {type: String}, //发布人昵称
})
// 根据文档quesSchema ，创建集合ques，用QuesModel接收
const QuesModel = mongoose.model('ques', quesSchema)

// 向外暴露Model
// exports.UserModel = UserModel
// exports.QuesModel = QuesModel

// 合并暴露
module.exports = {
  UserModel,
  QuesModel,
}
