<template>
  <div class="top-nav">
    <div class="left-section">
      <div class="fold-btn-layout" @click="onFoldIconClick">
        <i v-bind:class="{ fold: isFold }" class="fold-btn el-icon-s-fold"></i>
      </div>
      <div class="logo-layout">
      </div>
    </div>
    <div class="center-section" :class="{ 'translateClass': translateFlag }">
      <el-menu class="top-menu" ref="menuTop" :class="{ 'overflowClass': translateFlag }" mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="item of topMenus" :key="item.id" :index="item.url">{{ $t(item.title) }}</el-menu-item>
        <!-- <el-submenu index="2">
          <template slot="title">更多</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu> -->
      </el-menu>
    </div>
    <div class="right-section">
      <div class="i18n-layout">
        <el-dropdown @command="changeLang">
          <span class="el-dropdown-link">
            <i class="el-icon-help"></i>
            {{ $t(`i18n.${$i18n.locale}`) }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item of i18nList" :key="item.key" :command="item.key"> {{ $t(`i18n.${item.key}`) }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="user-layout">
        <el-dropdown>
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided>
              <div @click="onLogoutClick">
                退出
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>

import { LOGOUT_ACTION, i18nList } from 'mf-shared-dependencies-vue'
import { TOP_MENU_LIST_GETTER, ACTIVE_TOP_MENU_ACTION } from '../../store'
export default {
  props: {
    isFold: {
      default: false,
      type: Boolean
    }
  },

  data () {
    return {
      i18nList,
      translateFlag: false
    }
  },

  computed: {
    topMenus () {
      return this.$store.getters[TOP_MENU_LIST_GETTER]
    }
  },

  watch: {
    topMenus () {
      const { path } = this.$route
      const pathArr = path.split('/')
      const centerKey = '/' + pathArr[1]
      if (centerKey !== '/') {
        this.handleSelect(centerKey)
      }
    }
  },

  methods: {
    changeLang (lang) {
      if (lang !== 'zh') {
        this.translateFlag = true
      } else {
        this.translateFlag = false
      }
      this.$i18n.locale = lang
    },

    onFoldIconClick () {
      this.$emit('onFoldChange', !this.isFold)
    },

    handleSelect (key, keyPath) {
      this.$store.dispatch(ACTIVE_TOP_MENU_ACTION, this.topMenus.find(menu => menu.url === key))
    },

    onLogoutClick () {
      this.$store.dispatch(LOGOUT_ACTION)
    }
  }
}
</script>

<style lang="scss" scoped>

@import '~mf-shared-dependencies-vue/src/styles/variable.scss';

.top-nav {
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0px 3px 6px 0px rgba(216, 216, 216, 0.2);
  background-color: $color-10;

  /deep/ .el-menu.el-menu--horizontal {
    border: none;
  }
}
.translateClass{
    width: 70%;
    overflow-x: auto;
}
.overflowClass{
    width: 1200px;
}
.logo-layout {
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.logo-image {
  height: 34px;
}

.fold-btn-layout {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.fold-btn {
  font-size: 24px;
  transition: transform 0.3s;
  &.fold {
    transform: rotate(180deg);
  }
}

.left-section,
.right-section {
  display: flex;
  align-items: center;
  color: $color-3;
}

.right-section {
  /deep/ .el-avatar {
    cursor: pointer;
  }

  /deep/ .el-divider {
    margin: 0 20px;
  }
}

.i18n-layout {
  margin-left: 20px;
}
</style>
