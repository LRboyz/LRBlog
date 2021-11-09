import React, { useEffect, useState } from 'react'
import { Viewer } from '@bytemd/react'
import { getProcessor } from 'bytemd'
import { useRequest } from 'ahooks'
import styles from './less/detail.module.less'
import { getArticleDetail } from '@/services/api/article'
import { useRouteMatch } from 'react-router-dom'
import frontmatter from '@bytemd/plugin-frontmatter'
import 'bytemd/dist/index.min.css'
import Comment from '../comment'
import highlight from '@bytemd/plugin-highlight-ssr'
import { Skeleton, Col, Card, Divider, Tag, Affix, Anchor, message, Typography } from 'antd'
import 'highlight.js/styles/docco.css'
import { updateArticleView, updateArticleZan } from '@/services/cloudbase'
import { GithubFilled, LikeOutlined, WechatFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { handleLikeArticle } from '@/store/historySlice'
import { RootState } from '@/store'
import { Toc } from '@/utils/toc'
import { generateDiceBearBottts } from '@/utils'


const articleDetail: React.FC = () => {
  const plugins = [frontmatter(), highlight()]
  const [liked, setLiked] = useState<boolean>(false)
  const [likesNum, setLikesNum] = useState<number>(0)
  const match = useRouteMatch<any>('/detail/:article_id')
  const dispatch = useDispatch()
  const { articles } = useSelector((state: RootState) => state.history)
  useEffect(() => {
    updateArticleView(match?.params.article_id)
  }, [match?.params.article_id])

  useEffect(() => {
    // console.log('articles', articles)
    articles.includes(match?.params.article_id) ? setLiked(true) : null
  }, [])

  // console.log(articles, comments, 'Redux里的数据')
  const { data, loading } = useRequest(() =>
    getArticleDetail(match?.params.article_id).then((res) => {
      setLikesNum(res.data.article_zan || 0)
      return res
    })
  )

  const handleLike = async () => {
    if (liked) {
      message.error('您已经点赞过这篇文章了呦 ')
      return false
    } else {
      setLiked((like) => true)
      setLikesNum((old) => old + 1)
      await updateArticleZan(match?.params.article_id)
      dispatch(handleLikeArticle(match?.params.article_id))
    }

    // Cookies.set("likeHistory", )
  }
  // console.log(generateDiceBearBottts(Math.random()), "生成隨機頭像")
  return (
    <div className={styles.detailWrapper}>
      <div style={{ display: 'flex' }}>
        <Col xs={24} sm={24} md={24} lg={17}>
          <div className={styles.detailBox}>
            {loading ? (
              <Skeleton active />
            ) : (
              <>
                <div className={styles.markdownBody}>
                  <div className={styles.description}>原创</div>
                  <Viewer value={data?.data.content!} plugins={plugins}></Viewer>
                  <Divider />
                  <div className={styles.meta}>
                    <div className={styles.metaItem}>
                      <Typography.Text type={'secondary'}>文章分类: </Typography.Text>
                      {data?.data.article_category
                        ? data?.data.article_category.map((category) => {
                          return (
                            <Tag color="geekblue" key={category._id}>
                              {category.category_name}
                            </Tag>
                          )
                        })
                        : null}
                    </div>
                    <div className={styles.metaItem}>
                      <Typography.Text type={'secondary'}>文章标签: </Typography.Text>
                      {data?.data.article_tag
                        ? data?.data.article_tag.map((tag) => {
                          return (
                            <Tag key={tag._id} color={tag.tag_color}>
                              {tag.tag_name}
                            </Tag>
                          )
                        })
                        : null}
                    </div>
                  </div>
                </div>
                <Divider />

                <Comment article_id={match?.params.article_id} author={data?.data.article_author!} />
              </>
            )}
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={7}>
          {!loading && (
            <Affix offsetTop={80}>
              <div>
                <ul className={styles.panel}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <li className={styles.panelItem}>
                      <svg className={styles.icon}>
                        <use xlinkHref="#icon-pinglun1" />
                      </svg>
                    </li>
                    <span style={{ marginLeft: 10, color: '#777777' }}>
                      当前共获得 <strong className="black">{data?.data.comment_count}</strong> 条评论
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <li className={styles.panelItem}>
                      <svg className={styles.icon}>
                        <use xlinkHref="#icon-xiai" />
                      </svg>
                    </li>
                    <span style={{ marginLeft: 10, color: '#777777' }}>
                      当前共获得 <strong className="black">{data?.data.article_zan}</strong> 人喜欢
                    </span>
                  </div>
                  <li className={styles.panelItem}>
                    <GithubFilled className="icon" />
                  </li>
                  <li className={styles.panelItem}>
                    <WechatFilled className="icon" style={{ color: 'green' }} />
                  </li>
                  <li className={styles.panelItem}>
                    <svg className={styles.icon}>
                      <use xlinkHref="#icon-juejin" />
                    </svg>
                  </li>
                </ul>
              </div>
            </Affix>
          )}
        </Col>
      </div>
    </div>
  )
}

export default React.memo(articleDetail)
