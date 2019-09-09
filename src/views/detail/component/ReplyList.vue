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
    <!-- 对评论进行评论列表渲染 -->
    <CommentList :isArticle="false" :source="currentComment.com_id.toString()"></CommentList>
    <!-- 对评论进行评论 -->
    <SendComment :isArticle='false' :target="currentComment.com_id.toString()" :art_id="id"></SendComment>
  </div>
</template>
<script>
import CommentList from './CommentList'
import SendComment from './SendComment'
export default {
  data () {
    return {}
  },
  props: ['currentComment', 'id'],
  components: {
    CommentList,
    SendComment
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
