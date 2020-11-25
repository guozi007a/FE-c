// 未登录主页
import React, { Component } from 'react'
// import '../App.less'
import GoCarousel from '../../components/go-carousel/GoCarousel'
import CurrentTime from '../../components/currentTime/CurrentTime'
import HeaderNotLogin from '../../components/header-notLogin/HeaderNotLogin'


export default class MainNotLogin extends Component {
    
    render() {
        return (
            <div>
                {/* 子组件没有history，需要父组件传过去 */}
                <HeaderNotLogin history={this.props.history} />
                <CurrentTime />
                <GoCarousel />
            </div>
        )
    }
}
