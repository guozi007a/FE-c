// 点击问题标题，进入到的单个问题页面路由
import React, { Component } from 'react'
import HeaderLogined from '../../../../components/header-logined/HeaderLogined'
import {Typography, Button, Space, Tag, List, Avatar, Input, BackTop} from 'antd'
import {FormOutlined, UserAddOutlined, MessageOutlined, LikeOutlined, ClockCircleOutlined} from '@ant-design/icons'
import {reqIdQues} from '../../../../api/index'

const { TextArea } = Input
const { Title, Paragraph} = Typography

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default class Questions extends Component {
    state = {
        que: {}, // 问题对象
        isShow: 'none', // 是否展示答案编写框
    }
    async componentDidMount() {
        // console.log(this.props)
        // 每个问题对应的id就放在this.props的match的params里
        const idQues = this.props.match.params.id
        // console.log(idQues)
        const res1 = await reqIdQues({idQues})
        const result1 = res1.data 
        // console.log(result1)
        if(result1.code === 0) {
            this.setState({
                que: result1.data,
            })
        }
    }
    // 点击写回答按钮，让编辑回答的区域选择展示或隐藏
    ansShow = () => {
        const {isShow} = this.state
        this.setState({
            isShow: isShow === 'none' ? 'block' : 'none' ,
        })
    }
    render() {
        const {que, isShow} = this.state 
        // console.log(que)
        console.log(isShow)
        return (
            <div className='ques-page'>
                <HeaderLogined />
                <div className='wrap'>
                    <Typography>
                        <Title level={3}>{que.quesTittle} </Title>
                        <div style={{backgroundColor: '#f7f7fc', padding: '5px  8px', borderRadius: '4px', margin: '10px 0'}}>
                            <Space size={15} >
                                <span>{que.nickname} </span>
                                <span>{que.publishDate} </span>
                                <span>阅读量</span>
                                <span>总点赞数量</span>
                                <Tag style={{backgroundColor: '#e33e33', borderRadius: '4px', color: '#fff'}} >未解决</Tag>
                            </Space>
                        </div>
                        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: '展开' }}>
                            {que.quesContent}
                        </Paragraph>
                        <Space>
                            <Button onClick={this.ansShow}>
                                {
                                    isShow === 'none' ? (<span>写回答</span>) : (<span style={{color: 'rgb(227, 62, 51)'}}>取消回答</span>)
                                } 
                                <FormOutlined />
                            </Button>
                            <Button>
                                邀请回答<UserAddOutlined />
                            </Button>
                            <Tag>共计 32 个回答</Tag>
                            {/* <Tag>共 2 个回答解决了问题</Tag> */}
                        </Space>
                        <TextArea 
                            // autoSize='true' // 自适应高度
                            autoSize={{ minRows: 15}} // 自适应高度设置最少15行
                            style={{width: '80%', marginTop: '10px', display: isShow}}
                            placeholder='请输入问题内容'
                            // onChange={this.changeAnsContent}
                        />
                        <Button 
                            style={{display: isShow, marginTop: '6px', borderRadius: '3px'}} 
                            >
                            提交回答
                        </Button>
                    </Typography>
                    <div className='answers'>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 10,
                            }}
                            dataSource={listData}
                            footer={
                            <div>
                                <b>ant design</b> footer part
                            </div>
                            }
                            renderItem={item => (
                            <List.Item
                                key={item.title}
                                actions={[
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                <IconText icon={ClockCircleOutlined} text="2020-11-24 02:33:14" key="list-vertical-time-o" />,
                                ]}
                                extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                                }
                            >
                                <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                                />
                                {item.content}
                            </List.Item>
                            )}
                        />
                        <BackTop />
                    </div>
                </div>
            </div>
        )
    }
}
