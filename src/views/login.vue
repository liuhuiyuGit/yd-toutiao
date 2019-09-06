<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="标题"/>
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
      v-validate="'required|digits:11'"
      name="mobile"
      :error-message="errors.first('mobile')"
      v-model="user.mobile"
      left-icon="phone-o"
      placeholder="请输入手机号"/>
      <van-field
        v-validate="'required|digits:6'"
        name="code"
        :error-message="errors.first('code')"
      v-model="user.code"
      left-icon="envelop-o"
      placeholder="请输入验证码">
        <van-button slot="button" size="small" class="btn" type="default">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="information">
      <van-button
      :loading="loading"
      loading-type="spinner"
      loading-text="正在登录..."
      class="informationbtn"
      @click="handleLogin"
      type="info">登录</van-button>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
import Vue from 'vue'
import { Button } from 'vant'
Vue.use(Button)
export default {
  data () {
    return {
      // 手机号验证码
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      // 登录按钮加载状态
      loading: false
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    // 点击登录按钮触发的事件
    async handleLogin () {
      this.loading = true
      try {
        const valid = await this.$validator.validate()
        if (!valid) {
          this.loading = false
          return
        }
        const data = await login(this.user)
        this.setUser(data)
        this.$router.push('/')
        this.$toast.success('登录成功')
      } catch (err) {
        this.$toast.fail('登录失败')
        console.log(err)
      }
      this.loading = false
    }
  },
  created () {
    // 配置VeeValidate的自定义验证信息
    const dict = {
      custom: {
        // 验证的文本框
        mobile: {
          // 验证规则失败之后的提示信息
          required: '请输入手机号码',
          digits: '手机号码必须是11位的数字'
        },
        code: {
          required: '请输入验证码',
          digits: '验证码必须是6位的数字'
        }
      }
    }
    // or use the instance method
    this.$validator.localize('custom', dict)
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
