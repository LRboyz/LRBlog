import React, { useCallback, useEffect, useRef, useState } from "react"
import { Avatar, Empty, Skeleton } from "antd"
import { RightCircleTwoTone } from "@ant-design/icons"
import styles from "./style.module.less"
import { useRequest } from "ahooks"
import { getCategoryList } from "@/services/api/catetgory"
import { useHistory, useRouteMatch } from "react-router-dom"
import { categoryType } from "@/types/base"

const CategoryList: React.FC = () => {
  const history = useHistory()
  const match = useRouteMatch<any>("/blog/:id")
  const [key, setKey] = useState<string>('')
  const { data, error, loading } = useRequest(async () => {
    return await getCategoryList()
  })
  const selectCategory = (item: categoryType, index: number) => {
    history.push(`/blog/${item._id}`)
    setKey(key === item._id ? key : item._id)
  }
  return (
    <div className={styles.categoryWrapper}>
      <ul className={styles.categoryList}>
        {data?.data.map((item, index) => {
          return (
            <li
              className={`mb-sm ${match?.params.id === item._id ? styles.active : ""
                }`}
              key={index}
              onClick={() => selectCategory(item, index)}
            >
              <Avatar src={item.category_banner} />
              <span className="fs-sm">{item.category_name}</span>
              <RightCircleTwoTone />
            </li>
          )
        })}
        {loading && (
          <div>
            {[1, 2, 3, 4].map((item, key) => {
              return (
                <Skeleton
                  key={key}
                  loading={loading}
                  active
                  avatar={{ size: "small", shape: "square" }}
                  title={false}
                  paragraph={{ rows: 1, width: 100 }}
                />
              )
            })}
          </div>
        )}
        {/* 空数据 */}
        {data?.data.length === 0 && !loading || error && (
          <Empty
            description={
              <span className="fs-xs empty">暂无分类......(～￣▽￣)～</span>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </ul>
    </div>
  )
}

export default CategoryList
