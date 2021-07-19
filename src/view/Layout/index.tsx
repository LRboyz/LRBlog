import "./style.less"
import React from "react"
import { Layout } from "antd"
import { StoreState } from "@/store"
import { connect } from "react-redux"
import Header from "@/components/header"
import Footer from "@/components/footer"


const HomeMainPage: React.FC = (props) => {

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

const mapStateToProps = ({ user }: StoreState) => {
  return { userInfo: user.userInfo }
}

export default connect(mapStateToProps)(HomeMainPage)
