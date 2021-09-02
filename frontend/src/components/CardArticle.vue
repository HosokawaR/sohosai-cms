<template>
  <div class="card-article">
    <div class="title">{{ article.title }}</div>
    <div class="sup status">
      <div class="label">ステータス</div>
      <div>
        <span>申請期間中</span>
        <HintTip>
          ステータスはそれぞれ以下の状態を表します。
          <div class="heading">申請期間中</div>
          コンテンツの申請期間中です。この期間中はコンテンツの編集が可能です。
          <div class="heading">審査中</div>
          現在総務局がコンテンツを確認しております。この期間中はコンテンツを修正できません。
          <div class="heading">確認済み</div>
          コンテンツの確認が完了しました。雙峰祭当日にコンテンツが公開されます。
          <div class="heading">却下</div>
          総務局よりコンテンツの掲載が却下されました。
        </HintTip>
      </div>
    </div>
    <div class="sup update-at">
      <div class="label">最終更新日</div>
      <div>{{ article.createAt.toLocaleString() }}</div>
    </div>
    <div class="action">
      <Button
        @click="handleClick"
        :text="action + '→'"
        width="5rem"
        color="secondary"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { AriticleOverview } from '@/types/type'
import { defineComponent, PropType } from 'vue'
import Button from './Button.vue'
import HintTip from './HintTip.vue'

type Props = {
  article: AriticleOverview
}

export default defineComponent({
  components: {
    Button,
    HintTip,
  },
  props: {
    article: {
      type: Object as PropType<AriticleOverview>,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  emits: ['click'],
  setup(props: Props, context) {
    const handleClick = () => {
      context.emit('click', props.article.id)
    }

    return {
      handleClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.card-article {
  display: grid;
  grid-template:
    'title title     ... action' 1.6rem
    '...   ...       ... action' 2rem
    '...   status    ... action' 1.6rem
    '...   ...       ... action' 1rem
    '...   update-at ... action' 1.6rem
    / 1fr auto 1rem 9rem;
  width: clamp(1px, 50rem, 100%);
  padding: 2rem;
  border-radius: 0.8rem;
  border: 1px solid $c-gray;
  background-color: $c-white;
}
.title {
  @include fs-1b;
  grid-area: title;
}
.sup {
  @include center;
  justify-content: space-between;
}
.action {
  @include center;
  grid-area: action;
}
.status {
  grid-area: status;
}
.update-at {
  grid-area: update-at;
  text-align: right;
}
.label {
  color: $c-text-sub;
  padding-right: 1rem;
}
</style>
