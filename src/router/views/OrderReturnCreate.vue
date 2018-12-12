<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/MainLayout'
import ProductViewItem from '@components/ProductViewItem'

export default {
  metaInfo: {
    title: '创建退货',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, ProductViewItem },
  props: {
    orrderID: {
      type: String,
      default: '',
    },
  },
  computed: {
    basketList() {
      return this.$store.state.itemStorage.baskets
    },
  },
}
</script>

<template>
  <Layout>
    <ProductViewItem />
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
</style>
