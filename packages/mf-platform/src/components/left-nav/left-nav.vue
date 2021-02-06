<template>
  <div class="left-nav-layout">
    <h1>{{$t(leftNav.title)}}</h1>
    <div class="menu-layout">
      <el-menu class="left-menu" @select="handleSelect">
        <leftNavItem v-for="item of leftNav.children" :key="item.id" :menu="item"></leftNavItem>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { LEFT_MENU_GETTER } from '../../store'
import leftNavItem from './left-nav-item'

export default {
  components: {
    leftNavItem
  },
  computed: {
    leftNav () {
      return this.$store.getters[LEFT_MENU_GETTER] || { children: [] }
    }
  },
  watch: {
    leftNav () {
      const { path } = this.$route
      if (path !== '/') {
        this.handleSelect(path)
      }
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      const url = key.startsWith('/') ? key : '/' + key
      this.$emit('onLeftNavItemClick', url)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~mf-shared-dependencies-vue/src/styles/variable.scss";

.left-nav-layout {
  height: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    color: $color-4;
    margin: 0;
    padding: 20px;
    padding-bottom: 10px;
  }
}

.menu-layout {
  flex: 1;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b8b8b8;
    border-radius: 3px;
    outline: none;
  }
}

.left-menu {
  border: none;
}
</style>
