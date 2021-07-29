import React, { useEffect, useState } from "react";
import "./list.less";
import { Card, Tabs, List, Space, Button, Skeleton } from "antd";
import {
  CommentOutlined,
  EyeOutlined,
  HistoryOutlined,
  LikeOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { articleType } from "@/types/base";
import { getArticleList } from "@/services/api/article";
import { useRequest } from "ahooks";
import formatTime from "@/utils/time";
import dog from '@/assets/image/common/dog.jpg'

const ArticleList: React.FC = () => {
  /*************************/
  /*******   State   *******/
  /*************************/
  const history = useHistory();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { pathname } = useLocation();
  const match = useRouteMatch<any>("/category/:id");
  const { TabPane } = Tabs;



  useEffect(() => {
    const params = {
      query: {
        article_category: match?.params.id,
      },
    };
    setNext(true);
    run(params);

  }, [pathname]);
  /*************************/
  /*******  Function  ******/
  /*************************/
  const { run, data, loading } = useRequest((params?) => getArticleList(params));

  const getMoreArticleList = async () => {
    setBtnLoading(true)
    let list = [] as articleType[];
    setNext(true);
    setCurrentPage((prev) => prev + 1);
    console.log(currentPage, "加載更多...");
    const res = await getArticleList(null, {
      limit: 5,
      skip: currentPage * 5,
    });

    res.total >= data!.data.length ? setNext(false) : next;
    list = data!.data.concat(res!.data!);
    setBtnLoading(false)
    return {
      list,
    };
  };

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
      history.push(`/blog/${key}`);
    };

    const loadMore = !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        {/* {loading ? ( */}
        {
          data!.data.length > 0 && (
            <Button
              ghost
              loading={btnLoading}
              shape="round"
              onClick={() => getMoreArticleList()}
              disabled={!next}
            >
              <span className="tips">
                {
                  btnLoading ? "正在玩命加载中....." : (
                    next ? "加载更多" : "肥肠抱歉，木有更多文章了...(～￣▽￣)～😿"
                  )
                }
              </span>
            </Button>
          )
        }

        {/* : (
          <span className="tips">正在玩命加载中...</span>
        )} */}
      </div>
    ) : null;
    return (
      <List
        itemLayout="vertical"
        size="large"
        loading={loading}
        loadMore={loadMore}
        dataSource={data?.data}
        renderItem={(item: articleType) => (
          <div
            className="article-item"
            style={{ marginBottom: 10 }}
            onClick={() => toArticleDetail(item._id)}
          >
            <List.Item
              style={{ borderBottom: "1px solid #e5e6eb" }}
              key={item._id}
              actions={
                !loading &&
                ([
                  <IconText
                    icon={HistoryOutlined}
                    text={
                      <span className="desc">
                        {formatTime(item._createTime)}
                      </span>
                    }
                    key="list-vertical-message"
                  />,
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
                  <img
                    width={180}
                    alt="logo"
                    src={item.thumb}
                    className="thumb"
                  />
                )
              }
            >
              {loading ? (
                <Skeleton active paragraph={{ rows: 2 }} />
              ) : (
                <List.Item.Meta
                  title={
                    <div className="title">
                      <span style={{ color: "black" }}>{item.title}</span>
                    </div>
                  }
                  description={<span className="desc">{item.description}</span>}
                />
              )}
            </List.Item>
          </div>
        )}
        locale={{
          emptyText: (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={dog} alt="" style={{ width: 60, height: 60 }} />
              然鹅并没有文章 ~
            </div>
          )
        }}
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
      {renderArticleList()}
    </Card>
  );
};

export default React.memo(ArticleList);
