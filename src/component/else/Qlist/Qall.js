import React, { Component } from 'react'
import Qlist  from './Qlist'
import './Qall.css'
import Recommend from './Recommend/Recommend'
import Calendar from './Calendar/Calendar'
export default class Qall extends Component {
  render() {
    return (
      <div className='q-page layout'>
          <div className="q-page-left">
              <Recommend/>
              <Qlist/>
          </div>
          <div className="q-page-right">
              <Calendar/>
          </div>
      </div>
    )
  }
}