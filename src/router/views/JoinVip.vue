<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: '购买VIP',
    meta: [{ name: 'description', content: '购买VIP' }],
  },
  name: 'JoinVip',
  components: { Layout },
  props: {
    memberID: {
      type: String,
      required: true,
    },
  },
  created() {
    this.createSuperVip()
  },
  methods: {
    async createSuperVip() {
      const orderID = (await this.$api.order.createSuperVip(this.memberID)).data
      this.$router.replace({ name: 'order-checkout', params: { orderID } })
    },
  },
}
</script>

<template>
  <Layout>订单创建中...请稍后</Layout>
</template>
