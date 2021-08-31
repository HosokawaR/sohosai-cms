<template>
  <div class="sidebar">
    <div class="main">
      <button class="title" @click="$router.push('/')">
        雙峰祭コンテンツ
        <br />投稿システム
      </button>
      <div class="account">
        <template v-if="user">
          <div>
            <div class="account_item display-name">{{ user.displayName }}</div>
            <div class="account_item email">{{ user.email }}</div>
          </div>
          <span class="material-icons" @click="signout">logout</span>
        </template>
        <button v-else @click="$router.push(paths.signin.path())">
          ログイン
          <span class="material-icons">login</span>
        </button>
      </div>
      <nav>
        <button
          v-for="item in menu"
          :key="item.label"
          class="nav-item"
          @click="$router.push(item.link)"
        >{{ item.label }}</button>
      </nav>
    </div>
    <div class="slot">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import firebase from 'firebase'
import 'firebase/auth'
import { useRouter } from 'vue-router'
import { paths } from '@/const/config'
import { getUser } from '@/utls/getUser'

export default defineComponent({
  setup() {
    const router = useRouter()
    const menu = [
      { label: paths.contents.label(), link: paths.contents.path() },
      {
        label: paths.postedContents.label(),
        link: paths.postedContents.path(),
      },
      { label: 'よくある質問', link: '' },
      { label: 'お問い合わせ', link: '' },
      { label: 'プライバシーポリシー', link: '' },
    ]
    const user = getUser()
    const signout = async () => {
      firebase.auth().onIdTokenChanged(async () => {
        try {
          await firebase.auth().signOut()
          router.push(paths.signin.path())
        } catch (e) {
          alert('サインアウトに失敗しました。')
        }
      })
    }

    return {
      menu,
      signout,
      user,
      paths
    }
  },
})
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  background-color: $c-gray;
}
.main {
  flex: 0 0 20rem;
  height: 100vh;
  margin-right: 2rem;
  box-shadow: 0.3rem 0 0.6rem $c-shadow;
  background-color: $c-main-dark;
  color: $c-gray-light;
}
.slot {
  width: 100%;
  min-height: 100vh;
}
.title {
  @include fs-1b;
  padding: 2rem 1rem;
}
.account {
  @include center;
  gap: 0 1rem;
  margin-bottom: 3rem;
  padding: 1rem;
  border-top: 1px solid $c-main-light;
  border-bottom: 1px solid $c-main-light;
  &_item {
    padding: 0.5rem 0;
  }
}
.display-name {
  @include fs-1b;
}
.email {
  @include fs-0;
  color: $c-gray;
}
nav {
  @include fs-1;
}
.nav-item {
  width: 100%;
  padding: 1rem;
  &:hover {
    background-color: $c-main-dark2;
  }
}
</style>
