import { useRequest } from "ahooks"
import styles from "./style.module.less"
import { Empty, Skeleton } from "antd"
import React from "react"

import { getTagList } from "@/services/api/tag"

const TagList: React.FC = () => {
  // const loading = props.loading === Status.inProgress ? true : false
  const { data, error, loading } = useRequest(async () => {
    // console.log(data, 'data...')
    return await getTagList()
  })
  return (
    <div>
      <div className={styles.tagWrapper}>
        <div className={styles.tagHeader}>
          <span className={styles.tagTitle}>标签</span>
        </div>
        <div className={styles.tagGroup}>
          {data?.data.map((item, index) => {
            return (
              <div
                className={styles.tagItem}
                key={item._id}
                style={{
                  background: item.tag_color, // '#' + Math.random().toString(16).slice(2, 8),
                  opacity: 0.8,
                }}
              >
                {item.tag_name}
              </div>
            )
          })}
          <div style={{ width: "100%", paddingTop: "10px" }}>
            {loading && <Skeleton loading={loading} active title={false} />}
            {/* 空数据 */}
            {data?.data.length === 0 && !loading || error && (
              <Empty
                description={
                  <span>暂无标签......(～￣▽￣)～</span>
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// type Props = {
//   tagList: Array<any>
//   loading: Status
// }
export default TagList
