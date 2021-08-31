<template>
  <div class="hint-tip">
    <span class="icon material-icons">
      help_outline
      <div class="hint">
        ああああああああああああああああああああああああああああああああああ
        あああああああああああああああああああああああああああああああああああああ
        あああああああああああああああああああああああああああああああああああああああああああああ
        ああああああああああああああああああああああああ
        <!-- <slot class="slot" /> -->
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>

<style lang="scss" scoped>
.hint-tip {
  display: inline-block;
  vertical-align: middle;
}
.icon {
  position: relative;
  color: $c-gray-dark;
  cursor: default;
  &:hover {
    .hint {
      display: block;
    }
  }
}
.hint {
  @include fs-1;
  // display: none;
  position: absolute;
  z-index: 1000;
  top: 1rem;
  width: 20rem;
  padding: 1rem;
  border-radius: 0.4rem;
  box-shadow: -0.1rem -0.1rem 0.2rem $c-shadow, 0.3rem 0.3rem 0.6rem $c-shadow;
  background-color: $c-white;
  color: $c-text;
  overflow-wrap: break-word;
  word-break: break-word;
}
.slot {
  width: 100%;
}
</style>
