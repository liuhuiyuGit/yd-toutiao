<template>
<div>
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
    <van-cell
      v-for="comment in list"
      :key="comment.com_id.toString()"
    >
      <div slot="icon">
        <img class="avatar" :src="comment.aut_photo" alt="">
      </div>
      <div slot="title">
        <span>{{ comment.aut_name }}</span>
      </div>
      <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
      </div>
      <div slot="label">
        <p>{{ comment.content }}</p>
        <p>
          <span>{{ comment.pubdate | fmtDate }}</span>&nbsp;
          <span @click="handleShowReplyList(comment)">回复{{ comment.reply_count }}</span>
        </p>
      </div>
    </van-cell>
</van-list>
</div>
</template>
<script>
// 获取评论列表
import { getComments } from '@/api/comment'
import eventHub from '@/utils/eventHub'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  props: ['isArticle', 'source'],
  methods: {
    //  点击回复触发
    handleShowReplyList (comment) {
      this.$emit('reply', comment)
    },
    //  山拉列表触发
    async onLoad () {
      const data = await getComments({
        offset: this.offset,
        limit: this.limit,
        isArticle: this.isArticle,
        source: this.source
      })
      this.loading = false
      this.list.push(...data.results)
      this.offset = data.last_id
      if (data.results.length === 0) {
        this.finished = true
      }
    }
  },
  created () {
    eventHub.$on('sendSuccess', (comment) => {
      this.list.unshift(comment)
    })
  }
}
</script>
<style lang="less" scoped>
.avatar {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin-right: 5px;
}
.van-list {
  margin-bottom: 64px;
}
</style>
