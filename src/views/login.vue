<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="标题"/>
    <!-- 输入框 -->
    <van-cell-group>
      <van-field v-model="value" left-icon="phone-o" placeholder="请输入手机号"/>
      <van-field v-model="value" left-icon="envelop-o" placeholder="请输入验证码">
        <van-button slot="button" size="small" class="btn" type="default">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="information">
      <van-button class="informationbtn" type="info">登录</van-button>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped lang="less">
.btn{
  border-radius: 40px;
  background-color: #ededed;
  color: #666;
}
.information{
  padding: 20px;
  .informationbtn{
    width: 100%;
  }
}
</style>
