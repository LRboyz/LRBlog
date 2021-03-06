export interface Iresponse<T> {
  total: number
  requestId: string
  offset: number
  limit: number
  data: T
}

export type articleType = {
  _id: string
  content: string
  origin: string
  state: string
  thumb: string
  title: string
  article_view: number
  comment_count: number
  article_zan: number
  _createTime: number
  _updateTime: number
  description: string
  article_category: categoryType[]
  article_tag: tagType[]
  article_comment: commentType[]
  article_author?: {
    avatar: string
    name: string
    email: string
  }
}
export type categoryType = {
  _id: string
  category_name: string
  category_banner: string
  category_desc: string
  _createTime: number
  _updateTime: number
}
export type tagType = {
  _id: string
  tag_name: string
  tag_color: string
  tag_banner: string
  _createTime: number
  _updateTime: number
}

export type commentType = {
  _id: string
  comment_author: {
    name: string
    email: string
    job: string
    avatar: string
  },
  children: [commentType]
  comment_content: string
  pid: commentType
  agent: string
  comment_like: number
  ip: string
}

export type avatarType = {
  avatar_name: string;
  avatar_image: string;
}
