<script>
import Layout from '@layouts/MainLayout'
import ItemListCard from '@components/ItemListCard'

export default {
  metaInfo: {
    title: '提货订单',
    meta: [{ name: 'description', content: 'OrderPickUp' }],
  },
  name: 'OrderPickUp',
  components: { Layout, ItemListCard },
  data() {
    return {
      orderList: [],
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      this.orderList = (await this.$api.order.getOrderList({
        orderStatus: 1, // 1 : 待发货
        postType: 0, // 0: 自提
      })).data
    },
  },
}
</script>

<template>
  <Layout>
    <VList subheader>
      <VSubheader>
        待提货
      </VSubheader>
      <VContainer
        v-for="order in orderList"
        :key="order.orderNo"
        :class="$style.orderContainer"
        @click="$router.push({name:'order-pickup-detail',orderID:order.id})"
      >
        <VLayout>
          <VFlex>
            订单编号{{ order.orderNo }}
          </VFlex>
          <VSpacer />
          <VFlex>
            {{ order.totalAmount }}
          </VFlex>
        </VLayout>
        <VDivider />
        <ItemListCard :item-list="order.detailList" />
      </VContainer>
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.orderContainer {
  padding-top: 0;
}
</style>
