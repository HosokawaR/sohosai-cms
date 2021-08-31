import { Ariticle, FireStoreAriticle } from '@/types/type'
import firebase from 'firebase'
import 'firebase/firestore'

export const getArticleById = async (id: string) => {
  const articles: Ariticle[] = []
  await firebase
    .firestore()
    .collectionGroup(`articles`)
    .where('id', '==', id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const article = doc.data() as FireStoreAriticle
        articles.push({
          ...article,
          createAt: article.createAt.toDate(),
          updateAt: article.updateAt.toDate(),
        } as Ariticle)
      })
    })
  return articles[0]
}
