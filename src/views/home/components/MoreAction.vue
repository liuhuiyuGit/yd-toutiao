<template>
  <div>
    <van-dialog
      @input="$emit('input', $event)"
      :value="value"
      closeOnClickOverlay
      :showConfirmButton="false"
    >
      <van-cell v-show="!showReports" title="不感兴趣" @click="handle('dislike')" icon="location-o"/>
      <van-cell
        v-show="!showReports"
        title="反馈垃圾内容"
        is-link
        icon="location-o"
        @click="showReports=true"
      />
      <van-cell v-show="!showReports" title="拉黑作者" icon="location-o" @click="handle('blacklist')"/>
      <!-- 举报文章 -->
      <van-cell-group v-show="showReports">
        <van-cell icon="arrow-left" @click="showReports=false"/>
        <van-cell
          v-for="item in reportList"
          :key="item.type"
          :title="item.title"
          @click="handle('report', item.type)"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>
<script>
import { dislikeArticle, reportArticle } from '@/api/article'
import { blacklists } from '@/api/user'
export default {
  data () {
    return {
      showReports: false,
      reportList: [
        { title: '标题夸张', type: 1 },
        { title: '低俗色情', type: 2 },
        { title: '错别字多', type: 3 },
        { title: '旧闻重复', type: 4 },
        { title: '广告软文', type: 5 },
        { title: '内容不实', type: 6 },
        { title: '涉嫌违法犯罪', type: 7 },
        { title: '侵权', type: 8 },
        { title: '其他问题', type: 0 }
      ]
    }
  },
  props: ['article', 'value'],
  methods: {
    handle (type, reportType) {
      switch (type) {
        case 'dislike':
          // 不感兴趣
          this.dislike()
          break
        case 'blacklist':
          // 拉黑作者
          this.blacklistUser()
          break
        case 'report':
          this.report(reportType)
          break
      }
    },
    async dislike () {
      try {
        await dislikeArticle(this.article.art_id)
        this.$toast.success('操作成功')
        this.$emit('handleSuccess')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    async blacklistUser () {
      try {
        await blacklists(this.article.aut_id)
        // 通知父组件，拉黑成功
        //    隐藏对话框，删除数据
        this.$emit('handleSuccess')
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    async report (reportType) {
      try {
        await reportArticle({
          target: this.article.art_id,
          type: reportType
        })
        // 告诉父组件隐藏对话框
        this.$emit('input', false)
        this.$toast.success('操作成功')
        this.showReports = false
      } catch (err) {
        this.$toast.fail('操作失败')
        this.showReports = false
        this.$emit('input', false)
      }
    }
  }
}
</script>
<style>
</style>
