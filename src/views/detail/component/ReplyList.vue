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
          <span>回复 {{ currentComment.reply_count }}</span>
        </p>
      </div>
    </van-cell>
    <CommentList :isArticle="false" :source="currentComment.com_id.toString()"></CommentList>
  </div>
</template>
<script>
import CommentList from './CommentList'
export default {
  data () {
    return {}
  },
  props: ['currentComment'],
  components: {
    CommentList
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
