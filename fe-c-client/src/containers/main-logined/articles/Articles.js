// 发布问题后，跳转到这个页面，显示刚才发布的内容
import React, { Component } from 'react'
import HeaderLogined from '../../../components/header-logined/HeaderLogined'
import {Typography, Space} from 'antd'
import {reqUser, reqGetQues} from '../../../api/index'

const { Title, Paragraph} = Typography

export default class Articles extends Component {
    state = {
        quesTittle: '',
        quesContent: '',
        publishDate: '',
        nickname: '',
    }
    async componentDidMount() {
        const res1 = await reqGetQues()
        const result1 = res1.data
        const {quesTittle, quesContent, publishDate} = result1.data
        const res2 = await reqUser()
        const result2 = res2.data 
        const {nickname} = result2.data
        this.setState({
            quesTittle,
            quesContent,
            publishDate,
            nickname,
        })
    }
    render() {
        const {quesTittle, quesContent, publishDate, nickname} = this.state
        return (
            <div className='articles-page'>
                <HeaderLogined />
                <div className='wrap'>
                <Typography>
                    <Title level={3}>{quesTittle}</Title>
                    <div style={{backgroundColor: '#f7f7fc', padding: '5px 8px', borderRadius: '4px', margin: '10px 0'}}>
                        <Space size={15} >
                            <span>{nickname}</span>
                            <span>{publishDate} </span>
                            <span>查看数1</span>
                            <span>点赞数量0</span>
                        </Space>
                    </div>
                    <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: '展开' }}>
                        {quesContent}
                    </Paragraph>
                </Typography>
                </div>
            </div>
        )
    }
}
