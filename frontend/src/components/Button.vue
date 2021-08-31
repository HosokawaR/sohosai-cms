<template>
  <button @click="handleClick" :style="`{width: ${width}}`" :class="[color]">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type ButtonColor = "primary" | "secondary"

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: "20rem"
    },
    color: {
      type: String as PropType<ButtonColor>,
      default: "primary"
    }
  },
  emits: ['click'],
  setup(_, context) {
    const handleClick = (e: Event) => {
      context.emit('click', e)
    }
    return {
      handleClick,
    }
  },
})
</script>

<style lang="scss" scoped>
button {
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
  border-radius: 0.8rem;
  &:hover {
    opacity: 0.7;
  }
}
.primary {
  color: $c-white;
  background-color: $c-main;
}
.secondary {
  background-color: $c-secondary;
}
</style>
