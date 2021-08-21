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

const Index: React.FC = (props) => {
  const [isDark, { toggle }] = useDarkreader()

  useEffect(() => {

  }, [])

  const { Content } = Layout

  return (
    <Layout className={styles.home}>
      <Header />
      <Content className={styles.content}>
        {React.Children.map(props.children, (child) => child)}
      </Content>
      <Footer />
    </Layout>
  )
}

export default Index
