import React from 'react'
import { Avatar, Badge, Empty, Skeleton, Tag } from 'antd'
import { FireOutlined, LikeOutlined, CommentOutlined } from '@ant-design/icons'
import styles from './less/hotArticle.module.less'
import { useRequest } from 'ahooks'
import { articleType } from '@/types/base'
import { getArticleList } from '@/services/api/article'

const HotArticleList: React.FC = () => {
  // const loading = props.loading === Status.inProgress ? true : false
  const { data, error, loading } = useRequest(() =>
    getArticleList({
      limit: 5,
    })
  )
  const sortColor: any = {
    0: '#f13737',
    1: '#f50',
    2: '#f3972e',
    3: '#96db69',
    4: '#6eccb8',
  }

  return (
    <div className={styles.hotWrapper}>
      <div className={styles.hotHeader}>
        <FireOutlined style={{ color: 'red' }} />
        <span className={styles.hotTitle}>热门文章列表</span>
      </div>
      <div className={styles.hotGroup}>
        {data?.data.map((item: articleType, index: number) => {
          return (
            <div key={index} className={styles.articleItem}>
              <div className={styles.itemLeft}>
                <Avatar src={item.thumb} />
              </div>
              <Badge.Ribbon text={`TOP${index + 1}`} color={sortColor[index] as string}>
                <div className={styles.itemRight}>
                  <span className={styles.articleTitle}>{item.title}</span>
                  <div className={styles.comment}>
                    <div style={{ marginRight: 15 }}>
                      <LikeOutlined style={{ fontSize: 12 }} />
                      <span style={{ fontSize: 12 }}>{item.article_zan}</span>
                    </div>
                    <div>
                      <CommentOutlined style={{ fontSize: 12 }} />
                      <span style={{ fontSize: 12, marginLeft: 3 }}>{item.comment_count}</span>
                    </div>
                  </div>
                </div>
              </Badge.Ribbon>
            </div>
          )
        })}
        <div style={{ width: '100%', paddingTop: '10px' }}>
          {loading && (
            <div>
              {[1, 2, 3].map((item, key) => {
                return (
                  <Skeleton
                    key={key}
                    loading={loading}
                    active
                    avatar={{ size: 'small', shape: 'square' }}
                    title={false}
                  />
                )
              })}
            </div>
          )}
          {/* 空数据 */}
          {data?.data.length === 0 && !loading || error && (
            <Empty
              description={<span className="empty">暂无文章......(～￣▽￣)～</span>}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default HotArticleList
