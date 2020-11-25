// 未登录头部
import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

export default class HeaderNotLogin extends Component {
    toRegister = () => {
        // console.log(this.props.location)
        // 这个未登录的头部，自身是没有history的
        // 这里的history是父组件传过来的
        this.props.history.replace('/register')
    }
    toLogin = () => {
        this.props.history.replace('/login')
    }
    render() {
        const userid = Cookies.get('userid')
        if(userid) {
            return <Redirect to='/main' />
        }
        return (
            <div className='header-notLogin'>
                <Row>
                    <Col span={24}>
                        <img src={require('../../assets/images/logo.png')}
                            style={{width: 50}} alt="logo" /> 
                        <Button 
                            size='small' 
                            style={{marginLeft: '20px'}}
                            onClick={this.toRegister}
                            >注册</Button >
                        <Button 
                            size='small' 
                            style={{marginLeft: '10px'}}
                            onClick={this.toLogin}
                            >登录</Button>
                    </Col>
                </Row>
            </div>
            
        )
    }
}
