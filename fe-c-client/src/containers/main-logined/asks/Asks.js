// 技术问答区路由
import React, { Component } from 'react'
import HeaderLogined from '../../../components/header-logined/HeaderLogined'
// import '../../../assets/styles/asks.less'
// antd国际化默认语言是英语，要让内容变成中文 需要从antd中引入ConfigProvider
import { Layout, PageHeader, List, Avatar, BackTop, Pagination, ConfigProvider, Tag, Space } from 'antd'
import {FormOutlined} from '@ant-design/icons'
// 再引入中文语言包
import zhCN from 'antd/es/locale/zh_CN'
import {reqAllQues} from '../../../api/index'


const { Header } = Layout

export default class Asks extends Component {
    state = {
        quesData: [], // 问题数组，包含需要的问题信息
        pageNumber: 1, // 页数
    }
    onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
        this.setState({
            pageNumber,
        })
      }
    // 异步获取发布的问题
    async componentDidMount() {
        // 获取问题
        const res = await reqAllQues()
        const result = res.data 
        // console.log(result)
        
        this.setState({
            // quesData 包含所有问题
            quesData : result.data.map((v, k) => {
                return {
                    title: v.quesTittle, // 问题标题
                    time: v.publishDate, // 发布时间
                    nickname: v.nickname, // 发布人昵称
                    idQues: v._id, // 问题对应的_id
                }
            }).reverse(), // arr.reverse() 表示让数组的元素倒序排列
            // quesDataShow 每页实际展示的问题
        })
    }
    render() {
        const {quesData, pageNumber} = this.state
        // quesDataShow 根据页数和每页显示的条数10，从quesData里截取对应的问题
        // 比如第一页，就截取1-10条，第二页截取11-20条，以此类推。
        const quesDataShow = quesData.slice(10*(pageNumber-1), 10*pageNumber)
        return (
            <div className='asks'>
                <HeaderLogined />
                <div className='wrap'>
                    <Header style={{height: '72px', backgroundColor: '#f6f6f6'}}>
                        <PageHeader
                            className="site-page-header"
                            title="技术问答区"
                            subTitle="遇到技术问题？问一下小伙伴们吧~"
                            tags={<a href='/main/asks/md' target='_blank'>
                                <Tag style={{backgroundColor: '#f6f6f6', border: 0, cursor: "pointer"}}><FormOutlined title='点击发布问题' /></Tag>
                            </a>}
                        />
                    </Header>
                    <div style={{marginTop: '10px'}} >
                        <List
                            // itemLayout="vertical"
                            dataSource={quesDataShow}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={
                                        <a href={`/main/asks/questions/${item.idQues}`}
                                            rel="noopener noreferrer" // 在react里用_blank，需要加上这一句，以免存在安全风险
                                            target='_blank'>
                                            {item.title}
                                        </a>
                                    }
                                        // description="昵称 查看数 回答数 收藏数 问题得分 时间 未解决/已解决"
                                        description={
                                            <Space size={15}>
                                                <span>{item.nickname} </span>
                                                <span>{item.time} </span>
                                                <span>查看数</span>
                                                <span>回答数</span>
                                                <span>点赞数</span>
                                                <Tag style={{ backgroundColor: '#e33e33', borderRadius: '4px', color: '#fff'}} >未解决</Tag>
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                    <BackTop />
                    {/* 然后用ConfigProvider标签，把要变成中文内容的组件包裹住即可 */}
                    <ConfigProvider locale={zhCN}>
                        <Pagination showQuickJumper /* pageSize={15} */ defaultPageSize={10} defaultCurrent={1} total={quesData.length} onChange={this.onChange} />
                    </ConfigProvider>
                </div>
            </div>
        )
    }
}
