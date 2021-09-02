import { AriticleOverview, FireStoreAriticle } from '@/types/type'
import firebase from 'firebase'
import 'firebase/firestore'

/**
 * コンテンツ一覧を取得する
 * auditor 以外が使用すると権限エラーになる
 */
export const getContents = async (): Promise<{
  articles: AriticleOverview[]
}> => {
  const articles: AriticleOverview[] = []
  await firebase
    .firestore()
    .collectionGroup(`articles`)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const article = doc.data() as FireStoreAriticle
        articles.push({
          ...article,
          createAt: article.createAt.toDate(),
          updateAt: article.updateAt.toDate(),
        } as AriticleOverview)
      })
    })
  return { articles }
}
