<template>
  <div class="create-article">
    <Breadcrumbs :navigations="navigations" />
    <div class="wrap">
      <div class="heading">
        企画区分
        <HintTip>応募した企画の種類を選択してください。どれにも当てはまらない方は「その他」を選択してください。</HintTip>
      </div>
      <Select v-model="category" :options="contentCategory" />
      <div v-if="contentCategory.some((v) => v.value === category)" class="deadline-note">
        <p>
          {{
            contentCategory.find((v) => v.value === category)?.label
          }}の申請期限は
          <span
            class="strong"
          >
            {{
              contentCategory
                .find((v) => v.value === category)
                ?.deadline.toLocaleString()
            }}
          </span>
          です。この期限以降は記事を編集できなくなります。この期限以内に[保存する]ボタンを押して、コンテンツを保存してください。
        </p>
      </div>
    </div>
    <div class="wrap title-wrap">
      <div class="heading">
        タイトル
        <HintTip>文字数制限はありませんが、長い場合は見切れることがあります。</HintTip>
      </div>
      <FieldText v-model="title" />
    </div>
    <div class="wrap content-wrap">
      <div class="heading">本文</div>
      <QuillEditor theme="snow" toolbar="full" v-model:content="contentHtml" contentType="html" />
    </div>
    <Button @click="handlePostClick" :text="saveButtonText" :loading="saving" />
  </div>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import 'firebase/firestore'
import { defineComponent, ref } from 'vue'
import { getUser } from '@/utls/getUser'
import { contentCategory, paths } from '@/const/config'
import { QuillEditor } from '@vueup/vue-quill'
import { useRoute } from 'vue-router'
import { useToggle } from '@vueuse/core'
import Breadcrumbs from './Breadcrumbs.vue'
import Button from './Button.vue'
import FieldText from '@/components/FieldText.vue'
import firebase from 'firebase'
import Select from '@/components/Select.vue'
import HintTip from './HintTip.vue'
import { promiseTimeout } from '@vueuse/core'
import { getContentsByUserId } from '@/utls/getContentsByUserId'

export default defineComponent({
  components: {
    QuillEditor,
    FieldText,
    Select,
    Breadcrumbs,
    Button,
    HintTip,
  },
  async setup() {
    const route = useRoute()
    const articleId = String(route.params.id)
    const [applied, toggleApplied] = useToggle(false)
    const user = getUser()
    if (!user) return;
    const { articles } = await getContentsByUserId(user.uid)
    const article = articles.find(article => article.id === articleId)
    if (!article) return;
    const saveButtonText = ref("保存する")
    const category = ref(article.category || '')
    const title = ref(article.title)
    const contentHtml = ref(article.contentHtml)
    const navigations = ref([
      { label: paths.contents.label(), path: paths.contents.path() },
      {
        label: paths.editArticle.label(article?.title || ''),
        path: paths.editArticle.path(String(articleId)),
      },
    ])
    const saving = ref(false)
    const handlePostClick = async () => {
      const doc = {
        title: title.value,
        contentHtml: contentHtml.value,
        updateAt: new Date(),
        category: category.value,
      }
      saving.value = true
      saveButtonText.value = "保存中"
      await firebase
        .firestore()
        .doc(`contents/${user?.uid}/articles/${articleId}`)
        .update(doc)
      saving.value = false
      saveButtonText.value = "保存完了"
      await promiseTimeout(2000)
      saveButtonText.value = "保存する"
    }

    return {
      title,
      contentHtml,
      navigations,
      handlePostClick,
      applied,
      toggleApplied,
      category,
      contentCategory,
      saving,
      saveButtonText
    }
  },
})
</script>

<style lang="scss" scoped>
.wrap {
  margin-bottom: 4rem;
}
.heading {
  margin-bottom: 1rem;
}
.content-wrap {
  ::v-deep(.ql-toolbar) {
    border-color: $c-gray-dark;
    border-top-right-radius: 0.4rem;
    border-top-left-radius: 0.4rem;
  }
  ::v-deep(.ql-container) {
    border-color: $c-gray-dark;
    @include fs-1;
    border-bottom-right-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
  }
  ::v-deep(.ql-editor) {
    line-height: 1.7;
  }
}

.deadline-note {
  padding: 1rem 0;
  .strong {
    color: red;
  }
}
</style>
