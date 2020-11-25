var express = require('express');
var router = express.Router();
// 引入暴露出来的UserModel集合
const {UserModel, QuesModel} = require('../db/models') 
// 引入给密码加密的包
const md5 = require('blueimp-md5')
// filter过滤器，指定过滤属性，把密码过滤掉，不显示出来
const filter = { password: 0 } 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 注册的路由
router.post('/register', (req, res) => {
  // 拿到注册页面的请求数据 用户名 密码
  const {username, password} = req.body
  // 处理数据
  // 先到集合里查找 输入的用户名是否已经存在
  UserModel.findOne({username}, (err, user) => {
    if(user) { // 已存在
      // 返回提示错误信息
      res.send({code: 1, msg: '该用户已存在，请重新输入！'})
    } else { // 不存在
      // 保存用户的注册数据
      const userModel = new UserModel({username, password: md5(password)})
      userModel.save((err, user) => {
        // 在发送响应数据之前，生成一个cookie(userid: user._id)，
        // 并交给浏览器保存
        // 参数maxAge单位是毫秒，表示cookie存活的时间。
        // 1000*60*60*24 是一天
        res.cookie('userid', user._id, { maxAge: 1000*60*60*24 })
        // 返回响应数据 这个数据里不要携带密码
        const data = {_id: user._id, username}
        res.send({code: 0, data})
      })
    }
  })
})

// 登录路由
router.post('/login', (req, res) => {
  // 拿到登录页面的请求数据 用户名 密码
  const {username, password} = req.body
  // 处理数据
  // 根据用户名和密码 去集合里查这条数据， 
  // 有同样的数据，就登录成功。 没有，则失败
  // 注意，这个密码是加密后的密码
  UserModel.findOne({username, password: md5(password)}, filter, (err, user) => {
    if(user) {// 同样的数据，登录成功
      // 发送响应数据前，生成一个cookie，并交给浏览器保存
      res.cookie('userid', user._id, { maxAge: 1000*60*60*24 })
      // 发送响应数据
      res.send({code: 0, data: user})
    } else { // 没有，则失败
      res.send({code: 1, msg: '用户名或密码不正确!'})
    }
  })
})

// 保存头像/昵称路由
router.post('/saveAvatar', (req, res) => {
  // 获取cookie携带的userid
  const userid = req.cookies.userid
  // 获取提交的用户数据
  // 对用户userid进行判断， 如果不存在，就说明用户还没登录
  if (!userid) {
    res.send({code: 1, msg: '请先登录'})
  } else {
    // 用户已登录，根据userid更新对应的头像信息
    const {avatar} = req.body 
  // user 里面是用户提交的avatar头像等信息
    UserModel.findByIdAndUpdate({ _id: userid }, {avatar}, function(err, oldUser) {
      // console.log('oldUser', oldUser)
      // oldUser里面有_id, username, password等信息
      // 如果登录失效，则oldUser就不存在了。
      // 这时候需要提醒浏览器删除cookie携带的userid
      // 所以 这里需要对oldUser做个判断
      if (!oldUser) { // 不存在
        res.clearCookie('userid')
        res.send({code: 1, msg: '请先登录'})
      } else { // 存在
        const { _id, username } = oldUser
        // 做用户信息合并，把user里的avatar头像等新数据，和登录数据进行合并
        const data = Object.assign({ _id, username }, {avatar})
        res.send({ code: 0, data })
      }
    })
  }
})

