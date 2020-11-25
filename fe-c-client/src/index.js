import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'
import './assets/styles/index.less'
import MainNotLogin from './containers/main-notLogin/MainNotLogin'
import Register from './containers/register/Register'
import Login from './containers/login/Login'
import MainLogined from './containers/main-logined/MainLogined'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
// import store from './redux/store'
// import {Provider} from 'react-redux'
import memorys from './utils/memorys'
import storages from './utils/storages'
import Asks from './containers/main-logined/asks/Asks'
import MdQues from './containers/main-logined/asks/MdQues'
import Questions from './containers/main-logined/asks/questions/Questions'
import Interview from './containers/main-logined/interview/Interview'
import InterContents from './containers/main-logined/interview/interContents/InterContents'
import Componies from './containers/main-logined/componies/Componies'
import ComChatting from './containers/main-logined/componies/comChatting/ComChatting'
import Codes from './containers/main-logined/codes/Codes'
import CodeShow from './containers/main-logined/codes/codeShow/CodeShow'
import Personal from './containers/personal/Personal'
import Articles from './containers/main-logined/articles/Articles';

// import Test from './Test'
// 读取本地local中保存的user，放到内存中
const user = storages.getUser()
memorys.user = user
// const router = 
// <Provider store={store}>
//     <Router>
//         {/* Switch让路径自上而下去匹配，匹配到哪个，就跳转哪个路径 */}
//         <Switch>
//             <Route path='/register' component={Register} />
//             <Route path='/login' component={Login} />
//             {/* 这里也需要加个exact严格匹配 '/main'，
//             不然main的子路由也是显示main页面 */}
//             <Route path='/main' exact component={MainLogined} />
//             <Route path='/main/personal' exact component={Personal} />
//             <Route path='/main/asks' exact component={Asks} />
//             <Route path='/main/asks/questions' component={Questions} />
//             <Route path='/main/interview' exact component={Interview} />
//             <Route path='/main/interview/contents' component={InterContents} />
//             <Route path='/main/componies' exact component={Componies} />
//             <Route path='/main/componies/comchatting' component={ComChatting} />
//             <Route path='/main/codes' exact component={Codes} />
//             <Route path='/main/codes/codeshow' component={CodeShow} />
//             {/* exact是严格匹配。即如果路径不是 '/'，就匹配失败 */}
//             <Route path='/' exact component={MainNotLogin} />
//             {/* 当上面的路径都不匹配时，就重定向到首页 '/' */}
//             <Redirect to='/' />
//         </Switch>
//     </Router>
// </Provider>

const router = 
    <Router>
        {/* Switch让路径自上而下去匹配，匹配到哪个，就跳转哪个路径 */}
        <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            {/* 这里也需要加个exact严格匹配 '/main'，
            不然main的子路由也是显示main页面 */}
            <Route path='/main' exact component={MainLogined} />
            <Route path='/main/articles' exact component={Articles} />
            <Route path='/main/personal' exact component={Personal} />
            <Route path='/main/asks' exact component={Asks} />
            <Route path='/main/asks/md' component={MdQues} />
            <Route path='/main/asks/questions/:id' component={Questions} />
            <Route path='/main/interview' exact component={Interview} />
            <Route path='/main/interview/contents' component={InterContents} />
            <Route path='/main/componies' exact component={Componies} />
            <Route path='/main/componies/comchatting' component={ComChatting} />
            <Route path='/main/codes' exact component={Codes} />
            <Route path='/main/codes/codeshow' component={CodeShow} />
            {/* exact是严格匹配。即如果路径不是 '/'，就匹配失败 */}
            <Route path='/' exact component={MainNotLogin} />
            {/* 当上面的路径都不匹配时，就重定向到首页 '/' */}
            <Redirect to='/' />
        </Switch>
    </Router>

ReactDOM.render(
    router,
    // <Test />,
    document.getElementById('root')
)
