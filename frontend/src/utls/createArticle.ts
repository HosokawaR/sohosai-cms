import { FireStoreAriticle } from '@/types/type'
import firebase from 'firebase'

export const createArticle = async (userId: string): Promise<string> => {
  const now = firebase.firestore.Timestamp.now()
  const doc: FireStoreAriticle = {
    id: '',
    title: now.toDate().toLocaleString() + ' に作成した記事',
    updateAt: now,
    createAt: now,
    authorId: userId,
    state: 'editable',
    category: 'unselected',
  }
  const ref = await firebase
    .firestore()
    .collection(`contents/${userId}/articles`)
    .doc()
  const articleId = ref.id
  ref.set({ ...doc, id: ref.id })
  return articleId
}
