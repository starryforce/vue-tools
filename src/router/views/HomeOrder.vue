<script>
import Layout from '@layouts/main'

export default {
  page: {
    title: '订单',
    meta: [{ name: 'description', content: 'HomeOrder' }],
  },
  components: { Layout },
  data() {
    return {
      tab: 0,
    }
  },
}
</script>

<template>
  <Layout>
    <VTabs
      v-model="tab"
      :color="$style['color-brand-light']"
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
      <VTab to="/home/order/pickup">
        提货订单
      </VTab>
    </VTabs>
    <router-view :key="$route.fullPath" />
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
:export {
  // stylelint-disable-next-line property-no-unknown
  color-brand-light: $color-brand-light;
}
</style>
