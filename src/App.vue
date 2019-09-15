<template>
  <div id="app">
    <!-- <my-table :header="['姓名', '年龄']" :body="[{ name: 'zs', age: 18 }, { name: 'ls', age: 20 }]"></my-table> -->
    <!-- 使用keep-alive缓存动态切换的组件 -->
    <!--
      include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
      exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
      max - 数字。最多可以缓存多少组件实例。
     -->
    <keep-alive exclude="Detail,xiangqing">
      <router-view/>
    </keep-alive>
  </div>
</template>

<style>
</style>
