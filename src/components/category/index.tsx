import React, { useEffect } from 'react';
import { Avatar, Empty, Skeleton } from 'antd';
import { RightCircleTwoTone } from '@ant-design/icons';
import './style.less'
import { useRequest } from 'ahooks';
import { getCategoryList } from '@/services/api/catetgory';

const Category: React.FC = () => {
    useEffect(() => { });
    const [currentIndex, setCurrentIndex] = React.useState<number>();
    const { data, error, loading } = useRequest(async () => {
        return await getCategoryList();
    });
    return (
        <div className="category-container">
            <ul className="category-list">
                {data?.data.map((item, index) => {
                    return (
                        <li className={`mb-sm ${currentIndex === index ? 'active' : ''}`} key={index} onClick={() => setCurrentIndex(index)}>
                            <Avatar src={item.category_banner} />
                            <span className="fs-sm">{item.category_name}</span>
                            <RightCircleTwoTone />
                        </li>
                    );
                })}
                {loading && (
                    <div>
                        {[1, 2, 3, 4].map((item, key) => {
                            return (
                                <Skeleton
                                    key={key}
                                    className="mb-sm"
                                    loading={loading}
                                    active
                                    avatar={{ size: 'small', shape: 'square' }}
                                    title={false}
                                    paragraph={{ rows: 1, width: 100 }}
                                />
                            );
                        })}
                    </div>
                )}
                {/* 空数据 */}
                {data?.data.length === 0 && !loading && (
                    <Empty description={<span className="fs-xs empty">暂无分类......(～￣▽￣)～</span>} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            </ul>
        </div>
    );
};

export default React.memo(Category);
