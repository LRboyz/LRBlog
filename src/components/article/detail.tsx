import React, { useState } from "react";
import { Viewer } from "@bytemd/react";
import { useRequest } from "ahooks";
import "./detail.less";
import { getArticleDetail } from "@/services/api/article";
import { useRouteMatch } from "react-router-dom";
import frontmatter from "@bytemd/plugin-frontmatter";
import "bytemd/dist/index.min.css";
import highlight from "@bytemd/plugin-highlight-ssr";
import { Skeleton, Col, Card, } from "antd";
import "highlight.js/styles/docco.css";
import tips from '@/assets/image/common/tips.png'
// import gfm from "@/bytemd/plugins/gfm";

const articleDetail: React.FC = () => {
  const plugins = [frontmatter(), highlight()];
  const match = useRouteMatch<any>("/blog/:article_id");

  const { data, loading } = useRequest(() =>
    getArticleDetail(match?.params.article_id)
  );

  return (
    <div className="detail-container">
      <div style={{ display: "flex" }}>
        <Col xs={24} sm={24} md={24} lg={17}>
          <div className="detail-box">
            {loading ? (
              <Skeleton active />
            ) : (
              <>
                <div className="description">原创</div>
                <Viewer value={data?.data.content!} plugins={plugins}></Viewer>
              </>
            )}
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={7}>
          <Card className="sidebar">
            <div className="meta">
              <span className="iconfont icon-yanjingliulankeshi"></span>
              <span style={{ marginLeft: 10 }}>文章已被阅读
                <strong className="primary">25546</strong>
                次
              </span>
            </div>
            <div className="meta">
              <span className="iconfont icon-dianzan"></span>
              <span style={{ marginLeft: 10 }}>共获得
                <strong className="primary">21</strong>
                次点赞</span>
            </div>
            <div className="meta">
              <span className="iconfont icon-pinglun"></span>
              <span style={{ marginLeft: 10 }}>已累计
                <strong className="primary">12</strong>
                条评论</span>
            </div>
          </Card>



          <div className="tips">
            <img src={tips}></img>
          </div>

        </Col>
      </div>
    </div>
  );
};

export default React.memo(articleDetail);
