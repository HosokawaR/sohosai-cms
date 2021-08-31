<template>
  <div class="signin">
    ログイン画面
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import 'firebase/auth'
import 'firebaseui/dist/firebaseui.css'
import { paths } from '@/const/config'

export default defineComponent({
  components: {},
  setup() {
    onMounted(() => {
      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', {
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
        signInSuccessUrl: paths.contents.path(),
      })
    })
  },
})
</script>

<style lang="scss" scoped>
input {
  padding: 1rem;
  border: 1px solid $c-gray;
}
</style>
