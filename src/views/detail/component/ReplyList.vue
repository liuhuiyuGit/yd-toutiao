<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar :title="'条评论'"/>
    <!-- 当前点击的评论  楼主 -->
    <van-cell>
      <div slot="icon">
        <img class="avatar" :src="currentComment.aut_photo" alt>
      </div>
      <div slot="title">
        <span>{{ currentComment.aut_name }}</span>&nbsp;
        <van-tag>楼主</van-tag>
      </div>
      <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
      </div>
      <div slot="label">
        <p>{{ currentComment.content }}</p>
        <p>
          <span>{{ currentComment.pubdate | fmtDate }}</span>
          <!-- <span>回复 {{ currentComment.reply_count }}</span> -->
        </p>
      </div>
    </van-cell>
    <!-- 对评论进行评论列表渲染 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="comment in list" :key="comment.com_id.toString()">
        <div slot="icon">
          <img class="avatar" :src="comment.aut_photo" alt>
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
            <span>回复{{ comment.reply_count }}</span>
          </p>
        </div>
      </van-cell>
    </van-list>
    <!-- 对评论进行评论 -->
    <SendComment :isArticle="false" :target="currentComment.com_id.toString()" :art_id="id"></SendComment>
  </div>
</template>
<script>
// import CommentList from './CommentList'
import SendComment from './SendComment'
import { getComments } from '@/api/comment'
import eventHub from '@/utils/eventHub'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      isArticle: false,
      source: this.currentComment.com_id.toString()
    }
  },
  props: ['currentComment', 'id'],
  components: {
    SendComment
  },
  methods: {
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
    eventHub.$on('sendSuccess', (comment, isArticle) => {
      // 如果对评论进行评论的时候再添加数据
      if (!isArticle) {
        this.list.unshift(comment)
      }
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
</style>
