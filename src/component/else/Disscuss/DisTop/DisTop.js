import React, { Component } from 'react'
import { Menu, Input, Button, } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './DisTop.css'
import MyGap from '../../MyGap/MyGap';
import { useNavigate, useLocation } from 'react-router-dom';
const { Search } = Input;
class Top extends Component {
    menuItems = [
        {
            label: '最热',
            key: 'hot',
        },
        {
            label: '最新',
            key: 'new',
        },
        {
            label: '推荐',
            key: 'recom',
        },
    ]
    state = { current: '' }
    setStateHandler = (prop) => {
        return (val) => {
            this.setState({
                [prop]: val,
            })
        }
    }
    onClick = (e) => {
        console.log('click ', e);
        let setCurrent = this.setStateHandler('current');
        setCurrent(e.key);
    };
    render() {
        return (
            <div className='DisTop'>
                <Menu id='my_menu' items={this.menuItems} mode="horizontal" onClick={this.onClick} defaultSelectedKeys='recom' />
                <div className="my_layout"></div>
                <Search placeholder="搜索" />
                <Button id='btn-post' onClick={() => { this.props.jump('/EditArtical') }}><EditOutlined />撰写文章</Button>
                <MyGap gap={10} />
            </div>
        )
    }
}


export default function DisTop(props) {
    let history = useNavigate();
    let jump = (path) => {
        history(path);
    }
    let location = useLocation();
    return (
        <Top {...props} {...{ jump, location }} />
    )
}