import { articleType } from '@/types/base'
import { Iresponse } from '@/types/base'
import request from '../http'

// 根据分类查询文章列表
export const getArticleListByCategory = async (data: any): Promise<Iresponse<articleType[]>> => {
  return await request(`/article/find`, {
    method: 'POST',
    data,
    params: {
      limit: 5,
      skip: data.skip,
    },
  })
}

// 纯查询文章列表
export const getArticleList = async (params: any): Promise<Iresponse<articleType[]>> => {
  return await request(`/article`, {
    method: 'GET',
    params: {
      ...params,
    },
  })
}

// 获取单个文章详情
export const getArticleDetail = async (
  article_id: string
): Promise<{
  data: articleType
}> => {
  return await request(`/article/${article_id}`, {
    method: 'GET',
  })
}
