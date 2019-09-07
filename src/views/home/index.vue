<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar fixed title="标题"/>
    <!-- top导航栏 -->
    <van-tabs>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
          <!-- 上拉更新列表 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item"/>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { getDefaultOrUserChannels } from '../../api/channel.js'
export default {
  data () {
    return {
      channels: [],
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    //   页面刷新获取频道列表数据
    async loadChannels () {
      const data = await getDefaultOrUserChannels()
      console.log(data)
      this.channels = data.channels
    },
    // 上拉更新列表
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  },
  created () {
    //   页面刷新获取频道列表数据
    this.loadChannels()
  }
}
</script>
<style scoped lang='less'>
.van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 100;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
.close {
  float: right;
}
</style>
