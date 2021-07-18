import React from "react";
import "./list.less";
import { Card, Tabs, List, Space, Button, Skeleton } from "antd";
import {
  CommentOutlined,
  EyeOutlined,
  HistoryOutlined,
  LikeOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { articleType } from "@/types/base";
import { getArticleList } from "@/services/api/article";
import { useRequest } from "ahooks";

// export type articlePropsType = {
//   list: articleType[];
//   loading: boolean;
//   fetchArticle: () => void;
//   loadMore: () => void;
//   loadingMore: boolean;
//   isNext: boolean;
// };
const ArticleList: React.FC = () => {
  /*************************/
  /*******   State   *******/
  /*************************/
  const history = useHistory();
  //   const params = useParams();
  const { TabPane } = Tabs;

  const { run, data, loading } = useRequest(async () => getArticleList());
  console.log(data, loading, history.location.pathname);
  /*************************/
  /*******  Function  ******/
  /*************************/

  const changeTabs = (key: any) => {
    switch (key) {
      case "blend":
        run();
        break;
      case "new":
        run();
        break;
      case "hot":
        run();
        break;
    }
  };

  //   useEffect(() => {
  //     fetchArticle();
  //   }, []);
  /*************************/
  /*******   render  *******/
  /*************************/

  const renderArticleList = () => {
    const IconText = ({ icon, text }: any) => (
      <Space>
        <span className="desc">{React.createElement(icon)}</span>
        {text}
      </Space>
    );
    const toArticleDetail = (key: string) => {
      alert(key);
      history.push(`/article/${key}`);
    };
    // const loadMore = loading ? (
    //   <div
    //     style={{
    //       textAlign: "center",
    //       marginTop: 12,
    //       height: 32,
    //       lineHeight: "32px",
    //     }}
    //   >
    //     {loadingMore ? (
    //       <Button
    //         ghost
    //         loading={props.loadingMore}
    //         shape="round"
    //         onClick={() => props.loadMore()}
    //         disabled={!props.isNext}
    //       >
    //         <span className="tips">
    //           {props.isNext ? "加载更多" : "没有更多文章了呢..."}
    //         </span>
    //       </Button>
    //     ) : (
    //       <span className="tips">正在玩命加载中...</span>
    //     )}
    //   </div>
    // ) : null;
    return (
      <List
        itemLayout="vertical"
        size="large"
        loading={loading}
        // loadMore={loadMore}
        dataSource={data?.data}
        renderItem={(item: articleType) => (
          <div
            style={{ marginBottom: 10 }}
            onClick={() => toArticleDetail(item._id)}
          >
            <List.Item
              className="item"
              style={{ padding: "10px 10px" }}
              key={item._id}
              actions={
                loading &&
                ([
                  // <IconText icon={HistoryOutlined} text={<span className="desc">{formatTime(item._createTime)}</span>} key="list-vertical-message" />,
                  <IconText
                    icon={EyeOutlined}
                    text={<span className="desc">12</span>}
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={CommentOutlined}
                    text={<span className="desc">1</span>}
                    key="list-vertical-message"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text={<span className="desc">99</span>}
                    key="list-vertical-like-o"
                  />,
                ] as any)
              }
              extra={
                loading ? (
                  <Skeleton.Image />
                ) : (
                  <img width={180} alt="logo" src={item.thumb} />
                )
              }
            >
              {loading ? (
                <Skeleton active paragraph={{ rows: 2 }} />
              ) : (
                <List.Item.Meta
                  title={
                    <div className="title">
                      {item.title}
                      {/* <IconText icon={NumberOutlined} text={<span className="desc">{item.article_category?.}</span>} key="list-vertical-message" /> */}
                    </div>
                  }
                  description={<span className="desc">{item.description}</span>}
                />
              )}
            </List.Item>
          </div>
        )}
      ></List>
    );
  };
  return (
    <Card className="article-container">
      {/* 文章内容区域 */}
      <Tabs defaultActiveKey="0" onChange={changeTabs}>
        <TabPane tab={<span>綜合</span>} key="blend" />
        <TabPane tab={<span>最新</span>} key="new" />
        <TabPane tab={<span>热门</span>} key="hot" />
      </Tabs>
      <div className="middle-body">{renderArticleList()}</div>
    </Card>
  );
};

export default React.memo(ArticleList);
