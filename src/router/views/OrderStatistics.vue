<script>
import Layout from '@layouts/main'

export default {
  page: {
    title: '订单统计',
    meta: [{ name: 'description', content: 'OrderStatistics' }],
  },
  name: 'OrderStatistics',
  components: { Layout },
}
</script>

<template>
  <Layout :class="$style.container">
    Orderstatistics
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.container {
  height: 87.2vh;
}
</style>
