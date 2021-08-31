<template>
  <div class="card-article">
    <div class="title">{{ article.title }}</div>
    <div class="sup status">
      <div class="label">ステータス</div>
      <div>
        <span>審査中</span>
        <HintTip>
          ステータスそれぞれ以下の状態を表します
          下書き
          まだコンテンツを提出しておりません。
          審査中
          現在総務局によりコンテンツを確認しております。
          確認済み
          コンテンツの確認が完了しました。雙峰祭当日にコンテンツが公開されます。
        </HintTip>
      </div>
    </div>
    <div class="sup update-at">
      <div class="label">最終更新日</div>
      <div>{{ article.createAt.toLocaleString() }}</div>
    </div>
    <div class="action">
      <Button @click="handleClick" :text="action + '→'" width="5rem" color="secondary" />
    </div>
  </div>
</template>

<script lang="ts">
import { paths } from '@/const/config'
import { Ariticle } from '@/types/type'
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import Button from './Button.vue'
import HintTip from './HintTip.vue'

type Props = {
  article: Ariticle
}

export default defineComponent({
  components: {
    Button,
    HintTip
  },
  props: {
    article: {
      type: Object as PropType<Ariticle>,
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
    "title title     ... action" 1.6rem
    "...   ...       ... action" 2rem
    "...   status    ... action" 1.6rem
    "...   ...       ... action" 1rem
    "...   update-at ... action" 1.6rem
    / 1fr auto 1rem 8rem;
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
