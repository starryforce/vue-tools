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
  /* global wx */
  async created() {
    try {
      // this.openWS()
    } catch (error) {
      this.$snotify.info('持久化链接初始化失败', '提示')
    }
    try {
      // 微信冲突，暂时关闭
      // this.initWX()
    } catch (error) {
      this.$snotify.info('微信初始化失败', '提示')
    }
  },
  methods: {
    async initWX() {
      var cof = (await this.$api.item.getTicket()).data
      cof['jsApiList'] = ['scanQRCode']
      // cof['debug'] = true
      cof['appId'] = cof.appid
      cof.signature = cof.signature.toLocaleLowerCase()
      wx.config(cof)
      wx.ready(function(res) {
        this.$snotify.success(res, '微信初始化成功')
      })
      wx.error(function(res) {
        this.$snotify.warning(res, '微信初始化失败，无法使用扫一扫')
      })
    },
    openWS() {
      const ws = new WebSocket(
        'wss://malldev.bebefocus.com:9002/bksoc?socketid=toshop123'
      )

      ws.onopen = event => {
        setTimeout(() => {
          this.$api.order.payOrderbyCode2()
        }, 200)
      }

      ws.onmessage = event => {
        if (event.data.indexOf('pay|') !== -1) {
          if (event.data.indexOf('pay|') !== -1) {
            this.$snotify.success(event.data, '支付完成')
            var orderid = event.data.replace('pay|', '').replace('.ok', '')
            this.$router.replace('/order/detail/' + orderid)
          } else {
            this.$snotify.warning(event.data, '支付失败')
          }
        }
      }

      ws.onclose = () => {
        this.$snotify.info('持久化链接已断开', '提示')
      }
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
    <vue-snotify />
    <keep-alive
      :include="['MemberLabelModify','OrderCreate','MemberLabelModify']"
      :max="1"
    >
      <router-view :key="$route.fullPath" />
    </keep-alive>
    <MainNav />
    <div
      v-show="spinnerVisible"
      id="spinner"
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

// ===
// Vendor
// ===

#nprogress .bar {
  background: $color-link-text;
}

#spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
