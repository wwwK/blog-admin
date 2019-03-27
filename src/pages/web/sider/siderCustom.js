import React, { Component } from 'react'
import avatar from '../../../assets/lf.jpg'
import {
  Card,
  Tag,
  Divider,
} from 'antd'
import './sider.less'
import api from '../../../api'
import { color } from '../../../utils'

class SiderCustom extends Component {
  constructor() {
    super()
    this.state = {
      tags: [],
      articleData: []
    }
    this.getTags = this.getTags.bind(this)
  }
  componentDidMount() {
    this.getTags()
    this.getArticleList()
  }
  async getArticleList () {
    const { data, code } = await api.get('/article/list', {pageNo:1, pageSize: 5})
    code === 1000 && this.setState({articleData: data})
    console.log(this.state.articleData)
  }
  async getTags () {
    const {data, code} = await api.get('tag/list/all')
    code === 1000 && this.setState({tags: data})
   }
  render() {
    const list = this.state.articleData.map(v => (
      <li key={v.id} onClick={() => this.props.history.push(`/app/blog/desc/${v.id}`)}>
        {v.title}
      </li>
    ))
    return (
      <div className="sider-container">
        <div className="admin-info">
          <header>
            <img src={avatar} alt="avatar" title='我叫路飞，要成为海贼王的男人'/>
          </header>
          <p className="admin-name">
            牧羊人
          </p>
          <p className="admin-desc">
            不爱骑行，不爱跳舞
            <br />
            前端打杂人员，全村最靓的仔
          </p>
        </div>
        <div className="recent-article">
          <Card bordered={false}>
            <Divider orientation="left">最近文章</Divider>
            <ul className="recent-list">
              { list }
            </ul>
          </Card>
        </div>
        <div className="tags-wrapper">
          <Card bordered={false}>
            <Divider orientation="left">标签</Divider>
            <div className="tags-content">
              {
                this.state.tags.map(v => (
                  <Tag
                    key = {v.id}
                    color={color[Math.floor(Math.random()*color.length)]}
                    // onClick={()=>this.props.history.push(`/app/tags/${v}`)}
                  >
                    {v.name}
                  </Tag>
                ))
              }
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default SiderCustom