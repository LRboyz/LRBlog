import HotArticleList from '@/components/Archive/article/hotArticle'
import ArticleList from '@/components/Archive/article/list'
import CategoryList from '@/components/Archive/category'
import TagList from '@/components/Archive/tag'
import { Calendar, Col, Row } from 'antd'
import React from 'react'

const Home: React.FC = () => {
  return (
    <Row >
      <Col xs={0} sm={0} md={0} lg={4}>
        <CategoryList />
      </Col>
      <Col xs={24} sm={24} md={18} lg={14}>
        <ArticleList />
      </Col>
      <Col xs={0} sm={0} md={6} lg={6}>
        <HotArticleList />
        <Calendar fullscreen={false} style={{ width: '100%', marginTop: 20 }} />
        <TagList />
      </Col>
    </Row>
  )
}
// {/* { React.Children.map(props.children, (child) => child) } */ }

export default Home
