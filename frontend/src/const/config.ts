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
