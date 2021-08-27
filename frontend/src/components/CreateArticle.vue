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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import FieldText from "@/components/FieldText.vue";
import Option from "@/components/Select.vue";
import Breadcrumbs from "./Breadcrumbs.vue";
import { paths } from "@/const/config";

export default defineComponent({
  components: {
    QuillEditor,
    FieldText,
    Option,
    Breadcrumbs,
  },
  setup() {
    const title = ref("");
    const contentHtml = ref("");
    const navigations = ref([paths.contents, paths.article]);

    return {
      title,
      contentHtml,
      navigations,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  margin-bottom: 4rem;
}
</style>
