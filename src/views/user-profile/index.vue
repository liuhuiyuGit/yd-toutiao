<template>
  <div>
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
    />
      <!-- @click-right="btnSave" -->
    <van-cell-group>
      <van-cell title="头像" is-link @click="showUploadFile = true">
        <div slot="default">
          <img width="30" height="30" :src="userProfile.photo" alt="">
        </div>
      </van-cell>
      <van-cell title="昵称" is-link :value="userProfile.name" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="性别" is-link :value="userProfile.gender ? '女' : '男'" />
      <van-cell title="生日" is-link :value="userProfile.birthday"/>
    </van-cell-group>

    <!-- 弹出上传文件的组件 -->
    <upload-file @upload-success="handleSuccess" v-model="showUploadFile"></upload-file>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UploadFile from './component/UploadFile'
export default {
  name: 'UserProfile',
  components: {
    UploadFile
  },
  data () {
    return {
      userProfile: {},
      showUploadFile: false
    }
  },
  created () {
    // 获取用户资料
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const data = await getUserProfile()
        console.log(data)
        this.userProfile = data
      } catch (err) {
        this.$toast.fail('获取用户资料失败')
      }
    },
    // 头像上传成功
    handleSuccess (photo) {
      this.userProfile.photo = photo
    }
  }

}
</script>

<style>

</style>
