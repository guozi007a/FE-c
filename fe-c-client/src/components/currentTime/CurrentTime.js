import React, { Component } from 'react'
import { Row, Col } from 'antd'

// 动态获取当前时间

export default class CurrentTime extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.currentTime(),
            1000
        )
    }
    componentWillUnmount() {
        clearInterval(this.timerID)
    }
    currentTime = () => {
        this.setState({
            date: new Date()
        })
    }
    render() {
        return (
            <div className='currentTime'>
                <Row>
                    <Col span={24} style={{textAlign: 'center'}}>
                        <div style={{fontSize: 20}}>
                            {
                                new Date().toLocaleDateString() + ' ' +
                                this.state.date.toLocaleTimeString()
                            }
                        </div>
                    </Col>
                </Row>
            </div>
            
        )
    }
}
