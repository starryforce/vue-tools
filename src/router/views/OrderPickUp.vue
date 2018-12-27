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
      pageNo: 1,
      pageSize: 20,
      hasNext: true,
      orderList: [],
    }
  },
  methods: {
    async infiniteHandler($state) {
      let newData = (await this.$api.order.getOrderList({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        orderStatus: 1, // 1 : 待发货
        postType: 0, // 0: 自提
      })).data.orders
      this.hasNext = newData.length === this.pageSize
      if (newData.length) {
        this.orderList.push(...newData)
      }
      if (this.hasNext) {
        this.pageNo += 1
        $state.loaded()
      } else {
        $state.complete()
      }
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
        @click="$router.push({name:'order-pickup-detail',params:{orderID:order.id}})"
      >
        <VLayout>
          <VFlex class="caption">
            订单号：{{ order.orderNo }}
          </VFlex>
          <VFlex class="text-xs-right">
            {{ order.buyerNick }}
          </VFlex>
        </VLayout>
        <VDivider />
        <ItemListCard :item-list="order.detailList" />
      </VContainer>
      <infinite-loading
        @infinite="infiniteHandler"
      />
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.orderContainer {
  padding-top: 0;
}
</style>
