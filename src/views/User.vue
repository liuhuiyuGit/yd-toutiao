<template>
  <div>
    <!-- 未登录 -->
    <div v-if="!user" class="not-login">
      <div class="circle" @click="handleLogin">
        <span>登录</span>
      </div>
    </div>

    <!-- 已登录 -->
    <div v-else>
      <van-cell-group class="user-info">
        <van-cell class="base-info" @click="$router.push('user-profile')" is-link :border="false">
          <div slot="title">
            <img class="avatar" :src="userInfo.photo" alt="">
            <span class="title">{{ userInfo.name }}</span>
          </div>
        </van-cell>
        <van-grid class="data-info" :border="false">
          <van-grid-item>
            <span class="count">{{ userInfo.art_count }}</span>
            <span class="text">头条</span>
          </van-grid-item>
          <van-grid-item @click="$router.push('/follow?type=1')">
            <span class="count">{{ userInfo.follow_count }}</span>
            <span class="text">关注</span>
          </van-grid-item>
          <van-grid-item @click="$router.push('/follow?type=2')">
            <span class="count">{{ userInfo.fans_count }}</span>
            <span class="text">粉丝</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">{{ userInfo.like_count }}</span>
            <span class="text">获赞</span>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <van-cell-group>
        <van-grid clickable>
          <van-grid-item icon="star" text="我的收藏"/>
          <van-grid-item icon="chat" text="我的评论"/>
          <van-grid-item icon="like" text="我的点赞"/>
          <van-grid-item icon="browsing-history" text="浏览历史"/>
        </van-grid>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="消息通知" is-link />
        <van-cell title="用户反馈" is-link />
        <van-cell title="小智同学" is-link to="/chat"/>
        <van-cell title="切换账号" is-link to="/login" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'User',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // 加载当前登录用户的信息
    this.loadUserInfo()
  },
  methods: {
    // 加载当前登录用户的信息
    async loadUserInfo () {
      // 判断用户是否登录
      if (!this.$checkLogin()) {
        return
      }
      try {
        const data = await getUserInfo()
        this.userInfo = data
      } catch (err) {
        this.$toast.fail('获取用户信息失败')
      }
    },
    // 点击登录按钮，跳转到登录页面
    handleLogin () {
      this.$router.push({
        path: '/login',
        query: {
          redirect: this.$route.fullPath
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.not-login {
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  .circle {
    width: 200px;
    height: 300px;
    padding: 80px;
    background-color: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 40px;
  }
}
.user-info {
  .base-info {
    display: flex;
    align-items: center;
    background-color: #0096fa;
    div {
      display: flex;
      align-items: center
    }
    .avatar {
      margin-right: 30px;
      width: 100px;
      border-radius: 100%;
    }
  }
  .data-info {
    .text {
      font-size: 14px;
    }
    .count {
      font-size: 12px;
    }
  }
  /deep/ .van-cell__right-icon {
    color: #fff
  }
  /deep/ .van-grid-item__content {
    background-color: #0096fa;
  }
}
</style>
