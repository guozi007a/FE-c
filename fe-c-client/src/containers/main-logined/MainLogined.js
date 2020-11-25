// 已登录主页
import React, { Component } from 'react'
import GoCarousel from '../../components/go-carousel/GoCarousel'
import CurrentTime from '../../components/currentTime/CurrentTime'
import HeaderLogined from '../../components/header-logined/HeaderLogined'
// import Asks from './asks/Asks'
// import Interview from './interview/Interview'
// import Componies from './componies/Componies'
// import Codes from './codes/Codes'

export default class MainLogined extends Component {
    
    render() {
        // const userid = Cookies.get('userid')
        // console.log('mainLogined: ', userid)
        return (
            <div>
                <HeaderLogined />
                <CurrentTime />
                <GoCarousel />
            </div>
        )
    }
}
