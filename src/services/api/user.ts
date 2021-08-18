import { Iresponse } from "@/types/base"
import request from "../http"

export const postRegisterForm = async (data: any) => {
    return await request(`/blog_user`, {
        method: 'POST',
        data,
    })
}