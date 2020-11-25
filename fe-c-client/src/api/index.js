/*
包含了n个接口请求的函数模块
函数返回值是 promise
*/
import ajax from './ajax'

// 注册接口
export const reqRegister = (user) => ajax('/register', user, 'POST')
// 登录接口
export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST')
// 保存头像接口
export const reqSaveAvatar = ({avatar}) => ajax('/saveAvatar', {avatar}, 'POST')
// 获取用户个人信息接口
export const reqUser = () => ajax('/user', 'GET')
// 保存用户个人资料接口
export const reqSavePersonalInfo = ({nickname, intro, sex}) => ajax('/savePersonalInfo', {nickname, intro, sex}, 'POST')
// 保存问题的接口
export const reqSaveQues = ({quesTittle, quesContent, publishDate, nickname}) => ajax('/save/ques', {quesTittle, quesContent, publishDate, nickname}, 'POST')
// 获取刚发布问题内容的接口
export const reqGetQues = () => ajax('/get/ques', 'GET')
// 获取所有问题的接口
export const reqAllQues = () => ajax('/get/allQues', 'GET')
// 根据_id获取对应问题的接口
export const reqIdQues = ({idQues}) => ajax('/get/idQue', {idQues}, 'GET')
