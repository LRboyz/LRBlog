import { articleType } from "@/types/base";
import { Iresponse } from "@/types/base";
import request from "../http";

// 查询文章列表
export const getArticleList = async (
  data: any,
  params?: any
): Promise<Iresponse<articleType[]>> => {
  return await request(`/article/find`, {
    method: "POST",
    params: {
      ...params,
    },
    data,
  });
};

// 获取单个文章详情
export const getArticleDetail = async (
  article_id: string
): Promise<{
  data: articleType;
}> => {
  return await request(`/article/${article_id}`, {
    method: "GET",
  });
};
