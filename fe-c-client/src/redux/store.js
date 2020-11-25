// 状态仓库store
// 引入创建仓库 和 中间件应用器
import {createStore, applyMiddleware} from 'redux'
// 引入异步中间件
import thunk from 'redux-thunk'
// 引入开发环境谷歌应用插件
import { composeWithDevTools } from 'redux-devtools-extension'
// 引入合并后的管理员 reducers
import reducers from './reducers'

// 创建store
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
// 向外暴露store
export default store
