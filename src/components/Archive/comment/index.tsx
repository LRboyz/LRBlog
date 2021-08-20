import React, {
  useEffect,
  useRef,
  useState
} from 'react'
import { arrayToTree } from '@/utils'
import {
  Avatar,
  Button,
  Comment,
  Form,
  Input,
  message,
  Skeleton,
  Tooltip,
  Divider
} from 'antd'
import { commentType } from '@/types/base'
import { getCommentData, postCommentData } from '@/services/api/comment'
import styles from './style.module.less'

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
  const { TextArea } = Input
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
    // console.log(modalVisibility, 'visit')
  }

  const fetchCommentList = async () => {
    setSubmitting(true)
    await getCommentData(article_id).then(res => {
      setComments(arrayToTree(res.data))
      setCommentTotal(res.total)
      setSubmitting(false)
    }).catch(err => {
      setSubmitting(false)
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
    if (item._id === currentCommentId) {
      setCurrentCommentId('')
    } else {
      setCurrentCommentId(item._id)
    }
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
      await fetchCommentList()
      message.success("发布评论成功！")
      form.resetFields()
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
      author={<span style={{ color: '#333333', fontSize: 13 }}>{comment.comment_author.name}</span>}
      avatar={
        <Avatar
          src="https://sf1-ttcdn-tos.pstatp.com/img/mosaic-legacy/3793/3131589739~300x300.image"
          alt="avatar"
          size="default"

        />
      }
      content={
        <div >
          <div style={{ padding: '10px 0' }}>
            {
              comment.pid && (
                <span>回复
                  <span style={{ color: '#406599' }}> {comment.pid.comment_author.name}:</span>
                </span>)
            }
            <span style={{ marginLeft: 10 }}>{comment.comment_content}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Tooltip key="comment-basic-like" title="赞" >
              <div onClick={like} className="likes">
                <svg className={styles.icon}>
                  <use xlinkHref="#icon-dianzan-copy-copy" />
                </svg>
                &nbsp;
              </div>
            </Tooltip>
            <span className={styles.replyBtn} onClick={() => handleReply(comment)}>
              {comment._id === currentCommentId ? "取消回复" : "回复"}
            </span>
          </div>

          {
            comment._id === currentCommentId && (
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
            <div key={key} style={{ background: '#fafbfc' }}>
              {commentItem(item)}
            </div>
          )
        })
      }
    </Comment>
  )

  return (
    <div className={styles.commentWrapper}>
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
                <TextArea rows={2} placeholder="写下您的评论..." />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  发布
                </Button>
              </Form.Item>
            </>
          }
        />

        <Divider />
        <h3 style={{ fontWeight: 'bold' }}>评论区({commentTotal}条评论)</h3>
        {
          <div className={styles.commentList}>
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
