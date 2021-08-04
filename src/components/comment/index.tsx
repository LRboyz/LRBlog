import React, { createElement, useState } from 'react'
import { Comment, Tooltip, Avatar, List, Form, Input, Button } from 'antd'
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons'
import './style.less'
import moment from 'moment'

const comment: React.FC = () => {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [action, setAction] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState("")
  const [comments, setComments] = useState([])
  const { TextArea } = Input
  const [form] = Form.useForm()

  const CommentList = ({ comments }: any) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
    // renderItem={props => <Comment {...props} />}
    />
  )

  // const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
  //   <>
  //     <Form.Item>
  //       <TextArea rows={4} onChange={onChange} value={value} placeholder="写下你的评论..." />
  //     </Form.Item>
  //     <Form.Item>
  //       <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
  //         发布
  //       </Button>
  //     </Form.Item>
  //   </>
  // )

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
  const handleChange = (e: any) => {
    console.log(e, 'e')
    setValue(old => e.target.value)
  }
  const handleSubmit = (values: any) => {
    console.log("提交的数据：", values)
  }
  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ]
  return (
    <div className="comment-container">
      <h3>评论（358）</h3>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Form form={form} onFinish={handleSubmit}>
        <div className="input-group">
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
        </div>
        <Form.Item name="content">
          <Comment
            // actions={actions}
            // author={<a>TianGo</a>}
            avatar={
              <Avatar
                src="https://iconfont.alicdn.com/t/d82934be-d00e-4fbd-9192-e20c62ff53ba.png"
                alt="avatar"
              />
            }
            content={
              <>
                <Form.Item name="content">
                  <TextArea rows={4} onChange={handleChange} value={value} placeholder="写下你的评论..." />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" loading={submitting} type="primary">
                    发布
                  </Button>
                </Form.Item>
              </>
            }
          />
        </Form.Item>
      </Form>

    </div>
  )
}

export default React.memo(comment)
