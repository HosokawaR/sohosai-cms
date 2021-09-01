import { ContentCategory } from '@/types/type'

export const paths = Object.freeze({
  top: {
    label: () => 'トップ',
    path: () => '/',
  },
  signin: {
    label: () => 'サインイン',
    path: () => '/signin',
  },
  signout: {
    label: () => 'サインアウト',
    path: () => '/signout',
  },
  contents: {
    label: () => 'マイコンテンツ管理',
    path: () => '/contents',
  },
  postedContents: {
    label: () => 'コンテンツ一覧',
    path: () => '/posted-contents',
  },
  contact: {
    label: () => 'お問い合わせ',
    path: () => '/contact',
  },
  faq: {
    label: () => 'よくある質問',
    path: () => '/faq',
  },
  editArticle: {
    label: (title: string) => title,
    path: (id: string) => `/contents/${id}/edit`,
  },
  auditArticle: {
    label: (title: string) => title,
    path: (id: string) => `/contents/${id}/audit`,
  },
  reflectAuthority: {
    label: '権限更新',
    path: () => '/reflect-authority',
  },
})

// TODO: ContentCategoryValue 型をつける
export const contentCategory :ContentCategory[] = [
  {
    value: 'general',
    label: '一般企画',
    deadline: new Date(2021, 8, 31, 0, 0),
  },
  {
    value: 'academic',
    label: '学術企画',
    deadline: new Date(2021, 8, 31, 0, 0),
  },
  {
    value: 'other',
    label: 'その他',
    deadline: new Date(2021, 8, 31, 0, 0),
  },
]
