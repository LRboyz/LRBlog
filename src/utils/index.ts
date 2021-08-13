// 時間格式化，轉換為多少天前
export const formatTime = (timestamp: number): string => {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    const ms = startOfDay.getTime()
    if (timestamp < ms) {
        return `${Math.ceil((ms - timestamp) / 86400000)}天前`
    } else {
        const time = new Date(timestamp)
        return `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`
    }
}

// 禁用React開發者工具
export const disableReactDevTools = (): void => {
    const noop = (): void => undefined
    const DEV_TOOLS = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__
    if (typeof DEV_TOOLS === 'object') {
        for (const [key, value] of (<any>Object).entries(DEV_TOOLS)) {
            DEV_TOOLS[key] = typeof value === 'function' ? noop : null
        }
    }
}


// 数组转树（评论区）

export const arrayToTree = (data: Array<any>) => {
    let result = [] as any
    data.forEach(item => {
        if (!item.pid) {
            result.push(item)
        } else {
            const parent = data.find(son => son._id === item.pid._id)
            Array.isArray(parent.children) ? parent.children.push(item) : parent.children = [item]
        }
    })
    console.log(result, 'result')
    return result
}
