// 面试分享区路由
import React, { Component } from 'react'
import HeaderLogined from '../../../components/header-logined/HeaderLogined'
import {Layout, PageHeader, Tag, List, Avatar, BackTop, Pagination, ConfigProvider} from 'antd'
import {FormOutlined} from '@ant-design/icons'
// 再引入中文语言包
import zhCN from 'antd/es/locale/zh_CN'

const {Header} = Layout
const data = [
    {
      title: '分享标题1',
    },
    {
      title: '分享标题1',
    },
    {
      title: '分享标题1',
    },
    {
      title: '分享标题1',
    },
    {
        title: '分享标题1',
    },
    {
        title: '分享标题1',
    },
    {
        title: '分享标题1',
    },
    {
        title: '分享标题1',
    },
    {
        title: '分享标题1',
    },
    {
        title: '分享标题1',
    },
    {
        title: '分享标题1',
    },
    {
        title: '分享标题1',
    },
    {
        title: '分享标题1',
    },
    {
        title: '分享标题1',
    },
    {
        title: '分享标题1',
      },
      {
        title: '分享标题1',
      },
      {
        title: '分享标题1',
      },
      {
        title: '分享标题1',
      },
      {
          title: '问题5',
      },
      {
          title: '问题6',
      },
      {
          title: '问题7',
      },
      {
          title: '问题8',
      },
      {
          title: '问题9',
      },
      {
          title: '问题10',
      },
      {
          title: '问题11',
      },
      {
          title: '问题12',
      },
      {
          title: '问题13',
      },
      {
          title: '问题14',
      },
  ];

export default class Interview extends Component {
    onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
      }
    render() {
        return (
            <div className='interview-page'>
                <HeaderLogined history={this.props.history} />
                <div className='wrap'>
                    <Header style={{backgroundColor: '#f6f6f6'}}>
                        <PageHeader
                            className="site-page-header"
                            title="面试分享区"
                            subTitle="有哪些面试经历，和小伙伴们分享一下吧~"
                            tags={<Tag style={{backgroundColor: '#f6f6f6', border: 0}}><FormOutlined /></Tag>}
                        />
                    </Header>
                    <div style={{marginTop: '10px'}} >
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={
                                        <a href='/main/interview/contents' target='_blank'>{item.title}</a>
                                    }
                                    description="昵称 查看数 收藏数 时间 "
                                />
                                </List.Item>
                            )}
                        />
                    </div>
                    <BackTop />
                    {/* 然后用ConfigProvider标签，把要变成中文内容的组件包裹住即可 */}
                    <ConfigProvider locale={zhCN}>
                        <Pagination showQuickJumper defaultCurrent={1} total={500} onChange={this.onChange} />
                    </ConfigProvider>
                </div>
            </div>
        )
    }
}
