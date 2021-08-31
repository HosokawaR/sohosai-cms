<template>
  <select>
    <option>一般企画</option>
    <option>学術企画</option>
    <option>その他</option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>
select {
  padding: 1rem;
  border: 1px solid $c-gray;
}
</style>
