import "./style.less"
import React, { useEffect } from "react"
import { Layout } from "antd"
import { connect } from "react-redux"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useDarkreader } from "react-darkreader"
import Cookies from "js-cookie"

const HomeMainPage: React.FC = (props) => {
  const [isDark, { toggle }] = useDarkreader()

  useEffect(() => {

  }, [])

  const { Content } = Layout

  return (
    <Layout className="home">
      <Header />
      <Content className="content">
        {React.Children.map(props.children, (child) => child)}
      </Content>
      <Footer />
    </Layout>
  )
}


export default connect()(HomeMainPage)
