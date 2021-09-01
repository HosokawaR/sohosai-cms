<template>
  <div class="hint-tip">
    <span :class="['icon', 'material-icons', color]">help_outline</span>
    <div class="hint">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    color: {
      type: String,
      default: "gray"
    }
  }
})
</script>

<style lang="scss" scoped>
.hint-tip {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  &:hover {
    .hint {
      display: block;
    }
  }
}
.icon {
  color: $c-text-sub;
  cursor: default;
  &.gray {
    color: $c-text;
  }
  &.white {
    color: $c-gray;
  }
}
.hint {
  @include fs-0;
  display: none;
  position: absolute;
  z-index: 1000;
  top: 2rem;
  left: 2rem;
  padding: 2rem;
  border-radius: 0.4rem;
  box-shadow: -0.1rem -0.1rem 0.2rem $c-shadow, 0.3rem 0.3rem 0.6rem $c-shadow;
  width: 40rem;
  background-color: $c-white;
  word-break: break-all;
  color: $c-text;
  line-height: 1.7;
  ::v-slotted(.heading) {
    @include fs-0b;
    padding-top: 0.5rem;
  }
}
</style>
