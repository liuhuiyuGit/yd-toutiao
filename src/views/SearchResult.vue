<template>
  <div>
    <van-nav-bar
      title="搜索结果"
      left-text="返回"
      left-arrow
      fixed
      @click-left="$router.back()"
    />

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="article in list"
        :key="article.art_id.toString()"
        :title="article.title"
      >
        <div slot="label">
          <!-- grid 显示封面
            article.cover.type   0 没有图片   1 1个图片 3 3个图片
            -->
          <van-grid v-if="article.cover.type" :border="false" :column-num="3">
            <van-grid-item
              v-for="(img, index) in article.cover.images"
              :key="img + index"
            >
              <van-image lazy-load height="80" :src="img" >
                <!-- 图片的加载提示 -->
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
                <!-- 自定义加载失败提示 -->
                <template v-slot:error>加载失败</template>
              </van-image>
            </van-grid-item>
          </van-grid>
          <p>
            <span>{{ article.aut_name }}</span>&nbsp;
            <span>{{ article.comm_count }}评论</span>&nbsp;
            <span>{{ article.pubdate | fmtDate }}</span>&nbsp;
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResult',
  props: ['q'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },

  methods: {
    async onLoad () {
      try {
        const data = await getSearchResults({
          page: this.page,
          perPage: this.per_page,
          q: this.q
        })
        // 把获取的结果push到数组中
        this.list.push(...data.results)
        this.page++
        this.loading = false
        // 判断是否加载完毕
        if (data.results.length === 0) {
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('获取搜索结果数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-list {
  margin-top: 46px;
}
</style>
