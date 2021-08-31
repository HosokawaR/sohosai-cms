import firebase from 'firebase'

export type ContentCategory = 'general'

export type Ariticle = {
  id: string
  title: string
  contentHtml: string
  category?: ContentCategory
  createAt: Date
  updateAt: Date
  authorId: string
}

export type FireStoreAriticle = {
  id: string
  title: string
  contentHtml: string
  category?: ContentCategory
  createAt: firebase.firestore.Timestamp
  updateAt: firebase.firestore.Timestamp
  authorId: string
}

export type FunctionsResponse = {
  status: number
  message: string
}
