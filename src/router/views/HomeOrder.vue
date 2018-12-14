<script>
import Layout from '@layouts/MainLayout'

export default {
  metaInfo: {
    title: '订单',
    meta: [{ name: 'description', content: 'HomeOrder' }],
  },
  name: 'HomeOrder',
  components: { Layout },
  data() {
    return {
      tab: 0,
    }
  },
}
</script>

<template>
  <Layout :class="$style.container">
    <router-view
      :key="$route.fullPath"
      :class="$style.view"
    />
    <VTabs
      v-model="tab"
      :class="$style.tabs"
      color="primary"
      grow
      dark
    >
      <VTabsSlider color="white" />

      <VTab to="/home/order/statistics">
        订单统计
      </VTab>
      <VTab to="/home/order/return">
        退单列表
      </VTab>
      <!-- <VTab to="/home/order/pickup">
        提货订单
      </VTab> -->
    </VTabs>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.container {
  padding-bottom: 0;
}
.tabs {
  position: absolute;
  top: 0;
  z-index: 10;
  width: 100%;
}
.view {
  padding-top: 48px;
}
</style>
