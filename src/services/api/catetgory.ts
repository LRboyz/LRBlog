import { categoryType } from "@/types/base";
import { Iresponse } from "@/types/base";
import request from "../http";

export const getCategoryList = async (): Promise<Iresponse<categoryType[]>> => {
    return await request(`/category`, {
        method: "GET",
    });
};
