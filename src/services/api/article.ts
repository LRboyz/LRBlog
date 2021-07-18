import { articleType } from "@/types/base";
import { Iresponse } from "@/types/base";
import request from "../http";

export const getArticleList = async (): Promise<Iresponse<articleType[]>> => {
  return await request(`/article`, {
    method: "GET",
  });
};
