<template>
  <div class="page-user-chat">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
    <div ref="chatList" class="chat-list">
      <div
        v-for="chat in list"
        :key="chat.timestamp"
        class="chat-item" :class="chat.robot ? ' left' : ' right'">
        <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div class="chat-pao">{{ chat.msg }}</div>
      </div>
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="说点什么...">
        <van-loading v-if="commentLoading" slot="button" type="spinner" size="16px"></van-loading>
        <span v-else @click="send()" slot="button" style="font-size:12px;color:#999">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data () {
    return {
      socket: null,
      // 消息列表
      list: [],
      value: '',
      commentLoading: false
    }
  },
  activated () {
    this.socket = io('http://ttapi.research.itcast.cn', {
      query: {
        token: this.$store.state.user.token
      }
    })
    this.socket.on('connect', () => {
      // this.socket.send('你好')
    })
    // 接收到消息
    this.socket.on('message', (data) => {
      // console.log(data)
      // data -> {msg: ,timestamp:}
      this.list.push({
        robot: true,
        ...data
      })
      // 更新滚动条的位置
      this.update()
    })
  },
  deactivated () {
    // 关闭链接
    this.socket.close()
  },
  methods: {
    // 发送消息
    send () {
      const data = {
        robot: false,
        msg: this.value,
        timestamp: Date.now()
      }
      // 发送消息
      this.socket.send(data)
      this.list.push(data)
      // 更新滚动条的位置
      this.update()
    },
    update () {
      // 等DOM下一个渲染完毕，再执行
      this.$nextTick(() => {
        // 更新chat-list的scrollTop
        this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight
      })
    }
  }
}
</script>

<style scoped lang='less'>
.page-user-chat {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 10px;
      .van-image{
        vertical-align: top;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 40px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 13px;
          border-top:1px solid #c2d9ea;
          border-right:1px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 15px;
    &::before{
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 15px;
    margin-right: 0;
    &::before{
      left: -6px;
      transform: rotate(-135deg);
    }
  }
}
.van-image{
  width: 40px;
  height: 40px;
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
