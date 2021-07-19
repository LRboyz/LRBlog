import React from "react";
import TagList from '@/components/tag/index'
import ArticleList from "@/components/article/list";
import CategoryList from "@/components/category/index";
import { Row, Col } from "antd";

const Blog: React.FC = () => {
  return (
    <div>
      <Row>
        <Col xs={0} sm={0} md={0} lg={4} >
          <CategoryList />
        </Col>
        <Col xs={24} sm={24} md={18} lg={14} >
          <ArticleList />
        </Col>
        <Col xs={0} sm={0} md={6} lg={5} >
          <TagList />
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(Blog);
