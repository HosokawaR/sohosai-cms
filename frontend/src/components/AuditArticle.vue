<template>
  <div class="audit-article">
    <Breadcrumbs :navigations="navigations" />
    <div class="title">{{ article.title }}</div>
    <div class="content" v-html="sanitizedHtml"></div>
  </div>
</template>

<script lang="ts">
import 'firebase/firestore'
import { defineComponent, ref } from 'vue'
import { getArticleById } from '@/utls/getArticleById'
import { paths } from '@/const/config'
import { sanitizeHtml } from '@/utls/sanitizeHtml'
import { useRoute } from 'vue-router'

export default defineComponent({
  async setup() {
    const route = useRoute()
    const articleId = String(route.params.id)
    const article = await getArticleById(articleId)
    const sanitizedHtml = sanitizeHtml(article.contentHtml)
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
      sanitizedHtml,
    }
  },
})
</script>

<style lang="scss" scoped></style>
