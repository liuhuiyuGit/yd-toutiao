<template>
  <van-dialog
    :value="value"
    @input="$emit('input', $event)"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
    <van-cell-group>
      <van-cell title="从相册选择图片" @click="handleSelectFile" />
      <input ref="file" type="file" style="display: none;">
      <van-cell title="拍照" />
      <van-cell title="取消" @click="$emit('input', false)" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'

Vue.use(ImagePreview)
export default {
  name: 'UploadFile',
  props: ['value'],
  methods: {
    // 点击从相册选择图片，弹出选择图片的对话框
    handleSelectFile () {
      this.$refs.file.click()

      // 给file注册onchange事件
      this.$refs.file.onchange = (e) => {
        // 如果没有选择文件，返回
        if (e.target.files.length === 0) {
          return
        }

        //  console.log(e.target.files[0])
        // 图片在内存中可以访问的临时路径
        const url = URL.createObjectURL(e.target.files[0])
        // console.log(url)
        // 关闭弹出对话框
        this.$emit('input', false)
        // 图片预览
        ImagePreview({
          images: [
            url
          ],
          // 不显示页码
          showIndex: false,
          onClose () {
            // do something
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell__title {
  text-align: center;
}
</style>
