import React from "react";
import ArticleList from "@/components/article/list";

const Blog: React.FC = () => {
  return (
    <div>
      <ArticleList />
    </div>
  );
};

export default React.memo(Blog);
