<template>
  <div>
    <van-dialog  @input="$emit('input', $event)" :value="value" closeOnClickOverlay :showConfirmButton="false">
      <van-cell title="不敢兴趣" icon="location-o"/>
      <van-cell title="反馈垃圾内容" is-link icon="location-o"/>
      <van-cell title="拉黑作者" icon="location-o"/>
    </van-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: true
    }
  },
  props: ['article', 'value']
}
</script>
<style>
</style>
