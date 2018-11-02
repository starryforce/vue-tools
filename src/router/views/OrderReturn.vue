<script>
import Layout from '@layouts/main'

export default {
  page: {
    title: '退单列表',
    meta: [{ name: 'description', content: 'OrderReturn' }],
  },
  name: 'OrderReturn',
  components: { Layout },
}
</script>

<template>
  <Layout :class="$style.container">
    Orderreturn
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.container {
  height: 87.2vh;
}
</style>
