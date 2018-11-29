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
}
</script>

<template>
  <VApp id="app">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
    <keep-alive
      :include="['MemberLabelModify']"
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

// Design variables and utilities from src/design.
@import '@design';

// postcss-viewport-units
// vw polyfill 图片显示 bug 修复
img {
  content: normal !important;
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
