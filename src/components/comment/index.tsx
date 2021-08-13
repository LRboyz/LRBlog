import React, { createElement, useEffect, useState, useRef } from 'react'
import { Comment, Tooltip, Avatar, List, Form, Input, Button, message, Skeleton } from 'antd'
import { LikeFilled, LikeOutlined } from '@ant-design/icons'
import './style.less'
import { getCommentData, postCommentData, postReplyCommentData } from '@/services/api/comment'
import { commentType } from '@/types/base'
import { scrollToElem } from '@/utils/scroll'
import { arrayToTree } from '@/utils'

type Props = {
  article_id: string
}
const comment: React.FC<Props> = ({ article_id }) => {
  const [commentTotal, setCommentTotal] = useState<number>(0)
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [modalVisibility, setModalVisibility] = useState<{ [propsName: string]: boolean }>({})
  const [currentPlaceHolder, setCurrentPlaceHolder] = useState<string>('写下你的评论...')
  const [action, setAction] = useState<string | null>(null)
  const [currentCommentId, setCurrentCommentId] = useState<string>("")
  const [comments, setComments] = useState<commentType[]>([])
  const [form] = Form.useForm()
  const inputRef = useRef<Input | null>(null)

  useEffect(() => {
    fetchCommentList()
  }, [])

  useEffect(() => {
    // 动态滚动到输入框的位置，并且进行focus
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })

  const toggleModal = (comment_id: string) => {
    setModalVisibility((prevState: any) => {
      const newState = { ...prevState }
      newState[comment_id] = newState[comment_id] ? false : true
      return newState
    })
    console.log(modalVisibility, 'visit')
  }

  const fetchCommentList = async () => {
    setLoading(true)
    await getCommentData(article_id).then(res => {
      setComments(arrayToTree(res.data))
      setCommentTotal(res.total)
      setLoading(false)
    }).catch(err => {
      setLoading(false)
    })
  }

  const like = () => {
    setLikes(1)
    setDislikes(0)
    setAction('liked')
  }

  const dislike = () => {
    setLikes(0)
    setDislikes(1)
    setAction('disliked')
  }
  const handleReply = (item: commentType) => {
    toggleModal(item._id)
    setCurrentPlaceHolder(`回复${item.comment_author.name}:`)
  }
  const handleSubmit = async (values: any) => {
    let commentInfo = {
      ...values,
      article_id,
      comment_author: {
        name: `用户${Math.random() * 100}`,
        email: `用户${Math.random() * 100}@github.com`
      }
    }
    // console.log(values, 'values')
    if (values.reply_content) {
      console.log("回复评论")
      commentInfo = {
        ...values,
        comment_content: values.reply_content,
        pid: currentCommentId,
        comment_author: {
          name: `用户${Math.random() * 100}`,
          email: `用户${Math.random() * 100}@github.com`
        }
      }
    }
    await postComment(commentInfo)
  }
  // 发送评论
  const postComment = async (commentData: any) => {
    setSubmitting(true)
    try {
      await postCommentData(commentData)
      await getCommentData(article_id).then(res => {
        // console.log(res)
        setComments(res.data)
        setSubmitting(false)
        message.success("发布评论成功！")
        form.resetFields()
      })
    } catch (error) {
      console.error(error, 'error')
      message.error("评论失败！")
      setSubmitting(false)
    }
  }

  const commentItem = (comment: commentType) => (
    <Comment
      key={comment._id}
      // actions={actions}
      author={<span>{comment.comment_author.name}</span>}
      avatar={
        <Avatar
          src="https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/4221a1e99ec6e23bc4c6c4716bb6d3ea~300x300.image"
          alt="avatar"
          size="default"

        />
      }
      content={
        <div style={{ width: '100%' }}>
          <div style={{ padding: '10px 0' }}> {comment.comment_content}</div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Tooltip key="comment-basic-like" title="赞" >
              <div onClick={like} className="likes">
                <svg className="icon">
                  <use xlinkHref="#icon-dianzan-copy-copy" />
                </svg>
                &nbsp;
                <span >{1}</span>
              </div>
            </Tooltip>
            <span className="reply-btn" onClick={() => handleReply(comment)}>
              {modalVisibility[comment._id] ? '取消回复' : '回复'}
            </span>
          </div>

          {
            modalVisibility[comment._id] && (
              <Comment
                content={
                  <>
                    <Form.Item name="reply_content">
                      <Input ref={inputRef} placeholder={currentPlaceHolder} />
                    </Form.Item>
                    <Form.Item>
                      <Button htmlType="submit" loading={submitting} type="primary">
                        {submitting ? "发送中" : "发送"}
                      </Button>
                    </Form.Item>
                  </>
                }

              />
            )
          }
        </div>
      }>
      {
        comment.children && comment.children.map((item, key) => {
          return (
            <div key={key}>
              {commentItem(item)}
            </div>
          )
        })
      }
    </Comment>
  )

  return (
    <div className="comment-container">
      <Form form={form} onFinish={handleSubmit}>

        <Comment
          // actions={actions}
          // author={<a>TianGo</a>}
          avatar={
            <Avatar
              src="https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/4221a1e99ec6e23bc4c6c4716bb6d3ea~300x300.image"
              alt="avatar"
              size="default"

            />
          }
          content={
            <>
              <Form.Item name="comment_content">
                <Input placeholder="写下您的评论..." />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  发布
                </Button>
              </Form.Item>
            </>
          }

        />
        {

          <div className="comment-list">
            {
              loading ? <Skeleton /> : (
                comments.map(comment => {
                  return (
                    commentItem(comment)
                  )
                })
              )
            }
          </div>

        }
      </Form>
    </div >
  )
}

export default comment
