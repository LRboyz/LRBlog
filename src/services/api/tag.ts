import { tagType } from "@/types/base"
import { Iresponse } from "@/types/base"
import request from "../http"

export const getTagList = async (): Promise<Iresponse<tagType[]>> => {
    return await request(`/tag`, {
        method: "GET",
    })
}
