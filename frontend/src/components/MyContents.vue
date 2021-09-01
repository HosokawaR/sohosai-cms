<template>
  <div class="my-contents">
    <Breadcrumbs :navigations="navigations" />
    <Title title="マイコンテンツ管理" />
    <div class="heading">記事投稿</div>
    <div class="description">
      <p>ブログのように sohosai.com 上に記事を投稿できます。</p>
    </div>
    <div v-for="article in articles" :key="article.title">
      <CardArticle :article="article" action="編集" @click="handleEditArticle" />
    </div>
    <Button class="create-button" @click="handleCreateArticle" text="新しい記事を作成する" />
    <div class="heading">URL 掲載申請</div>
    <div class="description">
      <p>
        sohosai.com 上に企画ページへの URL
        を掲載します。すでに独自のページをご用意している企画者様はこちらをご利用ください。
        <br />※現在準備中
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import 'firebase/firestore'
import { defineComponent, ref } from 'vue'
import { paths } from '@/const/config'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Button from '@/components/Button.vue'
import firebase from 'firebase'
import { useRouter } from 'vue-router'
import 'firebase/auth'
import { getUser } from '@/utls/getUser'
import 'firebase/firestore'
import { getContentsByUserId } from '@/utls/getContentsByUserId'
import CardArticle from '@/components/CardArticle.vue'
import { Ariticle } from '@/types/type'
import Title from './Title.vue'

export default defineComponent({
  components: {
    Breadcrumbs,
    Button,
    CardArticle,
    Title,
  },
  async setup() {
    const router = useRouter()
    const user = getUser()
    if (!user) return;
    const navigations = ref([
      { label: paths.top.label(), path: paths.top.path() },
      { label: paths.contents.label(), path: paths.contents.path() },
    ])
    const { articles } = await getContentsByUserId(user?.uid || '')
    const handleCreateArticle = async () => {
      const now = new Date()
      const doc: Ariticle = {
        id: '',
        title: now.toLocaleString() + ' に作成した記事',
        contentHtml: '',
        updateAt: now,
        createAt: now,
        authorId: user.uid,
        state: "editable"
      }
      const ref = await firebase
        .firestore()
        .collection(`contents/${user.uid}/articles`)
        .doc()
      ref.set({ ...doc, id: ref.id })
      router.push(paths.editArticle.path(ref.id))
    }
    const handleEditArticle = (articleId: string) => {
      router.push(paths.editArticle.path(articleId))
    }
    return {
      handleCreateArticle,
      handleEditArticle,
      navigations,
      articles,
    }
  },
})
</script>

<style lang="scss" scoped>
.heading {
  @include fs-2;
  margin: 2rem 0 1rem;
}
.description {
  margin-bottom: 2rem;
}
.create-button {
  margin-top: 2rem;
}
</style>
