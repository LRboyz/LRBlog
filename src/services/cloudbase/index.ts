import cloudbase from '@cloudbase/js-sdk'

const app = cloudbase.init({
    env: "lrblog-0gonx238c9955a8b"
})

const db = app.database()

export const test = async () => {
    const data = await db.collection("article").get()
    console.log("测试数据", data)
}
