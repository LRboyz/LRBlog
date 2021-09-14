export const Toc = (hast: any) => {
    let items: any = []
    let minLevel = 6
    let currentHeadingIndex = 0
    const stringifyHeading = (node: Element & { children: any, type: any }) => {
        // console.log(node.children[0].value, 'node...')
        let result = ''
        if (node.type === 'element') {
            result += node.children[0].value
        }
        // console.log(result)
        return result
    }
    hast.children
        .filter((v: Element & { type: any }) => v.type === 'element')
        .forEach((node: any, index: number) => {
            if (node.tagName[0] === 'h' && !!node.children.length) {
                const i = Number(node.tagName[1])
                minLevel = Math.min(minLevel, i)
                items.push({
                    level: i,
                    text: stringifyHeading(node),
                })
            }
            // console.log(currentBlockIndex, index);
            // if (currentBlockIndex >= index) {
            //     currentHeadingIndex = items.length - 1
            // }
        })
    return items
}
