import cloudbase from '@cloudbase/js-sdk'

const app = cloudbase.init({
  env: 'lrblog-0gonx238c9955a8b',
})

const db = app.database()
const _ = db.command

// 更新浏览量
export const updateArticleView = async (article_id: string) => {
  try {
    await db.collection('article')
      .doc(article_id)
      .update({
        article_view: _.inc(1),
      })
  } catch (error) {
    console.error(error)
  }
}
// 更新文章点赞数
export const updateArticleZan = async (article_id: string) => {
  try {
    await db.collection('article')
      .doc(article_id)
      .update({
        article_zan: _.inc(1),
      })
  } catch (error) {
    console.error(error)
  }
}

// 查询用户身份是否正确
export const queryUserAuth = async (form: { username: string, user_pwd: string }): Promise<any> => {
  try {
    return await db.collection("blog_user").where(form).count()
  } catch (error) {
    console.error(error)
  }
}

export const queryUserInfo = async (form: { username: string, user_pwd: string }): Promise<any> => {
  console.log(form, 'LoginForm')
  try {
    return await db.collection("blog_user").where(form).get()
  } catch (error) {
    console.error(error)
  }
}
