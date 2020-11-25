import {combineReducers} from 'redux'
import { RECEIVE_USER, RESET_USER } from './action-types'

// 管理的状态是后台返回的状态
// 后台返回的是user ， 里面有username 还有msg
// password 是不需要再从后台返回过来的
// 还要管理重定向的状态redirectTo 

const initUser = {
    msg: '', // 错误提示信息
}
// 产生user状态的redux
// 仓库管理员必须是个函数
function user(state=initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.data 
        case RESET_USER:
            return { ...initUser, msg: action.data }
        default:
            return state
    }
}


export default combineReducers({
    user
})
// 向外暴露的状态结构是 {user: {}}
