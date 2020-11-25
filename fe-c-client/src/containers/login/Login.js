// 登录路由
import React, { Component } from 'react'
import { Row, Col, Divider, Form, Input, Button, Checkbox, message  } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import CurrentTime from '../../components/currentTime/CurrentTime'
import HeaderNotLogin from '../../components/header-notLogin/HeaderNotLogin'
import '../../assets/styles/login.less'
import {reqLogin} from '../../api/index'
import {Link} from 'react-router-dom'
import memorys from '../../utils/memorys'
import storages from '../../utils/storages'

export default class Login extends Component {
    onFinish = async (values) => {
        // console.log('Received values of form: ', values);
        const {username, password} = values 
        const res = await reqLogin({username, password})
        const result = res.data
        // console.log(result)
        if(result.code === 0) {
            message.success('登录成功！')
            // 获取user
            const user = result.data
            // 把user保存在内存中
            memorys.user = user
            // 把user保存在本地local中
            storages.saveUser(user)
            // push 回退到上一个浏览过的页面
            // replace 不需要回退到上一个浏览过的页面
            // goBack 回退 （不常用）
            this.props.history.replace('/main')
        } else {
            message.error(result.msg)
        }
    }
    render() {
        return (
            <div className='login-page'>
                <HeaderNotLogin history={this.props.history} />
                <Row>
                    <Col span={24} style={{textAlign: 'center'}}>
                        <CurrentTime />
                    </Col>
                </Row>
                <Divider>登录</Divider>
                <section>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        >
                        <Form.Item
                            name="username"
                            rules={[
                            {
                                required: true,
                                message: '用户名不能为空!',
                            },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: '密码不能为空!',
                            },
                            ]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                            { validator:(_, value) => value ? Promise.resolve() : Promise.reject('请先阅读以上协议！') },
                            ]}
                            // {...tailFormItemLayout}
                        >
                            <Checkbox style={{color: '#c3c3c3', fontSize: '12px'}}>
                                我已阅读《FE社区用户协议》和《隐私协议》
                            </Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登&emsp;录
                            </Button>
                            {/* Or <a href="/register">我先去注册&gt;&gt;</a> */}
                            <Link to='/register'>
                                我先去注册&gt;&gt;
                            </Link>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
