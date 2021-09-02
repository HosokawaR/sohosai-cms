import { Ariticle } from '@/types/type'
import firebase from 'firebase'

export const updateArticleByUserAndId = async (
  article: Ariticle,
  userId: string
): Promise<void> => {
  const _doc = {
    ...article,
    createAt: firebase.firestore.Timestamp.fromDate(article.createAt),
    updateAt: firebase.firestore.Timestamp.now(),
  }
  const articleId = article.id
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { contentHtml, ...doc } = _doc
  await firebase
    .firestore()
    .doc(`contents/${userId}/articles/${articleId}`)
    .update(doc)
  const bodyRef = firebase
    .storage()
    .ref(`articleBodies/${userId}/${article.category}/${articleId}`)
  await bodyRef.putString(article.contentHtml)
}
