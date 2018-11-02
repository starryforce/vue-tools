<script>
import Layout from '@layouts/main'

export default {
  page: {
    title: '提货订单',
    meta: [{ name: 'description', content: 'OrderPickUp' }],
  },
  name: 'OrderPickUp',
  components: { Layout },
}
</script>

<template>
  <Layout :class="$style.container">
    Orderpickup
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.container {
  height: 87.2vh;
}
</style>
