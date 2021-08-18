import { avatarType, Iresponse } from "@/types/base"
import request from "../http"

export const getAvatarGroup = async (): Promise<Iresponse<avatarType[]>> => {
    return await request(`/avatar_group`, {
        method: "GET",
    })
}
