export interface Iresponse<T> {
  total: number;
  requestId: string;
  offset: number;
  limit: number;
  data: T;
}

export type articleType = {
  _id: string;
  content: string;
  origin: string;
  state: string;
  thumb: string;
  title: string;
  _createTime: number;
  _updateTime: number;
  description: string;
  article_category: categoryType[];
  article_tag: tagType[];
};
export type categoryType = {
  _id: string;
  category_name: string;
  category_banner: string;
  _createTime: number;
  _updateTime: number;
};
export type tagType = {
  _id: string;
  tag_name: string;
  tag_color: string;
  tag_banner: string;
  _createTime: number;
  _updateTime: number;
};
