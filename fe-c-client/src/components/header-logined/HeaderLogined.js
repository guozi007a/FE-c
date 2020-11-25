// 已登录头部
import React, { Component } from 'react'
import { Row, Col, Button, Popconfirm } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'
import UserHead from '../../containers/user-head/UserHead'
import Cookies from 'js-cookie'
// 引入withRouter 是因为 子组件里没有history 需要用到的时候 
// 比如this.props.history.replace() 就会提示undefined
// 这时候有两种方法解决
// 第一种 是不引入withRouter。 而是在用到的页面，
// 给子组件加个属性 history={this.props.history}，把history从父组件传给子组件
// 第二种 就是引入 withRouter 
// export default 导出的不再是子组件，而是被withRouter包裹的子组件
// 即 export default withRouter(HeaderLogined)
// 推荐第二种，一劳永逸
import {Redirect, Link, withRouter} from 'react-router-dom'

class HeaderLogined extends Component {

    render() {
        const userid = Cookies.get('userid')
        if(!userid) {
            return <Redirect to='/login' />
        }
        return (
            <div className='header-logined'>
                <Row>
                    <Col span={24}>
                        <Link to='/main'>
                            <img src={require('../../assets/images/logo.png')}
                                style={{width: 50}} alt="logo" 
                            />
                        </Link>
                        <UserHead />
                        <Popconfirm
                            placement="bottomRight"
                            title='确认退出登录吗？'
                            onConfirm={ // 点确认之后的回调函数
                                // 干掉cookie中的userid
                               () => {
                                    Cookies.remove('userid')
                                    this.props.history.replace('/login')
                               } 
                            }
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button 
                                style={{float: 'right', marginTop: '10px', marginRight: '5%'}}
                                icon={<PoweroffOutlined />}
                                type='text'
                            />
                        </Popconfirm>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(HeaderLogined)
