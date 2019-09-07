<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="标题"/>
    <!-- top导航栏 -->
    <van-tabs>
      <van-tab
      v-for="item in channels"
      :key = "item.id"
      :title="item.name">内容</van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { getDefaultOrUserChannels } from '../../api/channel.js'
export default {
  data () {
    return {
      channels: []
    }
  },
  methods: {
    //   页面刷新获取频道列表数据
    async loadChannels () {
      const data = await getDefaultOrUserChannels()
      console.log(data)
      this.channels = data.channels
    }
  },
  created () {
    //   页面刷新获取频道列表数据
    this.loadChannels()
  }
}
</script>
<style>
</style>
