import React, { Component } from 'react'
import '../../assets/styles/personal-page.less'
import HeaderLogined from '../../components/header-logined/HeaderLogined'
import { Row, Col, Avatar, Upload, message, Tooltip, Tabs, Button, Input, Radio } from 'antd'
import { UserOutlined, FormOutlined } from '@ant-design/icons'
// import {connect} from 'react-redux'
// import {updateUser} from '../../redux/actions'
import {reqSaveAvatar, reqUser, reqSavePersonalInfo} from '../../api/index'


const { TabPane } = Tabs
const { TextArea } = Input
// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

export default class Personal extends Component {
  state = {
    avatar: '', // 头像url
    visible: 'none', // 保存头像的按钮初始化隐藏
    isEdit: true, // 编辑状态
    nickname: '', // 昵称
    intro: '', // 简介
    sex: '', // 性别
  }
  // 初始化页面时，自动获取用户上传的头像等信息
  // 这里有个bug，就是刷新页面，头像显示失败。
  // 不主动刷新页面，就是正常显示的。
  async componentDidMount() {
    const res1 = await reqUser()
    const result1 = res1.data 
    console.log('result1.data: ', result1.data)
    if(result1.code === 0) {
      this.setState({
        avatar: result1.data.avatar, // 头像
        username: result1.data.username, // 用户名 也是ID
        nickname: result1.data.nickname, // 昵称
        intro: result1.data.intro, // 简介
        sex: result1.data.sex, // 性别
      })
    }
  }
  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, imageUrl =>
      //   this.setState({
      //     avatar: imageUrl,
      //   }),
      // );
      console.log(info.file)
      this.setState({
        // URL.createObjectURL()方法用于创建一个DOMString，
        // 里面包含要读取文件的url
        avatar: URL.createObjectURL(info.file.originFileObj),
        // avatar: info.file.response.imgUrl,
        visible: 'block'
      })
    }
  };
  // 保存头像按钮
  // 点击保存后，让保存按钮隐藏
  handleClick = async(e) => {
    e.preventDefault()
    console.log('点击保存')
    this.setState({
      visible: 'none',
    })
    const {avatar} = this.state
    const res = await reqSaveAvatar({avatar})
    const result = res.data 
    if(result.code === 0) {
      message.success('头像设置成功！')
    } else {
      message.error(result.msg)
    }
  }
  // 点击编辑个人资料
  edit = () => {
    this.setState({
      isEdit: false,
    })
  }
  // 保存个人资料的按钮
  save = async() => {
    const { nickname, intro, sex } = this.state
    const res2 = await reqSavePersonalInfo({nickname, intro, sex})
    const result2 = res2.data 
    if(result2.code === 0) {
      console.log(result2)
      this.setState({
        isEdit: true,
        nickname,
        intro,
        sex,
      })
      message.success('保存个人资料成功！')
    } else {
      message.error(result2.msg)
    }
  }
  // 输入昵称nickname
  nickNameChange = (e) => {
    console.log(e.target.value)
    this.setState({
      nickname: e.target.value,
    })
  }
  // 输入简介intro
  introChange = (e) => {
    console.log(e.target.value)
    this.setState({
      intro: e.target.value,
    })
  }
  // 选择性别
  sexChange = (e) => {
    console.log(e.target.value)
    this.setState({
      sex: e.target.value,
    })
  }
    render() {
      const { avatar, username, isEdit, nickname, intro, sex } = this.state;
      // bug出在这里 在初始化时，这里拿不到avatar数据
      console.log(avatar)
        const uploadButton = (
            // <div>
            //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
            //     <div style={{ marginTop: 8 }}>Upload</div>
            // </div>
            <Tooltip 
                title="上传头像" 
                color='#87d068'
                placement="right"
                >
                <Avatar 
                    size={64} 
                    icon={<UserOutlined />}  
                />
            </Tooltip> 
        )
        return (
            <div className='personal-page'>
                <HeaderLogined />
                <div className='wrap'>
                    <Row className='personal-headerRow'>
                        <Col span={24} >
                          <Upload
                            name="file"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            action="http://localhost:4000/upload" 
                            onChange={info => this.handleChange(info)}
                          >
                            {avatar ? <img src={avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                          </Upload>
                          <Button className='save-avatar' 
                            style={{display: this.state.visible}}
                            onClick={this.handleClick}
                          >
                            保存
                          </Button>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '10px'}}>
                        <Tabs defaultActiveKey="1" tabPosition='left'>
                            <TabPane tab="个人资料" key="1">
                              <div>
                                <div className='personal-header'>
                                  <span>
                                    账号信息 
                                    {
                                      isEdit ? 
                                      (<FormOutlined 
                                        title='点击编辑个人资料' 
                                        onClick={this.edit}
                                      />) : 
                                      (<span 
                                        style={{fontSize: '16px', fontWeight: 500, width: '60px', height: '28px', textAlign: 'center', marginLeft: '5px', backgroundColor: '#87D068', border: '1px solid #e5e5e5', borderRadius: '4px',padding: '0 4px', cursor: 'pointer'}} 
                                        onClick={this.save} 
                                        title='保存编辑好的个人资料' >
                                        保存
                                      </span>)
                                    }
                                    
                                  </span>
                                  <div className='personal-header-line'></div>
                                </div>
                                <table>
                                  <tbody>
                                    <tr key='id'>
                                      <td>ID</td>
                                      <td>{username}</td>
                                    </tr>
                                    <tr key='nickname'>
                                      <td>昵称</td>
                                      <td>
                                        {
                                          isEdit ?
                                          (<span>
                                            {nickname}
                                          </span>) :
                                          /* 输入字符最大长度不能超过10 */
                                          (<input 
                                            type='text' 
                                            value={nickname} 
                                            onChange={this.nickNameChange} 
                                            maxLength='10' />)
                                        }
                                      </td>
                                    </tr>
                                    <tr key='introduction'>
                                      <td>简介</td>
                                      <td>
                                        {
                                          isEdit ?
                                          (<span> {intro} </span>) :
                                          <TextArea 
                                            allowClear // 带移除图标
                                            maxLength={120} // 允许最大输入字数
                                            value={intro}
                                            onChange={this.introChange}
                                          />
                                        }
                                      </td>
                                    </tr>
                                    <tr key='sex'>
                                      <td>性别</td>
                                      <td>
                                        {
                                          isEdit ?
                                          (<span>{sex} </span>) :
                                          (<Radio.Group
                                            defaultValue={'女'}
                                            onChange={this.sexChange} >
                                              <Radio value={'男'}>男</Radio>
                                              <Radio value={'女'}>女</Radio>
                                          </Radio.Group>)
                                        }
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <div className='personal-header'>
                                  <span>学历信息</span>
                                  <div className='personal-header-line'></div>
                                </div>
                                <table>
                                  <tbody>
                                    <tr key='graduateSchool'>
                                      <td>毕业院校</td>
                                      <td>自己写一个</td>
                                    </tr>
                                    <tr key='graduateTime'>
                                      <td>毕业时间</td>
                                      <td>自己选</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <div className='personal-header'>
                                  <span>任职信息</span>
                                  <div className='personal-header-line'></div>
                                </div>
                                <table>
                                  <tbody>
                                    <tr key='compony'>
                                      <td>任职公司</td>
                                      <td>自己写一个</td>
                                    </tr>
                                    <tr key='position'>
                                      <td>职位</td>
                                      <td>自己写</td>
                                    </tr>
                                    <tr key='getJob'>
                                      <td>入职时间</td>
                                      <td>自己选</td>
                                    </tr>
                                    <tr key='leaveJob'>
                                      <td>离职时间</td>
                                      <td>自己选</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <div className='personal-header'>
                                  <span>简历信息</span>
                                  <div className='personal-header-line'></div>
                                </div>
                                <table>
                                  <tbody>
                                    <tr key='cv'>
                                      <td>简历信息</td>
                                      <td>自己写一个</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </TabPane>
                            <TabPane tab="我的问题" key="2">
                            Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="我的回答" key="3">
                            Content of Tab Pane 3
                            </TabPane>
                            <TabPane tab="我的收藏" key="4">
                            Content of Tab Pane 4
                            </TabPane>
                            <TabPane tab="面试分享" key="5">
                            Content of Tab Pane 5
                            </TabPane>
                            <TabPane tab="公司畅聊" key="6">
                            Content of Tab Pane 6
                            </TabPane>
                            <TabPane tab="代码分享" key="7">
                            Content of Tab Pane 7
                            </TabPane>
                            <TabPane tab="安全设置" key="8">
                            Content of Tab Pane 7
                            </TabPane>
                        </Tabs>
                    </Row>
                </div>
            </div>
        )
    }
}


// export default connect(
//   state => ({user: state.user}),
//   {updateUser}
// )(Personal)
