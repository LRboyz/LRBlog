import cloudbase from '@cloudbase/js-sdk'

const app = cloudbase.init({
  env: 'lrblog-0gonx238c9955a8b',
})

const db = app.database()
const _ = db.command

export const updateArticleView = async (article_id: string) => {
  try {
    db.collection('article')
      .doc(article_id)
      .update({
        article_view: _.inc(1),
      })
      .then((res) => {
        // console.log(res, "updateView")
      })
  } catch (error) {
    console.log(error)
  }
}
