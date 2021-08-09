import React, { createElement, useEffect, useState, useRef } from 'react'
import { Comment, Tooltip, Avatar, List, Form, Input, Button, message } from 'antd'
import { LikeFilled, LikeOutlined } from '@ant-design/icons'
import './style.less'
import { getCommentData, postCommentData } from '@/services/api/comment'
import { commentType } from '@/types/base'
import { scrollToElem } from '@/utils/scroll'

type Props = {
  article_id: string
}
const comment: React.FC<Props> = ({ article_id }) => {
  const [commentTotal, setCommentTotal] = useState<number>(0)
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [replyed, setReplyed] = useState<boolean>(false)
  const [currentPlaceHolder, setCurrentPlaceHolder] = useState<string>('写下你的评论...')
  // const [showReplyInput, setReplyInput] = useState<boolean>(false)
  const [action, setAction] = useState<string | null>(null)
  const [currentCommentId, setCurrentCommentId] = useState<string>("")
  const [value, setValue] = useState("")
  const [comments, setComments] = useState<commentType[]>([])
  const { TextArea } = Input
  const [form] = Form.useForm()
  const inputRef = useRef<Input | null>(null)

  useEffect(() => {
    // setComments(commentData!)
    fetchCommentList()

  }, [])

  useEffect(() => {
    // 动态滚动到输入框的位置，并且进行focus
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })

  const fetchCommentList = async () => {
    await getCommentData(article_id).then(res => {
      setComments(res.data)
      setCommentTotal(res.total)
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
    // console.log("comment_id:", comment_id)
    setReplyed(!replyed)
    setCurrentCommentId(old => item._id)
    // scrollToElem('.ant-input', 500, -240)
    setCurrentPlaceHolder(`回复${item.comment_author.name}:`)

    // const Ref = inputRef.current as any
    // // Ref.setValue("")
    // inputRef.current.focus()
    // document.getElementById("#myInput")?.focus()
    // focus 输入框
    // document.getElementById('comment-textarea').focus()
  }
  const handleChange = (e: any) => {
    // console.log(e, 'e')
    setValue(old => e.target.value)
  }
  const handleSubmit = async (values: any) => {
    // console.log(values, 'values')
    const commentInfo = {
      ...values,
      article_id,
      comment_author: {
        name: `用户${Math.random() * 100}`,
        email: `用户${Math.random() * 100}@github.com`
      }
    }

    setLoading(true)
    try {
      await postCommentData(commentInfo)
      await getCommentData(article_id).then(res => {
        // console.log(res)
        setComments(res.data)
        setLoading(false)
        message.success("发布评论成功！")
      })
    } catch (error) {
      console.error(error, 'error')
      message.error("评论失败！")
      setLoading(false)
    }
  }

  const handleFocus = () => {
    setCurrentCommentId('')
    setCurrentPlaceHolder('')
  }

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
                <Button htmlType="submit" loading={loading} type="primary">
                  {loading ? "发布中" : "发布"}
                </Button>
              </Form.Item>
            </>
          }

        />
        {
          comments.length > 0 && (
            <div className="comment-list">
              {
                comments.map(comment => {
                  return (
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
                          <Tooltip key="comment-basic-like" title="赞" >
                            <span onClick={like} className="like">
                              {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}&nbsp;
                              <span className="comment-action">{likes}</span>
                            </span>
                          </Tooltip>
                          <span className="reply-btn" onClick={() => handleReply(comment)}>{replyed && comment._id === currentCommentId ? '取消回复' : '回复'}</span>
                          {
                            replyed && comment._id === currentCommentId && (
                              <Comment
                                content={
                                  <>
                                    <Form.Item name="comment_content">
                                      <Input ref={inputRef} placeholder={currentPlaceHolder} />
                                    </Form.Item>
                                    <Form.Item>
                                      <Button htmlType="submit" loading={loading} type="primary">
                                        {loading ? "发布中" : "发布"}
                                      </Button>
                                    </Form.Item>
                                  </>
                                }

                              />
                            )
                          }
                        </div>
                      }

                    />
                  )
                })
              }
            </div>
          )
        }
      </Form>
    </div >
  )
}

export default comment
