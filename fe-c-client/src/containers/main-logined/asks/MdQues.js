// 发布问题内容的页面
import React, { Component } from 'react'
import { Input, Button, message } from 'antd'
import {reqSaveQues, reqUser} from '../../../api/index'
// import {Redirect} from 'react-router-dom'

const { TextArea } = Input

export default class MdQues extends Component {
    state = {
        quesTittle: '', // 问题标题
        quesContent: '', // 问题内容
    }
    // 写标题
    changeQuesTittle = (e) => {
        this.setState({
            quesTittle: e.target.value 
        })
    }
    // 写内容
    changeQuesContent = (e) => {
        this.setState({
            quesContent: e.target.value
        })
    }
    // 点击发布
    handleSaveQues = async() => {
        // console.log('this.state', this.state)
        let publishDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getUTCMinutes() + ':' + new Date().getSeconds()
        // console.log(publishDate)
        const res1 = await reqUser()
        const {nickname} = res1.data.data 
        const {quesTittle, quesContent} = this.state 
        // 保存问题的时候，把昵称也一起保存进去
        const res = await reqSaveQues({quesTittle, quesContent, publishDate, nickname})
        // console.log('res', res)
        const result = res.data
        // console.log('result', result)
        if(result.code === 0) {
            message.success('问题发布成功!')
            // {<Redirect to='/main/asks/questions' />}
            // 跳转到问题页面，展示刚才发出来的问题
            this.props.history.replace('/main/articles')
        } else {
            message.error(result.msg)
        }
    }
    render() {
        return (
            <div style={{margin: '0 auto', width: '80%'}} >
                <div style={{ margin: '10px 0' }} />
                <Input 
                    placeholder="请输入标题，不超过100个字符"
                    style={{width: '50%'}}
                    maxLength={100}
                    onChange={this.changeQuesTittle}
                />
                <div style={{ margin: '24px 0' }} />
                <TextArea 
                    // autoSize='true' // 自适应高度
                    autoSize={{ minRows: 15}} // 自适应高度设置最少15行
                    style={{width: '80%'}}
                    placeholder='请输入问题内容'
                    onChange={this.changeQuesContent}
                />
                <div style={{ margin: '24px 0' }} />
                <Button 
                    style={{backgroundColor: '#87D068', borderRadius: '4px', color: '#fff'}} 
                    onClick={this.handleSaveQues}
                    >
                    发布问题
                </Button>
            </div>
        )
    }
}
