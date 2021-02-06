<template>
  <el-submenu :key="menu.id" :index="menu.id" v-if="menu.children && menu.children.length">
    <template slot="title">
      <i class="el-icon-message"></i>
      <span slot="title">{{$t(menu.title)}}</span>
    </template>
    <left-nav-item v-for="child of menu.children" :key="child.id" :menu="child"></left-nav-item>
  </el-submenu>
  <el-menu-item :key="menu.id" :index="menu.url" v-else>
    <i class="el-icon-message"></i>
    <span slot="title">{{$t(menu.title)}}</span>
  </el-menu-item>
</template>

<script>
export default {
  props: ['menu'],
  name: 'left-nav-item'
}
</script>
