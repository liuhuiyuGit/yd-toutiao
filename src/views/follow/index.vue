<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar
      title="关注/粉丝"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- tabs -->
    <van-tabs v-model="active" color="blue">
      <van-tab title="关注">
        <user-list :type="active"></user-list>
      </van-tab>
      <van-tab title="粉丝">
        <user-list :type="active"></user-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UserList from './component/UserList'
export default {
  name: 'Follow',
  components: {
    UserList
  },
  data () {
    return {
      active: 0,
      // 1 显示关注用户   2  显示粉丝
      type: '1'
    }
  },
  created () {
    // 因为组件被缓存，所以该方法只执行一次
    // console.log('created')
    // 获取 url 上的查询字符串
  },
  // keep-alive的钩子函数，当组件激活的时候执行
  activated () {
    this.type = this.$route.query.type
    if (this.type === '1') {
      this.active = 0
    } else {
      this.active = 1
    }
  }
}
</script>

<style>

</style>
