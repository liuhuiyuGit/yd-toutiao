<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="标题"/>
    <!-- 输入框 -->
    <van-cell-group>
      <van-field v-model="user.mobile" left-icon="phone-o" placeholder="请输入手机号"/>
      <van-field v-model="user.code" left-icon="envelop-o" placeholder="请输入验证码">
        <van-button slot="button" size="small" class="btn" type="default">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="information">
      <van-button class="informationbtn" @click="handleLogin" type="info">登录</van-button>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async handleLogin () {
      try {
        const data = await login(this.user)
        this.setUser(data)
        this.$router.push('/')
        this.$toast.success('登录成功')
      } catch (err) {
        this.$toast.fail('登录失败')
        console.log(err)
      }
    }
  }
}
</script>
<style scoped lang="less">
.btn {
  border-radius: 40px;
  background-color: #ededed;
  color: #666;
}
.information {
  padding: 20px;
  .informationbtn {
    width: 100%;
  }
}
</style>
