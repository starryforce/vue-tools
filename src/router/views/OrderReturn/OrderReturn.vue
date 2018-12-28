<script>
import Layout from '@layouts/MainLayout'
import ItemListCard from '@components/ItemListCard'

export default {
  metaInfo: {
    title: '退单列表',
    meta: [{ name: 'description', content: 'OrderReturn' }],
  },
  name: 'OrderReturn',
  components: { Layout, ItemListCard },
  data() {
    return {
      pageNo: 1,
      pageSize: 20,
      hasNext: true,
      infiniteId: +new Date(),
      state: 0,
      orderList: [],
      orderStatusList: [
        { text: '顾客申请', value: 0 },
        { text: '门店同意', value: 1 },
        { text: '门店驳回', value: 2 },
        { text: '顾客已发货', value: 3 },
        { text: '已收货', value: 4 },
        { text: '收货拒绝', value: 5 },
        { text: '中台同意', value: 6 },
        { text: '中台驳回', value: 7 },
        { text: '已退款（已退换）', value: 8 },
      ],
    }
  },
  methods: {
    async infiniteHandler($state) {
      let newData = (await this.$api.order.getReturnOrders({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        state: this.state,
      })).data
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
    changeState() {
      this.pageNo = 1
      this.orderList = []
      this.infiniteId += 1
    },
  },
}
</script>

<template>
  <Layout>
    <VContainer class="pb-0">
      <VSelect
        v-model="state"
        :items="orderStatusList"
        label="订单状态"
        @change="changeState"
      />
    </VContainer>
    <VList two-line>
      <VContainer
        v-for="(order) in orderList"
        :key="order.info.id"
        @click="$router.push({name:'order-return-detail',params:{id:order.info.id,state}})"
      >
        <VLayout>
          <VFlex class="caption">
            退单号：{{ order.info.returnOrderNo }}
          </VFlex>
          <VFlex class="text-xs-right">
            总金额：{{ order.info.returnFee | currency }}
          </VFlex>
        </VLayout>
        <VDivider />
        <ItemListCard
          :item-list="order.detailList"
        />
        <VDivider />
        <VLayout>
          <VFlex class="caption">
            订单日期：{{ order.info.time }}
          </VFlex>
          <VFlex class="text-xs-right">
            客户：{{ order.info.buyerNick }}
          </VFlex>
        </VLayout>
      </VContainer>
      <infinite-loading
        :identifier="infiniteId"
        @infinite="infiniteHandler"
      />
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
</style>
