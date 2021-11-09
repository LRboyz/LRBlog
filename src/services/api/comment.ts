import { commentType, Iresponse } from "@/types/base"
import { arrayToTree } from "@/utils"
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

export const getCommentData = async (data?: any): Promise<Iresponse<commentType[]>> => {
    const res = await request('/comment/find', {
        method: "POST",
        data
    })
    return res
}

// 设置评论用户
export const postCommentUserInfo = async (data: any) => {
    return await request('/comment_user', {
        method: 'POST',
        data: {
            data: { ...data }
        }
    })
}
// export const getCommentDataById = async ()
