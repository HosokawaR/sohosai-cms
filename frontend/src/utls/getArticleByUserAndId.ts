import { Ariticle, FireStoreAriticle } from '@/types/type'
import firebase from 'firebase'

export const getArticleByUserAndId = async (
  userId: string,
  articleId: string
): Promise<Ariticle> => {
  const overviewDoc = await firebase
    .firestore()
    .doc(`contents/${userId}/articles/${articleId}`)
    .get()
  const overview = overviewDoc.data() as FireStoreAriticle
  const article: Ariticle = {
    ...overview,
    contentHtml: '',
    createAt: overview.createAt.toDate(),
    updateAt: overview.updateAt.toDate(),
  }
  if (overview.category !== 'unselected') {
    const bodyRef = firebase
      .storage()
      .ref(`articleBodies/${userId}/${overview.category}/${articleId}`)
    const url = await bodyRef.getDownloadURL()
    const response = await fetch(url)
    const text = await response.text()
    console.log(text)

    article.contentHtml = text
  }
  return article
}
