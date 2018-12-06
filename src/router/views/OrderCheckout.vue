<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: '收款',
    meta: [{ name: 'description', content: '收款' }],
  },
  name: 'OrderCheckout',
  components: { Layout },
  props: {
    orderID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      paymentList: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: '微信支付',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: '现金支付',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'POS 刷卡支付',
        },
      ],
      orderInfo: {},
    }
  },
  async created() {
    this.orderInfo = (await this.$api.order.getOrderDetail(this.orderID)).data
  },
}
</script>

<template>
  <Layout>
    <VToolbar dense>
      <VToolbarTitle>
        <VBtn color="primary">
          改价
        </VBtn>
      </VToolbarTitle>
      <VSpacer />
      <VToolbarItems>
        <VBtn flat>
          订单金额：{{ orderInfo.totalAmount }}元
        </VBtn>
      </VToolbarItems>
    </VToolbar>
    <VList>
      <template v-for="(payment, index) in paymentList">
        <VDivider
          v-if="index"
          :key="index"
        />
        <VListTile
          :key="payment.title"
          avatar
          @click=""
        >
          <VListTileAvatar tile>
            <img :src="payment.avatar">
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>
              {{ payment.title }}
            </VListTileTitle>
          </VListTileContent>
        </VListTile>
      </template>
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
</style>
