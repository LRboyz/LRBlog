
/**
 * 滚动到指定的元素
 * @param {String} elem DOM元素
 * @param {Number} duration 滚动动画执行的时间
 * @param {Number} offset 滚动偏移量
 */
export const scrollToElem = (elem: any, duration: number, offset: number) => {
    // 初始位置
    const startingY = window.pageYOffset
    const elementY = window.pageYOffset + document.querySelector(elem).getBoundingClientRect().top
    // 需要去滚动的距离
    const diff = elementY - startingY + offset
    // 如果 diff 0
    if (!diff) return
    const easing = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    let start = 0
    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp
        // 计算时间的差值，根据差值计算偏移量
        const time = timestamp - start
        let percent = Math.min(time / duration, 1)
        percent = easing(percent)
        window.scrollTo(0, startingY + diff * percent)

        if (time < duration) {
            window.requestAnimationFrame(step)
        }
    })
}
