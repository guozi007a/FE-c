/*
测试使用mongoose操作mongodb数据库
1，连接数据库
 - 引入mongoose
 - 连接指定数据库（URL只有数据库是变化的）
 - 获取连接对象
 - 绑定连接完成的监听（用来提示连接成功）
2，得到对应特定集合的Model
 - 定义 Schema（描述文档结构）
 - 定义Model（与集合对应，可以操作集合）
3，通过Model或其 实例对集合数据进行CRUD操作
 - 通过Model实例的save（）添加数据
 - 通过Model实例的find（）/findOne（）查询多个或一个数据
 - 通过Model实例的findByIdAndUpdate（）更新某个数据
 - 通过Model实例的remove（）删除匹配的数据
*/
const md5 = require('blueimp-md5') // 引入md5加密
const mongoose = require('mongoose') 

mongoose.connect('mongodb://localhost:27017/ggzhipin_test', { useNewUrlParser: true, useUnifiedTopology: true }) // 数据库文件的名字是ggzhipin_test

const connection = mongoose.connection 
connection.on('connected', () => {
    console.log('数据库连接成功！')
})

// 创建文档 用来说明文档里有啥内容，类型是啥，是否必须
const userSchema = mongoose.Schema({ 
    username: {type: String, required: true},
    password: {type: String, required: true},
    header: {type: String}
})
// 根据文档，来创建一个叫user的集合，这个集合用UserModel接收
const UserModel = mongoose.model('user', userSchema)

// 添加集合，操作的是集合中的某一项实例
const userModel = new UserModel({
    username: '迪丽热巴',
    password: '233',
})
userModel.save((err, user) => {
    console.log(err, user)
})

// 删改查 和添加不一样， 它们三个操作的都是集合UserModel
UserModel.find()
UserModel.findOne()
UserModel.findByIdAndUpdate()
UserModel.remove()
