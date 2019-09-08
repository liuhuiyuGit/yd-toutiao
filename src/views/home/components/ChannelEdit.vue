<template>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '90%' }"
  >
    <van-cell icon="cross" @click="$emit('input', false)"/>
    <!-- 我的频道 -->
    <van-cell title="我的频道" label="点击进入频道">
      <van-button round type="danger" size="mini" v-show="!isEdit" @click="isEdit=true">编辑</van-button>

      <van-button round type="danger" size="mini" v-show="isEdit" @click="isEdit=false">完成</van-button>
    </van-cell>
    <van-grid>
      <van-grid-item
        v-for="(channel,index) in channels"
        :key="channel.id"
        @click="handleMyChannelItem(index, channel.id)"
      >
        <div
          slot="text"
          class="van-grid-item__text"
          :class="{ active: active === index }"
        >{{ channel.name }}</div>
        <!-- 关闭按钮 -->
        <van-icon slot="icon" class="close-icon" name="close" v-show="isEdit && index !== 0"/>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道" label="点击添加频道"/>
    <van-grid>
      <van-grid-item
        @click="handleChannelItem(channel)"
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
      />
    </van-grid>
  </van-popup>
</template>
<script>
import { getAllChannels, deleteChannel, addChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/localStorage'

export default {
  name: 'ChannelEdit',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 接收父组件传过来的我的频道
    channels: {
      type: Array,
      required: true
    },
    // 接收当前显示的频道的索引
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['user']),
    // 推荐频道
    recommendChannels () {
      // 1. 获取我的频道中所有id组成的数组
      // map() 遍历数组，返回一个新的数组，新数组中的元素由回调函数中返回的元素组成
      const ids = this.channels.map(channel => {
        return channel.id
      })
      // 2. 过滤所有频道，把频道id出现在上面数组中的项去除
      // filter() 把满足条件的item，返回组成一个新的数组
      return this.allChannels.filter(channel => {
        // includes()   es6新增，判断数组中是否包含某一项
        return !ids.includes(channel.id)
      })
    }
  },
  data () {
    return {
      // 是否是编辑模式
      isEdit: false,
      // 存储所有频道
      allChannels: []
    }
  },
  created () {
    // 加载所有的频道列表
    this.loadAllChannels()
  },
  methods: {
    // 加载所有的频道列表
    async loadAllChannels () {
      try {
        const data = await getAllChannels()
        this.allChannels = data.channels
      } catch (err) {
        console.log(err)
      }
    },
    // 点击我的频道的时候
    async handleMyChannelItem (index, channelId) {
      // 1. 非编辑模式
      if (!this.isEdit) {
        // 告诉父组件，选中的频道的索引
        // 关闭对话框
        this.$emit('activeChange', index)
        return
      }

      // 2. 编辑模式
      // 2.1 把点击的频道，从我的频道移除
      this.channels.splice(index, 1)
      // 2.2 判断是否登录
      // 通过mapstate 做了映射
      if (this.user) {
        // 2.3 如果登录，发送请求
        try {
          await deleteChannel(channelId)
        } catch (err) {
          this.$toast.fail('操作失败')
        }
        return
      }
      // 2.4 没有登录，把频道列表记录到本地存储
      setItem('channels', this.channels)
    },
    // 点击推荐频道的时候
    async handleChannelItem (channel) {
      this.$set(channel, 'timestamp', null)
      this.$set(channel, 'articles', [])
      this.$set(channel, 'loading', false)
      this.$set(channel, 'finished', false)
      this.$set(channel, 'pullLoading', false)
      // 1. 把channel添加到我的频道
      this.channels.push(channel)
      // 2. 判断是否登录
      if (this.user) {
        // 3. 如果登录，发送请求
        try {
          await addChannel(channel.id, this.channels.length)
        } catch (err) {
          this.$toast.fail('操作失败')
        }
        return
      }
      // 4. 如果没有登录，把我的频道存储到本地存储
      setItem('channels', this.channels)
    }
  }
}
</script>
<style lang="less" scoped>
.close-icon {
  position: absolute;
  right: 0;
  top: 0;
}
.active {
  color: red;
}
</style>
