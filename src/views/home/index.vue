<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar fixed title="标题"/>
    <!-- top导航栏 -->
    <van-tabs v-model="activeIndex">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 下拉加载更多组件 -->
        <van-pull-refresh
          :success-text="successText"
          v-model="currentChannel.pullLoading"
          @refresh="onRefresh"
        >
          <!-- 上拉更新列表 -->
          <van-list
            v-model="currentChannel.loading"
            :finished="currentChannel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="article in currentChannel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            >
              <div slot="label">
                <!-- grid 显示封面
                  article.cover.type   0 没有图片   1 1个图片 3 3个图片
                -->
                <van-grid v-if="article.cover.type" :border="false" :column-num="3">
                  <van-grid-item v-for="(img, index) in article.cover.images" :key="index">
                    <van-image lazy-load height="80" :src="img"/>
                    <!-- 图片的加载提示 -->
                    <template v-slot:loading>
                      <van-loading type="spinner" size="20"/>
                    </template>
                    <!-- 自定义加载失败提示 -->
                    <template v-slot:error>加载失败</template>
                  </van-grid-item>
                </van-grid>
                <p>
                  <span>{{ article.aut_name }}</span>&nbsp;
                  <span>{{ article.comm_count }}评论</span>&nbsp;
                  <span>{{ article.pubdate | fmtDate }}</span>&nbsp;
                  <!-- 点击x按钮，记录当前的文章对象 -->
                  <van-icon name="cross" class="close" @click="handleAction(article)"/>
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!--
        :value = isshow
        @input = isshow = $event
    -->
    <More-action v-model="isshow" :article="currentArticle"></More-action>
  </div>
</template>
<script>
import { getDefaultOrUserChannels } from '../../api/channel.js'
import { getArticles } from '../../api/article.js'
import Vue from 'vue'
import { Lazyload } from 'vant'
import MoreAction from './components/MoreAction'
Vue.use(Lazyload)
export default {
  components: {
    MoreAction
  },
  data () {
    return {
      // 频道列表数据
      channels: [],
      //   频道列表索引
      activeIndex: 0,
      // 把当前数据对象 传入给弹层
      currentArticle: null,
      isshow: false,
      successText: ''
    }
  },
  computed: {
    // 返回当前的频道对象
    currentChannel () {
      return this.channels[this.activeIndex]
    }
  },
  methods: {
    //  下拉触发的事件
    async onRefresh () {
      try {
        const data = await getArticles({
          // 频道的id
          channelId: this.currentChannel.id,
          // 时间戳
          timestamp: Date.now(),
          // 是否包含置顶1，0不包含
          withTop: 1
        })

        // 设置加载完毕
        this.currentChannel.pullLoading = false
        // 把数据放到数组的最前面（最新数据）
        this.currentChannel.articles.unshift(...data.results)
        this.successText = `加载了${data.results.length}条数据`
      } catch (err) {
        console.log(err)
      }
    },
    handleAction (article) {
      this.currentArticle = article
      this.isshow = true
    },
    //   页面刷新获取频道列表数据
    async loadChannels () {
      try {
        const data = await getDefaultOrUserChannels()
        data.channels.forEach(channel => {
          // 存储时间戳
          channel.timestamp = null
          // 粗出数据
          channel.articles = []
          // 存储状态
          channel.loading = false
          // 存储状态
          channel.finished = false
          //  下拉刷新
          channel.pullLoading = false
        })
        this.channels = data.channels
      } catch (err) {
        console.log(err)
      }
    },
    // 上拉更新列表
    async onLoad () {
      try {
        const data = await getArticles({
          // 频道的id
          channelId: this.currentChannel.id,
          // 时间戳
          timestamp: this.currentChannel.timestamp || Date.now(),
          // 是否包含置顶1，0不包含
          withTop: 1
        })
        this.currentChannel.timestamp = data.pre_timestamp
        this.currentChannel.articles.push(...data.results)
        this.currentChannel.loading = false
        if (data.results.length === 0) {
          this.currentChannel.finished = true
        }
      } catch (err) {
        console.log(err)
      }
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
