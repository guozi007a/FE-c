// 注册路由
import React, { Component } from 'react'
import { Divider, Form, Input, Button, Checkbox, message  } from 'antd'
import CurrentTime from '../../components/currentTime/CurrentTime'
import HeaderNotLogin from '../../components/header-notLogin/HeaderNotLogin'
import '../../assets/styles/register.less'
// import { connect } from 'react-redux'
// import {register} from '../../redux/actions'
import {reqRegister} from '../../api/index'
import {Link} from 'react-router-dom'

export default class Register extends Component {
    onFinish = async(values) => {
        // console.log(values)
        // const {username, password} = values
        const res = await reqRegister(values)
        // console.log(res.data)
        const result = res.data
        if(result.code === 0) {
            message.success('注册成功！')
            console.log(result)
            this.props.history.replace('/main/personal')
        } else {
            message.error(result.msg)
        }
      }
    render() {
        // const [form] = Form.useForm()
        return (
            <div className='register-page'>
                <HeaderNotLogin history={this.props.history} />
                <CurrentTime />
                <Divider>注册</Divider>
                <section className='register-form'>
                    <Form
                        // form={form}
                        name="register"
                        onFinish={this.onFinish}
                        scrollToFirstError
                        >
                        <Form.Item
                            name="username"
                            label="用&nbsp;&nbsp;户&nbsp;名"
                            rules={[ // 声明式验证：直接用别人定义好的规则进行验证
                                {required: true, message: '用户名不能为空!'},
                                // { min: 4, message: '用户名至少4位' },
                                // { max: 12, message: '用户名最多12位' },
                                // { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成!' },
                            ]}
                        >
                        <Input />
                        </Form.Item>

                        <Form.Item
                        name="password"
                        label="密&emsp;&nbsp;&nbsp;&nbsp;码"
                        rules={[ //强密码声明
                            {required: true,message: '密码不能为空!'},
                            // { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/, message: '密码必须是由8-16位的大写字母、小写字母和数字组成!' }
                        ]}
                        hasFeedback
                        >
                        <Input.Password />
                        </Form.Item>

                        <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: '确认密码不能为空!',
                            },
                            ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                                }

                                return Promise.reject('两次输入密码不一致!');
                            },
                            }),
                        ]}
                        >
                        <Input.Password />
                        </Form.Item>

                        <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject('需要先阅读协议！'),
                            },
                        ]}
                        >
                        <Checkbox>
                            我已阅读 <a href="/">《FE社区用户协议》和《隐私协议》</a>
                        </Checkbox>
                        </Form.Item>
                        <Form.Item >
                        <Button type="primary" htmlType="submit">
                            注&emsp;册
                        </Button>
                        </Form.Item>
                        {/* <a href='/login' className='goLogin'>
                            已有账号，直接登录&gt;&gt;
                        </a> */}
                        <Link to='/login' className='goLogin'>
                            已有账号，直接登录&gt;&gt;
                        </Link>
                    </Form>
                </section>
            </div>
        )
    }
}
    
// export default connect(
//     state => ({user: state.user}), // 状态值
//     {register} // action
// )(Register) // 组件
