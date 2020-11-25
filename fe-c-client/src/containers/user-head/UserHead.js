// 页面header的头像组件
import React, { Component } from 'react'
import { Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined} from '@ant-design/icons';
// 需要引入withRouter  不然子组件是没有history的
import {withRouter} from 'react-router-dom'
import {reqUser} from '../../api/index'

class UserHead extends Component {
  state = {
    visible: false,
    avatar: '',
  };
  // 异步获取用户上传的头像
  // 这里也有个需要优化的地方：
  // 就是用户在个人中心更新过头像后，UserHead这里不能跟着更新
  async componentDidMount() {
    const res1 = await reqUser()
    const result1 = res1.data 
    // console.log('result1.data.avatar: ', result1.data.avatar)
    if(result1.code === 0) {
      this.setState({
        avatar: result1.data.avatar
      })
    }
  }
  handleMenuClick = e => {
    // e.key 就是Menu.Item里的key值
    console.log(e.key)
    if (e.key === '1') {
      this.props.history.push('/main/personal');
    }
  };

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };
  render() {
    const menu = (
      <Menu 
        onClick={this.handleMenuClick}
        style={{top: '12px'}} >
          <Menu.Item key="1">个人中心</Menu.Item>
          <Menu.Item key="2">我的问题</Menu.Item>
          <Menu.Item key="3">我的回答</Menu.Item>
          <Menu.Item key="4">我的收藏</Menu.Item>
          <Menu.Item key="5">面试分享</Menu.Item>
          <Menu.Item key="6">公司畅聊</Menu.Item>
          <Menu.Item key="7">代码分享</Menu.Item>
      </Menu>
    );
    const {avatar} = this.state 
    return (
      <Dropdown
          overlay={menu}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
        >
          <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {
              avatar ? (
                <Avatar style={{
                  backgroundColor: '#87d068',
                  marginLeft: '20px'
              }} >
                  <img src={avatar} alt="avatar" style={{ width: '32px' }} />
                </Avatar>
              ) : (
                <Avatar
                  style={{
                      backgroundColor: '#87d068',
                      marginLeft: '20px'
                  }}
                  icon={<UserOutlined />}
                />
              )
            }
            
          </span>
      </Dropdown>
    );
  }
}

export default withRouter(UserHead)
