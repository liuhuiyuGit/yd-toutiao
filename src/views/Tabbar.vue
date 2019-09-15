<template>
  <div>
    <router-view></router-view>

    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/qa" icon="search">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="setting-o">{{ user ? '我的' : '未登录' }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Tabbar',
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>

</style>
