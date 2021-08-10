import { commentType, Iresponse } from "@/types/base"
import request from "../http"

// 发送一级评论
export const postCommentData = async (data: any) => {
    return await request(`/comment`, {
        method: "POST",
        data: {
            data: { ...data }// 腾讯云文档要求这个规范 - -!
        }
    })
}

// 发送回复评论
export const postReplyCommentData = async (data: any) => {
    return await request(`/comment/${data.pid}`, {
        method: 'PATCH',
        data: {
            data: {
                "$push": {
                    "childrens": {
                        ...data
                    }
                }
            }
        }
    })
}

export const getCommentData = async (params?: any): Promise<Iresponse<commentType[]>> => {
    return await request('/comment', {
        method: "GET",
        params: { ...params }
    })
}

// export const getCommentDataById = async ()
