import firebase from 'firebase'

export type ContentCategoryValue =
  | 'general'
  | 'academic'
  | 'art'
  | 'stage'
  | 'other'

export type ContentState = 'editable' | 'examined' | 'verified' | 'rejection'

export type ContentCategory = {
  value: ContentCategoryValue
  label: string
  deadline: Date
}

type CommonAriticle = {
  id: string
  title: string
  contentHtml: string
  category?: ContentCategoryValue
  authorId: string
  state: ContentState
}

export type Ariticle = CommonAriticle & {
  createAt: Date
  updateAt: Date
}

export type FireStoreAriticle = CommonAriticle & {
  createAt: firebase.firestore.Timestamp
  updateAt: firebase.firestore.Timestamp
}

export type FunctionsResponse = {
  status: number
  message: string
}
