import './style.less'
import React from 'react'
import { Layout } from 'antd'
import { StoreState } from '@/store'
import { connect } from 'react-redux'
import Header from '@/components/header'
import Footer from '@/components/footer'


const HomeMainPage: React.FC = (props) => {
    const { Content } = Layout
    return (
        <>
            <section className="home-main">
                <Layout>
                    <Layout className="home-layout" >
                        <Header />
                        <Content id="container">
                            {React.Children.map(props.children, child => child)}
                        </Content>
                    </Layout>
                    <Footer />
                </Layout>

            </section>

        </>
    )
}

const mapStateToProps = ({ user }: StoreState) => {
    return { userInfo: user.userInfo }
}

export default connect(mapStateToProps)(HomeMainPage)
