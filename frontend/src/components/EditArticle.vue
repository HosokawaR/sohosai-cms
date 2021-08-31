<template>
  <div class="create-article">
    <Breadcrumbs :navigations="navigations" />
    <div class="wrap title-wrap">
      <FieldText v-model="title" label="タイトル" />
    </div>
    <div class="wrap content-wrap">
      <div class="heading">本文</div>
      <QuillEditor
        theme="snow"
        toolbar="full"
        v-model:content="contentHtml"
        contentType="html"
      />
    </div>
    <div class="wrap">
      <div class="heading">企画区分</div>
      <Option />
    </div>
    <Button @click="handlePostClick" text="投稿する" />
  </div>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import 'firebase/firestore'
import { defineComponent, ref } from 'vue'
import { paths } from '@/const/config'
import { QuillEditor } from '@vueup/vue-quill'
import Breadcrumbs from './Breadcrumbs.vue'
import Button from './Button.vue'
import FieldText from '@/components/FieldText.vue'
import firebase from 'firebase'
import Option from '@/components/Select.vue'
import { useRoute } from 'vue-router'
import { getUser } from '@/utls/getUser'

export default defineComponent({
  components: {
    QuillEditor,
    FieldText,
    Option,
    Breadcrumbs,
    Button,
  },
  async setup() {
    const route = useRoute()
    const articleId = route.params.id
    const user = getUser()
    const article = (
      await firebase
        .firestore()
        .doc(`contents/${user?.uid}/articles/${articleId}`)
        .get()
    ).data()
    const title = ref(article?.title || '')
    const contentHtml = ref(article?.contentHtml || '')
    const navigations = ref([
      { label: paths.contents.label(), path: paths.contents.path() },
      {
        label: paths.editArticle.label(article?.title || ''),
        path: paths.editArticle.path(String(articleId)),
      },
    ])
    const handlePostClick = () => {
      console.log('post click')
      const doc = {
        title: title.value,
        contentHtml: contentHtml.value,
        updateAt: new Date(),
      }
      firebase
        .firestore()
        .doc(`contents/${user?.uid}/articles/${articleId}`)
        .update(doc)
    }

    return {
      title,
      contentHtml,
      navigations,
      handlePostClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.wrap {
  margin-bottom: 4rem;
}
</style>
