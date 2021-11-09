import React, {
  useEffect,
  useRef,
  useState
} from 'react'
import { arrayToTree, generateDiceBearBottts } from '@/utils'
import {
  Avatar,
  Button,
  Comment,
  Form,
  Input,
  message,
  Skeleton,
  Tooltip,
  Divider,
  Row,
  Col
} from 'antd'
import { commentType } from '@/types/base'
import { getCommentData, postCommentData } from '@/services/api/comment'
import styles from './style.module.less'
import { useDispatch, useSelector } from 'react-redux'
import { getComments, submitComment, setCommentUserInfo } from '@/store/commentSlice'
import { RootState } from '@/store'

type Props = {
  article_id: string
  author: {
    avatar: string
    name: string
    email: string
  }
}
const comment: React.FC<Props> = ({ article_id, author }) => {

  const dispatch = useDispatch()
  const { fetching, comments, total, comment_user_info } = useSelector((state: RootState) => state.comment)
  const [commentTotal, setCommentTotal] = useState<number>(0)
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [replying, setReplying] = useState<boolean>(false)
  const [modalVisibility, setModalVisibility] = useState<{ [propsName: string]: boolean }>({})
  const [currentPlaceHolder, setCurrentPlaceHolder] = useState<string>('写下你的评论...')
  const [action, setAction] = useState<string | null>(null)
  const [currentCommentId, setCurrentCommentId] = useState<string>("")
  // const [comments, setComments] = useState<commentType[]>([])
  const [form] = Form.useForm()
  const { TextArea } = Input
  const inputRef = useRef<Input | null>(null)

  useEffect(() => {
    dispatch(getComments(article_id))
  }, [])
  console.log(comments, fetching, comment_user_info, '评论列表')
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

  // const fetchCommentList = async () => {
  //   setSubmitting(true)
  //   await getCommentData(article_id).then(res => {
  //     setComments(arrayToTree(res.data))
  //     setCommentTotal(res.total)
  //     setSubmitting(false)
  //   }).catch(err => {
  //     setSubmitting(false)
  //   })
  // }

  const like = () => {
    setLikes(1)
    setDislikes(0)
    // setAction('liked')
  }

  const dislike = () => {
    setLikes(0)
    setDislikes(1)
    // setAction('disliked')
  }
  const handleReply = (item: commentType) => {
    if (item._id === currentCommentId) {
      setCurrentCommentId('')
    } else {
      setCurrentCommentId(item._id)
    }
    setCurrentPlaceHolder(`回复${item.comment_author.name}:`)
  }
  const handleSubmit = async (comment: any) => {
    const commentUserInfo = comment_user_info.name ? comment_user_info : {
      name: comment.name,
      email: comment.email,
      job: comment.job,
      avatar: generateDiceBearBottts(Math.random())
    }
    if (comment.reply_content) {
      setReplying(true)
      await postComment({
        pid: currentCommentId,
        comment_content: comment.reply_content,
        comment_author: commentUserInfo,
        article_id
      })
    } else {
      setSubmitting(true)
      await postComment({
        comment_content: comment.comment_content,
        comment_author: commentUserInfo,
        article_id
      })
    }
  }
  // 发送评论
  const postComment = async (commentData: any) => {
    try {
      dispatch(setCommentUserInfo(commentData))
      await dispatch(submitComment(commentData)) // postCommentData(commentData)
      await dispatch(getComments(article_id))
      setSubmitting(false)
      setReplying(false)
      message.success("发布评论成功！")
      form.resetFields()
    } catch (error) {
      console.error(error, 'error')
      message.error("评论失败！")
      setSubmitting(false)
      setReplying(false)
    }
  }

  const commentItem = (comment: commentType) => (
    <Comment
      key={comment._id}
      // actions={actions}
      author={<span style={{ color: '#333333', fontSize: 13 }}>{`${comment.comment_author.name}${author.name === comment.comment_author.name ? '(作者)' : ''}`}</span>}
      avatar={
        <Avatar
          src={comment.comment_author.avatar}
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
                  <span style={{ color: '#406599' }}> {`${comment.pid.comment_author.name}${author.name === comment.pid.comment_author.name ? '(作者)' : ''}`}:</span>
                </span>)
            }
            <span style={{ marginLeft: 10 }}>{comment.comment_content}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Tooltip key="comment-basic-like" title="赞" >
              <div onClick={like} className={styles.likes}>
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
                      <Button htmlType="submit" loading={replying} type="primary">
                        {replying ? "发送中" : "发送"}
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
        <h3 style={{ fontWeight: 'bold' }}>评论区({total}条评论)</h3>
        <Comment
          // actions={actions}
          // author={<a>TianGo</a>}
          avatar={
            <Avatar
              src={comment_user_info.avatar || 'https://cdn.surmon.me/images/comment/anonymous.jpg'}
              alt="avatar"
              size="default"

            />
          }
          content={
            <>
              {
                comment_user_info && comment_user_info.name ?
                  <div style={{ width: '100%', paddingBottom: '10px', textAlign: 'left' }}>
                    <span style={{ fontWeight: 'bold' }}>{comment_user_info.name}</span>
                  </div> :
                  <Form.Item>
                    <Input.Group >
                      <Row gutter={8}>
                        <Col span={8}>
                          <Form.Item name="name" rules={[{ required: true, message: '请输入您的名字！' }]}>
                            <Input placeholder="名字*" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item name="email" rules={[{ required: true, type: 'email', message: '邮箱格式不正确！' }]}>
                            <Input placeholder="邮箱*" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item name="job">
                            <Input placeholder="职业*" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Input.Group>
                  </Form.Item>
              }
              <Form.Item name="comment_content">
                <TextArea rows={2} placeholder="写下您的评论..." />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary" loading={submitting}>
                  {submitting ? '发布中' : '发布'}
                </Button>
              </Form.Item>
            </>
          }
        />
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
