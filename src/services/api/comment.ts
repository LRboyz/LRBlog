import { commentType, Iresponse } from "@/types/base"
import request from "../http"

export const postCommentData = async (data: any) => {
    return await request(`/comment`, {
        method: "POST",
        data: {
            ...data
        }
    })
}

export const getCommentData = async (params?: any): Promise<Iresponse<commentType[]>> => {
    return await request('/comment', {
        method: "GET",
        params: { ...params }
    })
}
