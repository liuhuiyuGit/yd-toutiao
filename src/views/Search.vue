<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(value)"
      @cancel="onCancel"
      @input="handleInput"
      clearable
      background="#3e9df8"
    />
    <!-- 搜索提示 -->
    <!-- 只有v-html指令能够渲染标签，其它任何指令都不可以渲染标签，会把标签进行转义 -->
    <van-cell-group v-show="value">
      <van-cell
        @click="onSearch(item)"
        v-for="item in suggestionList"
        :key="item"
        icon="search">
        <!-- <div slot="title">{{ highlight(item) }}</div> -->
        <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell-group v-show="!value">
      <van-cell title="历史记录">
        <!-- 自定义右侧内容 -->
        <div v-show="isEdit" style="display: inline-block">
          <span>全部删除</span>&nbsp;
          <span @click="isEdit=false">完成</span>&nbsp;
        </div>
        <van-icon v-show="!isEdit" @click="isEdit=true" name="delete" size="18px" />
      </van-cell>
      <van-cell
        @click="onSearch(item)"
        v-for="(item, index) in histories"
        :key="item"
        :title="item">
        <!-- 自定义右侧内容 -->
        <van-icon v-show="isEdit" name="close" @click="handleDelete(index)" size="18px" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import _ from 'lodash'
import { getSuggestion } from '@/api/search'
import { mapState } from 'vuex'
import * as storageTools from '@/utils/localStorage'
export default {
  name: 'Search',
  data () {
    return {
      value: '',
      // 存储搜索建议
      suggestionList: [],
      // 编辑模式
      isEdit: false,
      // 历史记录
      histories: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    // 加载历史记录
    if (this.user) {
      // 从服务器获取数据
      return
    }
    // 没有登录，从本地存储获取数据
    this.histories = storageTools.getItem('history') || []
  },
  methods: {
    onSearch (item) {
      // 跳转到搜索结果页面
      this.$router.push({
        name: 'search-result',
        params: {
          q: item
        }
      })
      // 判断histories中是否已经存在item
      if (this.histories.includes(item)) {
        return
      }
      // 记录搜索历史
      this.histories.push(item)
      // 判断用户是否登录
      if (this.user) {
        // 发送请求。。。。
        return
      }
      // 没有登录，把历史记录存储到本地存储
      storageTools.setItem('history', this.histories)
    },
    onCancel () {},
    // 在文本框输入的过程中获取搜索提示
    handleInput: _.debounce(async function () {
      // 判断是否为空
      if (this.value.length === 0) {
        return
      }
      try {
        const data = await getSuggestion(this.value)
        this.suggestionList = data.options
      } catch (err) {
        console.log(err)
      }
    }, 300),
    // 点击历史记录的删除按钮
    handleDelete (index) {
      this.histories.splice(index, 1)
      storageTools.setItem('history', this.histories)
    },
    // 高亮显示搜索建议中的匹配内容
    highlight (item) {
      // item 是提示项目
      // this.value
      const reg = new RegExp(this.value, 'gi')
      // /abc/gi
      return item.replace(reg, `<span style="color: red">${this.value}</span>`)
    }
  }
}
</script>

<style>

</style>