// 保存个人资料的路由
router.post('/savePersonalInfo', (req, res) => {
  // 获取cookie携带的userid
  const userid = req.cookies.userid
  // 获取提交的用户数据
  // 对用户userid进行判断， 如果不存在，就说明用户还没登录
  if (!userid) {
    res.send({code: 1, msg: '请先登录'})
  } else {
    // 用户已登录，根据userid更新对应的用户信息
    const {nickname, intro, sex} = req.body 
    // 先到数据库中查找 输入的nickname是否已经存在
    // 确保昵称不重复 查找条件是{nickname}
    UserModel.findOne({nickname}, (err, user) => {
      if(user) { // 已经存在
        // 现在这里存在个小bug，影响用户体验
        // 就是如果用户点了修改资料的按钮，用户不得不修改一下昵称
        // 不然昵称保存重复 用户是保存不了的
        res.send({code: 1, msg: '该昵称已存在，请重新输入！'})
      } else { // 不存在
        if(nickname === '') {
          res.send({code: 1, msg: '用户昵称不能为空！'})
        } else if(nickname.length > 10) {
          res.send({code: 1, msg: '昵称长度不能超过10个字符！'})
        } else {
          UserModel.findByIdAndUpdate({ _id: userid }, {nickname, intro, sex}, function(err, oldUser) {
            console.log(nickname.length)
            // console.log('oldUser', oldUser)
            // oldUser里面有_id, username, password等信息
            // 如果登录失效，则oldUser就不存在了。
            // 这时候需要提醒浏览器删除cookie携带的userid
            // 所以 这里需要对oldUser做个判断
            if (!oldUser) { // 不存在
              res.clearCookie('userid')
              res.send({code: 1, msg: '请先登录'})
            } else { // 存在
              const { _id, username } = oldUser
              // 做用户信息合并，把user里的新数据，和登录数据进行合并
              const data = Object.assign({ _id, username }, {nickname, intro, sex})
              res.send({ code: 0, data })
            }
          })
        }
      }
    })
  }
})

// 根据cookie中的userid， 获取用户信息的路由
router.get('/user', (req, res) => {
  // 获取cookie携带的userid
  const userid = req.cookies.userid 
  if (!userid) {
    res.send({code: 1, msg: '请先登录'})
  } else {
    UserModel.findOne({ _id: userid }, filter, (err, user) => {
      res.send({code: 0, data: user })
    })
  }
})

// 保存问题的路由
router.post('/save/ques', (req, res) => {
  // 获取cookie携带的userid
  const userid = req.cookies.userid
  if (!userid) {
    res.send({code: 1, msg: '请先登录'})
  } else {
    const {quesTittle, quesContent, publishDate, nickname} = req.body 
    if(quesTittle === '' || quesContent === '') {
      res.send({code: 1, msg: '标题或内容不能为空！'})
    } else {
      const quesModel = new QuesModel({quesTittle, quesContent, publishDate, nickname})
      quesModel.save((err, ques) => {
        // console.log(ques)
        res.send({code: 0, data: ques})
      })
    }
  }
})

// 获取刚发布问题内容的路由
router.get('/get/ques', (req, res) => {
  QuesModel.find((err, ques) => {
    /**
     * 得到的ques是一个json数组[{数据1},{数据2},{数据3},...{数据n}]
     * 刚发布的问题，是这个数据里的最后一项
     * 也就是说 获取到的数组数据中的最后一项，就是刚发布的问题的内容
     * 获取数组最后一项的方法是ques[ques.length-1]
     */
    // 数据数组中包含有ques.length组数据
    // console.log('ques-length: ', ques.length)
    // 数据数组的最后一项是ques[ques.length-1]
    // console.log(ques[ques.length-1])
    // 现在把最后一项的数据发送给前端就可以了
    let data = ques[ques.length-1]
    res.send({code: 0, data})
  })
})

// 获取所有问题的路由
router.get('/get/allQues', (req, res) => {
  QuesModel.find((err, allQues) => {
    res.send({code: 0, data: allQues})
  })
})

// 根据_id获取对应问题的路由
router.get('/get/idQue', (req, res) => {
  const {idQues} = req.query
  // console.log('idQues', idQues)
  QuesModel.findById({_id: idQues}, (err, que) => {
    // console.log('que', que)
    res.send({code: 0, data: que})
  })
})

module.exports = router;
