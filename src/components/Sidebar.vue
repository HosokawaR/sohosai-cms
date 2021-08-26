<template>
  <div class="sidebar">
    <nav class="main">
      <div class="title">雙峰祭コンテンツ投稿システム</div>

      <div v-for="item in menu" :key="item.label">
        {{ item.label }}
      </div>
    </nav>
    <div class="slot">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const menu = [
      { label: "マイコンテンツ管理", link: "" },
      { label: "よくある質問", link: "" },
      { label: "お問い合わせ", link: "" },
      { label: "プライバシーポリシー", link: "" },
    ];

    return {
      menu,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
.main {
  flex: 0 0 20rem;
  height: 100vh;
  margin-right: 2rem;
  box-shadow: 0 0.3rem 0.6rem $c-shadow;
}
.title {
  @include fs-2;
}
nav {
  @include fs-1;
}
</style>
