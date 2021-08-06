import React, { useEffect, useState } from 'react'
import { Viewer, Editor } from '@bytemd/react'
import { getProcessor } from 'bytemd'
import { useRequest } from 'ahooks'
import './less/detail.less'
import { getArticleDetail } from '@/services/api/article'
import { useRouteMatch } from 'react-router-dom'
import frontmatter from '@bytemd/plugin-frontmatter'
import 'bytemd/dist/index.min.css'
import Comment from '../comment'
import highlight from '@bytemd/plugin-highlight-ssr'
import { Skeleton, Col, Card, Divider, Tag, Affix, Anchor, message } from 'antd'
import 'highlight.js/styles/docco.css'
import { updateArticleView, updateArticleZan } from '@/services/cloudbase'
import { GithubFilled, LikeOutlined, WechatFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { handleLikeArticle } from '@/store/historySlice'
import { RootState } from '@/store'


const articleDetail: React.FC = () => {
  const plugins = [frontmatter(), highlight()]
  const [liked, setLiked] = useState<boolean>(false)
  const [likesNum, setLikesNum] = useState<number>(0)
  const match = useRouteMatch<any>('/blog/:article_id')
  const dispatch = useDispatch()
  const { articles, comments } = useSelector((state: RootState) => state.history)

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
      setLikesNum(res.data.article_zan)
      return res
    })
  )


  const renderAnchor = () => {
    const { Link } = Anchor
    let hast: any
    getProcessor({
      plugins: [
        {
          rehype: (p) =>
            p.use(() => (tree) => {
              hast = tree
            }),
        },
      ],
    }).processSync(data?.data.content!)
    return hast.children.map((item: any, key: number) => {
      if (item.tagName === 'h2') {
        return (
          <Anchor style={{ marginLeft: 20 }} key={key} offsetTop={80}>
            <Link
              key={Math.random()}
              href={`#user-content-${item.children[0]?.value}`}
              title={item.children[0]?.value}
            ></Link>
          </Anchor>
        )
      }
    })
  }

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

  return (
    <div className="detail-container">
      <div style={{ display: 'flex' }}>
        <Col xs={24} sm={24} md={24} lg={17}>
          <div className="detail-box">
            {loading ? (
              <Skeleton active />
            ) : (
              <>
                <div className="description">原创</div>
                <Viewer value={data?.data.content!} plugins={plugins}></Viewer>
                <Divider />
                <div className="meta">
                  <div className="meta-item">
                    <span>文章分类:</span>
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
                  <div className="meta-item">
                    <span>文章标签:</span>
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
                <Divider />

                <Comment />
              </>
            )}
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={7}>
          {!loading && (
            <Affix offsetTop={80}>
              <h3 style={{ margin: '0 0 20px 20px' }}>文章目录</h3>
              {renderAnchor()}
              <ul className="panel">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <li className="panel-item zan" onClick={handleLike}>
                    <svg className="icon">
                      <use xlinkHref="#icon-yanjingliulankeshi" />
                    </svg>
                  </li>
                  <span style={{ marginLeft: 10, color: '#777777' }}>
                    当前已被围观
                    <strong className="primary">{data?.data.article_view}</strong>次
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <li className="panel-item zan" onClick={handleLike}>
                    <LikeOutlined className={liked ? 'active zan' : 'zan'} />
                  </li>
                  <span style={{ marginLeft: 10, color: '#777777' }}>
                    当前已获得
                    <strong className={liked ? 'active primary' : 'primary'}>{likesNum}</strong>
                    人点赞
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <li className="panel-item">
                    <svg className="icon">
                      <use xlinkHref="#icon-pinglun" />
                    </svg>
                  </li>
                  <span style={{ marginLeft: 10, color: '#777777' }}>
                    当计<strong className="primary">0</strong> 条评论
                  </span>
                </div>
                <li className="panel-item">
                  <GithubFilled className="icon" />
                </li>
                <li className="panel-item">
                  <WechatFilled className="icon" style={{ color: 'green' }} />
                </li>
                <li className="panel-item">
                  <svg className="icon">
                    <use xlinkHref="#icon-juejin" />
                  </svg>
                </li>
              </ul>
            </Affix>
          )}
        </Col>
      </div>
    </div>
  )
}

export default React.memo(articleDetail)
