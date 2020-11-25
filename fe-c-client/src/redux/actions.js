// 事件行为action
import { reqUpLoadAvatar } from '../api/index'
import { RECEIVE_USER, RESET_USER } from './action-types'

// 接收用户信息的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
// 重置用户信息的同步action
 export const resetUser = (msg) => ({ type: RESET_USER, data: msg })


 // 异步保存用户更新信息的action
export const updateUser = (user) => {
    return async dispatch => {
        const res = await reqUpLoadAvatar(user)
        const result = res.data 
        if (result.code === 0) { // 更新成功
            dispatch(receiveUser(result.data))
        } else { // 更新失败
            dispatch(resetUser(result.msg))
        }  
    }
}
