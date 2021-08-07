import React, { createElement, useEffect, useState, useRef } from 'react'
import { Comment, Tooltip, Avatar, List, Form, Input, Button, message } from 'antd'
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons'
import './style.less'
import moment from 'moment'
import { getCommentData, postCommentData } from '@/services/api/comment'
import { commentType } from '@/types/base'
import { random } from 'lodash'
import { scrollToElem } from '@/utils/scroll'

type Props = {
  article_id: string
}
const comment: React.FC<Props> = ({ article_id }) => {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const inputRef = useRef(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPlaceHolder, setCurrentPlaceHolder] = useState<string>('写下你的评论...')
  // const [showReplyInput, setReplyInput] = useState<boolean>(false)
  const [action, setAction] = useState<any>(null)
  const [currentCommentId, setCurrentCommentId] = useState<string>("")
  const [value, setValue] = useState("")
  const [comments, setComments] = useState<commentType[]>([])
  const { TextArea } = Input
  const [form] = Form.useForm()

  useEffect(() => {
    fetchCommentList()
  }, [])

  const fetchCommentList = async () => {
    const { data } = await getCommentData()
    setComments(data)
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
    // console.log('点击了回复', inputRef.current)
    // setCurrentCommentId(comment_id)
    // 动态滚动到输入框的位置，并且进行focus

    scrollToElem('.ant-input', 500, -240)
    setCurrentPlaceHolder(`回复${item.comment_author.name}:`)
    const Ref = inputRef.current as any
    // Ref.setValue("")
    Ref.focus()
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
      article_id: article_id,
      comment_author: {
        name: `用户${Math.random() * 100}`,
        email: `用户${Math.random() * 100}@github.com`
      }
    }
    setLoading(true)
    await postCommentData(commentInfo)
    await getCommentData().then(res => {
      setComments(res.data)
      setLoading(false)
      message.success("发布评论成功！")
    }).catch(err => message.error("评论失败！"))
  }

  const handleFocus = () => {
    setCurrentCommentId('')
    setCurrentPlaceHolder('')
  }

  return (
    <div className="comment-container">
      <Form form={form} onFinish={handleSubmit}>
        {/* <div className="input-group">
          <div className="input-item">
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '請輸入您的用戶名',
                },
              ]}
            >
              <Input placeholder="名字" />
            </Form.Item>
          </div>
          <div className="input-item">
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: '您的邮箱格式有误!',
                },
                {
                  required: true,
                  message: '请输入您的邮箱!',
                },
              ]}
            >
              <Input placeholder="邮箱" />
            </Form.Item>
          </div>
          <div className="input-item">
            <Form.Item
              name="avatar"
            // rules={[
            //   {
            //     required: true,
            //     message: '请输入您的头像网址!',
            //   },
            // ]}
            >
              <Input placeholder="头像网址(仅用于生成头像)" />
            </Form.Item>
          </div>
        </div> */}


        <Comment
          // actions={actions}
          // author={<a>TianGo</a>}
          avatar={
            <Avatar
              src="https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/4221a1e99ec6e23bc4c6c4716bb6d3ea~300x300.image"
              alt="avatar"
            />
          }
          content={
            <>
              <Form.Item name="comment_content">
                <Input ref={inputRef} onChange={handleChange} allowClear value={value} placeholder={currentPlaceHolder} onFocus={handleFocus} />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" loading={loading} type="primary">
                  {loading ? "发布中" : "发布"}
                </Button>
              </Form.Item>
            </>
          }

        />


        {comments.length > 0 &&
          <List
            dataSource={comments}
            header={<h3 style={{ fontWeight: 'bold' }}>评论({comments.length})</h3>}
            itemLayout="horizontal"
            renderItem={(item) =>
              <Comment
                author={item.comment_author.name}
                avatar={
                  <Avatar
                    src="https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/4221a1e99ec6e23bc4c6c4716bb6d3ea~300x300.image"
                    alt="avatar"
                  />
                }
                actions={
                  [
                    <div style={{ width: '100%' }} >
                      <Tooltip key="comment-basic-like" title="赞" >
                        <span onClick={like} className="like">
                          {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}&nbsp;
                          <span className="comment-action">{likes}</span>
                        </span>
                      </Tooltip>
                      <span key="comment-basic-reply-to" className="reply-btn" onClick={() => handleReply(item)}>回复</span>
                      {/* <Form.Item name="content"> */}

                      {/* </Form.Item> */}
                    </div >
                  ]
                }
                content={item.comment_content}

              />}
          />}
      </Form>
    </div>
  )
}

export default React.memo(comment)
