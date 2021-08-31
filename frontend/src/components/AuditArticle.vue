<template>
  <div class="audit-article">
    <Breadcrumbs :navigations="navigations" />
    <div class="title">{{ article.title }}</div>
    <div class="content" v-html="article.contentHtml"></div>
  </div>
</template>

<script lang="ts">
import { paths } from '@/const/config'
import { defineComponent, ref } from 'vue'
import Breadcrumbs from './Breadcrumbs.vue'
import firebase from 'firebase'
import 'firebase/firestore'
import { getArticleById } from '@/utls/getArticleById'
import { useRoute } from 'vue-router'

export default defineComponent({
  async setup() {
    const route = useRoute()
    const articleId = String(route.params.id)
    const article = await getArticleById(articleId)
    const navigations = ref([
      { label: paths.contents.label(), path: paths.contents.path() },
      {
        label: paths.editArticle.label(article.title || ''),
        path: paths.editArticle.path(String(articleId)),
      },
    ])
    return {
      navigations,
      article,
    }
  },
})
</script>

<style lang="scss" scoped></style>
