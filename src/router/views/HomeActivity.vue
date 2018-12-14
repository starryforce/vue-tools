<script>
import Layout from '@layouts/MainLayout'

export default {
  metaInfo: {
    title: '活动',
    meta: [{ name: 'description', content: 'Loading page...' }],
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
  <Layout :class="$style.container">
    <VTabs
      v-model="tab"
      :class="$style.tabs"
      color="primary"
      grow
      dark
    >
      <VTabsSlider color="white" />

      <VTab to="/home/activity/online">
        线上促销
      </VTab>
      <VTab to="/home/activity/offline">
        线下活动
      </VTab>
    </VTabs>
    <router-view
      :key="$route.fullPath"
      :class="$style.view"
    />
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
