<template>
  <div id="app">
    <Login v-if="!isLogin"></Login>
    <el-container v-if="isLogin" class="main-container">
      <el-header class="top-nav-layout">
        <TopNav :isFold="isFold" @onFoldChange="onFoldChange" />
      </el-header>
      <el-container class="bottom-container">
        <el-aside class="left-nav-layout" v-bind:class="{ fold: isFold }">
          <LeftNav @onLeftNavItemClick="onLeftNavItemClick" />
        </el-aside>
        <el-main class="main-layout">
          <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              v-for="item of breadcrumbItems"
              :key="item.url"
              :to="{ path: item.url }"
            >{{ $t(item.title) }}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TopNav from '@/components/top-nav/top-nav'
import LeftNav from '@/components/left-nav/left-nav'
import Login from '@/views/login/login'

import { getCon, LOGIN_STATUS_GETTER, navigateToUrl } from 'mf-shared-dependencies-vue'

import { GET_MENU_ACTION, MENU_URL_MAP_GETTER } from './store'

const getMainNode = () => {
  return document.querySelector(getCon())
}

const formatUrl = url => {
  return url.startsWith('/') ? url : `/${url}`
}

const pathWithoutQuery = url => {
  return url.split('?')[0]
}

const findItemByUrl = (url, pageUrlMaps) => {
  return pageUrlMaps[url] || pageUrlMaps[`/${url}`] || null
}

const HOME_PAGE_URL = '/personal-workbench/home-page'

export default {
  data () {
    return {
      isFold: false,
      breadcrumbItems: []
    }
  },
  created () {
    if (this.isLogin) {
      this.$store.dispatch(GET_MENU_ACTION)
    }

    this.changeConStyle(this.isLogin)
  },
  components: {
    TopNav,
    LeftNav,
    Login
  },
  computed: {
    isLogin () {
      return this.$store.getters[LOGIN_STATUS_GETTER] || true
    },
    urlPageMap () {
      return this.$store.getters[MENU_URL_MAP_GETTER]
    }
  },
  watch: {
    isLogin (val) {
      // this.$store.dispatch(GET_MENU_ACTION)
      // this.changeConStyle(val)
      return true
    },
    $route (to, from) {
      // 对路由变化作出响应...
      this.addBreadcrumbItem(to.fullPath)
    }
  },
  methods: {
    changeConStyle (isLogin) {
      // 控制mf-application的样式
      const mainNode = getMainNode()
      if (mainNode) {
        mainNode.classList[isLogin ? 'add' : 'remove']('login')
      }
    },
    onLeftNavItemClick (url) {
      this.breadcrumbItems = []
      if (url !== HOME_PAGE_URL) {
        this.breadcrumbItems.push({ title: '首页', url: HOME_PAGE_URL })
      }
      this.addBreadcrumbItem(url)
      navigateToUrl(url)
    },

    onFoldChange (evt) {
      this.isFold = evt
      const mainNode = getMainNode()
      if (evt) {
        mainNode.classList.add('fold')
      } else {
        mainNode.classList.remove('fold')
      }
    },

    addHomePage () {
      this.breadcrumbItems.unshift({ title: '首页', url: HOME_PAGE_URL })
    },

    addBreadcrumbItem (url) {
      const urlWithoutQuery = formatUrl(pathWithoutQuery(url))
      const currentItem = findItemByUrl(urlWithoutQuery, this.urlPageMap)
      const dupBreadItem = this.breadcrumbItems.find(item => {
        const cacheItemUrlWithoutQuery = formatUrl(pathWithoutQuery(item.url))
        return cacheItemUrlWithoutQuery === urlWithoutQuery
      })

      // 处理由首页跳其他页面
      if (
        urlWithoutQuery !== HOME_PAGE_URL &&
        (!this.breadcrumbItems.length ||
          this.breadcrumbItems[0].url !== HOME_PAGE_URL)
      ) {
        this.addHomePage()
      }

      if (currentItem && !dupBreadItem && urlWithoutQuery !== HOME_PAGE_URL) {
        this.breadcrumbItems.push({
          url,
          title: currentItem.name
        })
      }
    }
  }
}
</script>

<style lang="scss">
html,
body,
body > div[id^="single-spa"],
body #app {
  height: 100%;
  width: 100%;
}

.top-nav-layout {
  position: absolute;
  width: 100%;
  z-index: 1;
}

.main-container {
  height: 100%;

  .breadcrumb {
    font-size: 20px;
    line-height: 26px;
    height: 26px;
  }
}

body,
.bottom-container {
  overflow: hidden;
}

body {
  font-family: "Microsoft YaHei";
  margin: 0;
}

#app {
  .el-header {
    padding: 0;
  }
}

.bottom-container {
  padding-top: 60px;
  background: rgb(248, 248, 247);
}

.left-nav-layout {
  overflow: hidden;
  width: 250px !important;
  transition: width 0.3s;
  background: #fff;

  &.fold {
    width: 0 !important;
  }
}

#main {
  position: absolute;
  right: 0;
  left: 270px;
  top: 130px;
  right: 20px;
  bottom: 20px;
  overflow: auto;
  transition: left 0.3s;
  display: none;

  &.fold {
    left: 30px;
  }

  &.login {
    display: block !important;
  }

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
</style>
