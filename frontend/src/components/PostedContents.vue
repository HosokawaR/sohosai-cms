<template>
  <div class="posted-contents">
    <div v-for="article in articles" :key="article.title">
      <CardArticle :article="article" @click="handleArticleClick" />
    </div>
  </div>
</template>

<script lang="ts">
import { paths } from '@/const/config'
import { Ariticle } from '@/types/type'
import { getContents } from '@/utls/getContents'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import CardArticle from './CardArticle.vue'

export default defineComponent({
  components: {
    CardArticle,
  },
  async setup() {
    const router = useRouter()
    const { articles } = await getContents()
    const handleArticleClick = (article: Ariticle) => {
      router.push(paths.auditArticle.path(article.id))
    }
    return {
      articles,
      handleArticleClick,
    }
  },
})
</script>
