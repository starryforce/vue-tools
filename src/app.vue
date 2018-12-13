<script>
import appConfig from '@src/app.config'
import MainNav from '@components/MainNav'

export default {
  metaInfo: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
  components: {
    MainNav,
  },
  computed: {
    spinnerVisible() {
      return this.$store.state.notice.spinner
    },
  },
  async created() {
    var cof = (await this.$api.item.getTicket()).data
    cof['jsApiList'] = ['scanQRCode']
    // cof['debug'] = true
    cof['appId'] = cof.appid
    cof.signature = cof.signature.toLocaleLowerCase()
    // eslint-disable-next-line
    wx.config(cof)
    // eslint-disable-next-line
    wx.ready(function() {})
    // eslint-disable-next-line
    wx.error(function(res) {
      this.$snotify.warning(res, '微信初始化失败，无法使用扫一扫')
    })
  },
}
</script>

<template>
  <VApp id="app">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
    <vue-snotify />
    <keep-alive
      :include="['MemberLabelModify','OrderCreate']"
      :max="1"
    >
      <router-view :key="$route.fullPath" />
    </keep-alive>
    <MainNav
      v-show="$route.meta.showMainNav"
      style="z-index:1"
    />
    <div
      v-show="spinnerVisible"
      :class="$style.spinnerContainer"
    >
      <VProgressCircular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      />
    </div>
  </VApp>
</template>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

// Normalize default styles across browsers,
// https://necolas.github.io/normalize.css/
// @import '~normalize.css/normalize.css';
// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';
@import '~vue-snotify/styles/material';
// Design variables and utilities from src/design.
@import '@design';

// postcss-viewport-units
// vw polyfill 图片显示 bug 修复
img {
  content: normal !important;
}

// 修复两个 ui 库 图标冲突
.v-icon.v-icon.v-icon {
  justify-content: center;
  font-size: 24px;
  vertical-align: text-bottom;
}

// ===
// Vendor
// ===

#nprogress .bar {
  background: $color-link-text;
}
</style>

<style lang="scss" module>
// stylelint-disable no-duplicate-at-import-rules
@import '@design';

.spinnerContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
