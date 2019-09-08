<template>
  <div class="box">
    <!-- 标题 -->
    <van-nav-bar fixed title="标题"/>
    <!-- 标题 -->
    <h2>{{ article.title }}</h2>
    <!-- 关注 -->
    <div class="box1">
      <img :src="article.aut_photo" alt>
      <div class="user">
        <div>{{ article. aut_name }}</div>
        <span>{{ article.pubdate }}</span>
      </div>
      <van-button :loading='loadingguan' @click="Focus" size="small" class="btn" type="info">{{ article.is_followed ? '已' : '' }}关注</van-button>
    </div>
    <!-- 内容点赞 -->
    <div>
      <p v-html="article.content"></p>
      <!-- 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞 -->
      <van-button
        icon="like"
        @click="handleLike"
        class="zan1"
        :loading= 'loadingzan'
        :class="{zan2:article.attitude === 1}"
        type="default"
      >点赞</van-button>
      <van-button
        @click="noLike"
        icon="close"
        class="zan"
        :loading="loadingLike"
        :class="{zan2:article.attitude === 0}"
        type="default"
      >不喜欢</van-button>
    </div>
    <!-- 猜你喜欢 -->
    <div class="cai">猜你喜欢</div>
    <div class="mei">没有更多了</div>
  </div>
</template>
<script>
import {
  getArticle,
  likeArticle,
  unLikeArticle,
  dislikeArticle,
  Nolike
} from '@/api/article'
import { followUser, unFollowUser } from '@/api/user'
export default {
  data () {
    return {
      article: {},
      loadingzan: false,
      loadingLike: false,
      loadingguan: false
    }
  },
  props: ['id'],
  methods: {
    //   点击关注
    async Focus () {
      this.$checkLogin()
      this.loadingguan = true
      try {
        if (this.article.is_followed) {
        //   已关注
          await unFollowUser(this.article.aut_id)
          this.article.is_followed = false
        } else {
          await followUser(this.article.aut_id)
          this.article.is_followed = true
        }
      } catch (err) {
        console.log(err)
      }
      this.loadingguan = false
    },
    //   点击点赞
    async handleLike () {
      this.$checkLogin()
      this.loadingzan = true
      try {
        if (this.article.attitude === 1) {
          await unLikeArticle(this.article.art_id)
          this.article.attitude = -1
        } else {
          await likeArticle(this.article.art_id)
          this.article.attitude = 1
        }
      } catch (err) {
        console.log(err)
      }
      this.loadingzan = false
    },
    // 点击不喜欢
    async noLike () {
      this.$checkLogin()
      this.loadingLike = true
      try {
        if (this.article.attitude === 0) {
          // 已经喜欢
          await Nolike(this.article.art_id)
          this.article.attitude = -1
        } else {
          await dislikeArticle(this.article.art_id)
          this.article.attitude = 0
        }
      } catch (err) {
        console.log(err)
      }
      this.loadingLike = false
    },
    // 通过动态路由获取数据
    async loadData () {
      try {
        const data = await getArticle(this.id)
        this.article = data
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    // 通过路由传递过来的id加载数据
    this.loadData()
  }
}
</script>
<style lang="less" scoped>
.box {
  margin: 5px 10px;
  h2 {
    margin-top: 46px;
    text-align: center;
    font-weight: normal;
  }
  .box1 {
    height: 70px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      float: left;
    }
    .user {
      float: left;
      margin-left: 10px;
      color: #666;
      font-size: 14px;
    }
    .btn {
      float: right;
    }
  }
  .zan1 {
    border-radius: 60px;
    margin-top: 20px;
    margin-right: 40px;
    margin-left: 50px;
  }
  .zan {
    border-radius: 60px;
    margin-top: 20px;
  }
  .cai {
    font-size: 14px;
    margin-top: 13px;
    font-weight: 700;
  }
  .mei {
    width: 100%;
    height: 180px;
    text-align: center;
    line-height: 180px;
    font-size: 14px;
    color: #666;
  }
  .zan2 {
    color: red;
  }
}
</style>
