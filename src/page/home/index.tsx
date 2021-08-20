import styles from "./style.module.less"
import { Calendar, Col, Layout, Row } from "antd"
import { connect } from "react-redux"
import React, { useEffect } from "react"
import { useDarkreader } from "react-darkreader"
import Header from "@/components/AppLayout/header"
import Footer from '@/components/AppLayout/footer'
import ArticleList from "@/components/Archive/article/list"
import HotArticleList from "@/components/Archive/article/hotArticle"
import TagList from "@/components/Archive/tag"
import CategoryList from "@/components/Archive/category"
const HomeMainPage: React.FC = (props) => {
  const [isDark, { toggle }] = useDarkreader()

  useEffect(() => {

  }, [])

  const { Content } = Layout

  return (
    <Layout className={styles.home}>
      <Header />
      <Content className={styles.content}>
        <Row>
          <Col xs={0} sm={0} md={0} lg={4}>
            <CategoryList />
          </Col>
          <Col xs={24} sm={24} md={18} lg={13}>
            <div style={{ margin: '0 10px' }}>
              <ArticleList />
            </div>
          </Col>
          <Col xs={0} sm={0} md={6} lg={6}>
            <HotArticleList />
            <Calendar fullscreen={false} style={{ width: '100%', marginTop: 20 }} />
            <TagList />
          </Col>
        </Row>
        {/* {React.Children.map(props.children, (child) => child)} */}
      </Content>
      <Footer />
    </Layout>
  )
}


export default connect()(HomeMainPage)
