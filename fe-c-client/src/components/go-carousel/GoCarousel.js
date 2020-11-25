import React, { Component } from 'react'
import { Carousel } from 'antd'
import {Link} from 'react-router-dom'

// 走马灯
const contentStyle = {
    height: '100px',
    color: '#fff',
    lineHeight: '100px',
    textAlign: 'center',
    background: '#364d79',
  };
export default class GoCarousel extends Component {
    render() {
        return (
            <div className='go-carousel'>
                <Carousel autoplay>
                    <div>
                        <Link to='/main/asks'>
                            <div style={contentStyle}>技术问答区</div>
                        </Link>
                    </div>
                    <div>
                        <Link to='/main/interview'>
                            <div style={contentStyle}>面试分享区</div>
                        </Link>
                    </div>
                    <div>
                        <Link to='/main/componies'>
                            <div style={contentStyle}>公司畅聊区</div>
                        </Link>
                    </div>
                    <div>
                        <Link to='/main/codes'>
                            <div style={contentStyle}>代码开源区</div>
                        </Link>
                    </div>
                </Carousel>
            </div>
        )
    }
}
