import React, { useEffect, useState } from 'react'
import './less/list.less'
import { Card, Tabs, List, Space, Button, Skeleton } from 'antd'
import {
  CommentOutlined,
  EyeOutlined,
  HistoryOutlined,
  LikeOutlined,
  NumberOutlined,
} from '@ant-design/icons'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { articleType } from '@/types/base'
import { getArticleList } from '@/services/api/article'
import { useRequest } from 'ahooks'
import { formatTime } from '@/utils'
import dog from '@/assets/image/common/dog.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import {
  getArticles,
  getArticlesByCategory,
  getMoreArticles,
  getMoreArticlesByCategory,
} from '@/store/articleSlice'

const ArticleList: React.FC = () => {
  /*************************/
  /*******   State   *******/
  /*************************/
  const { TabPane } = Tabs
  const history = useHistory()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  // const [next, setNext] = useState<boolean>(true)
  const match = useRouteMatch<any>('/category/:id')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const { isLoading, list, total } = useSelector((state: RootState) => state.article)

  // console.log(list.length, total)
  const next = list.length >= total ? false : true

  useEffect(() => {
    // 当url有变化时，即点击了分类，请求相关分类文章 ~
    const data = {
      query: {
        article_category: match?.params.id,
      },
    }
    dispatch(getArticlesByCategory(data))
  }, [pathname])
  /*************************/
  /*******  Function  ******/
  /*************************/
  // const { run, data, loading } = useRequest((params?) => getArticleList(params))

  const getMoreArticleList = async () => {
    setBtnLoading(true)
    setCurrentPage((old) => old + 1)
    if (match?.params.id) {
      await dispatch(
        getMoreArticlesByCategory({
          query: {
            article_category: match?.params.id,
          },
          skip: currentPage * 5,
        })
      )
    } else {
      await dispatch(
        getMoreArticles({
          skip: currentPage * 5,
        })
      )
    }
    setBtnLoading(false)
  }

  const changeTabs = (key: any) => {
    switch (key) {
      case 'blend':
        // run()
        break
      case 'new':
        // run()
        break
      case 'hot':
        // run()
        break
    }
  }

  /*************************/
  /*******   render  *******/
  /*************************/

  const renderArticleList = () => {
    const IconText = ({ icon, text }: any) => (
      <Space>
        <span className="desc">{React.createElement(icon)}</span>
        {text}
      </Space>
    )
    const toArticleDetail = (key: string) => {
      history.push(`/blog/${key}`)
    }

    const loadMore = !isLoading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        {list.length > 0 && (
          <Button
            ghost
            loading={btnLoading}
            shape="round"
            onClick={() => getMoreArticleList()}
            disabled={!next}
          >
            <span className="tips">
              {btnLoading
                ? '正在玩命加载中.....'
                : next
                  ? '加载更多'
                  : '肥肠抱歉，木有更多文章了...(～￣▽￣)～😿'}
            </span>
          </Button>
        )}
      </div>
    ) : null
    return (
      <List
        itemLayout="vertical"
        size="large"
        loading={isLoading}
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item: articleType) => (
          <div
            className="article-item"
            style={{ marginBottom: 10 }}
            onClick={() => toArticleDetail(item._id)}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <List.Item
                style={{ borderBottom: '1px solid #e5e6eb' }}
                key={item._id}
                actions={[
                  <IconText
                    icon={HistoryOutlined}
                    text={<span className="desc">{formatTime(item._createTime)}</span>}
                    key="list-vertical-message"
                  />,
                  <IconText
                    icon={EyeOutlined}
                    text={<span className="desc">{item.article_view}</span>}
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={CommentOutlined}
                    text={<span className="desc">{item.comment_count}</span>}
                    key="list-vertical-message"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text={<span className="desc">{item.article_zan}</span>}
                    key="list-vertical-like-o"
                  />,
                ]}
                extra={<img width={180} alt="logo" src={item.thumb} className="thumb" />}
              >
                <List.Item.Meta
                  title={
                    <div className="title">
                      <span style={{ color: 'black' }}>{item.title}</span>
                    </div>
                  }
                  description={<span className="desc">{item.description}</span>}
                />
              </List.Item>
            )}
          </div>
        )}
        locale={{
          emptyText: (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={dog} alt="" style={{ width: 60, height: 60 }} />
              然鹅并没有文章 ~
            </div>
          ),
        }}
      ></List>
    )
  }
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
  )
}

export default ArticleList
