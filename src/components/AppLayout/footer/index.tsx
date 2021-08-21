import styles from "./style.module.less"
import React from "react"
import { Layout } from "antd"
import reactIcon from "@/assets/image/public/react_ts.svg"
import dockerIcon from "@/assets/image/public/docker.svg"
import reduxIcon from "@/assets/image/public/redux-action.svg"
import flaskIcon from "@/assets/image/public/flask.svg"
import antIcon from "@/assets/image/public/ant-design.svg"
// import viteIcon from "../../../favicon.svg"
import tencentIcon from '@/assets/image/public/tencent_yun.svg'

const footer: React.FC = () => {
  const { Footer } = Layout
  return (
    <Footer
      className={styles.footer}
      style={{ textAlign: "center", fontSize: "12px", color: "#000000a6" }}
    >
      <div>粤ICP备2021062484号-1</div>
      <div>Copyright © 2021 lrboy.cn, All Rights Reserved</div>
      <div className={styles.logoGroup}>
        <img src={tencentIcon} alt="tencent_yun" />
        <img src={antIcon} alt="antdesign" />
        <img src={reduxIcon} alt="redux" />
        <img src={reactIcon} alt="react" className={styles.react} />
        <img src={dockerIcon} alt="tsx" />
        <img src={flaskIcon} alt="mongodb" />
        {/* <img src={viteIcon} alt="vite" /> &nbsp */}
      </div>
    </Footer>
  )
}

export default footer
