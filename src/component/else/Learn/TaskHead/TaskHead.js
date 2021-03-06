import React, { Component } from 'react'
import { Button } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
export default class TaskHead extends Component {
  render() {
    return (
      <div className="Today_top">
        <div>
          <h1 style={{ fontSize: '28px', color: 'white', marginBottom: '-2px',...this.props.style }}>{this.props.title}</h1>
        </div>
        <div>
          <Button size='small' id='darkBtn'>
            <EllipsisOutlined />
          </Button>
        </div>
      </div>
    )
  }
}
