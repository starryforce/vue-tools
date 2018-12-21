<script>
import Layout from '@layouts/MainLayout'
import SelectorOrder from '@components/SelectorOrder'

export default {
  metaInfo: {
    title: '订单统计',
    meta: [{ name: 'description', content: 'OrderStatistics' }],
  },
  name: 'OrderStatistics',
  components: { Layout, SelectorOrder },
  data() {
    return {
      pageNo: 1,
      pageSize: 20,
      hasNext: true,
      infiniteId: +new Date(),
      orderData: [],
      orderList: [],
      orderOptions: {},
    }
  },
  computed: {
    turnover() {
      return this.orderData.reduce((accumulator, current) => {
        return accumulator + current.value
      }, 0)
    },
  },
  methods: {
    async infiniteHandler($state) {
      try {
        let newData = (await this.$api.order.getOrderList(
          Object.assign({}, this.orderOptions, {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
          })
        )).data
        this.hasNext = newData.orders.length === this.pageSize
        if (this.pageNo === 1) {
          this.orderData = [
            { name: 'POS 收款', value: newData.posPay },
            { name: '支付宝收款', value: newData.aliPay },
            { name: '微信收款', value: newData.weChatPay },
            { name: '现金收款', value: newData.cashPay },
            { name: '余额收款', value: newData.balancePay },
            { name: '积分收款', value: newData.pointsPay },
          ]
        }
        if (newData.orders.length) {
          this.orderList.push(...newData.orders)
        }
        if (this.hasNext) {
          this.pageNo += 1
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (error) {
        $state.complete()
      }
    },
    fetchOrderOptions(newValue) {
      this.orderOptions = newValue
      this.pageNo = 1
      this.orderList = []
      this.infiniteId += 1
    },
  },
}
</script>

<template>
  <Layout>
    <VContainer>
      <VCard
        dark
        color="primary"
      >
        <VCardText>
          <VLayout>总计金额（元）</VLayout>
          <VLayout
            justify-space-between
            align-center
          >
            <span>{{ turnover }}元</span>
            <SelectorOrder @fetch:order-options="fetchOrderOptions" />
          </VLayout>
          <VLayout column>
            <VFlex
              v-for="data of orderData"
              :key="data.name"
            >
              {{ data.name }}：{{ data.value }}元
            </VFlex>
          </VLayout>
        </VCardText>
      </VCard>
    </VContainer>
    <VList
      two-line
      subheader
    >
      <VSubheader />
      <template v-for="(order, index) in orderList">
        <VDivider
          v-if="index"
          :key="'divider'+index"
        />
        <VListTile
          :key="order.title"
          :to="{name:'order-detail',params:{orderID:order.id}}"
        >
          <VLayout>
            <VLayout
              column
              :class="$style.subInfo"
            >
              <VChip
                label
                small
                disable
              >
                {{ order.payType }}
              </VChip>
              <VListTileSubTitle>{{ order.createTime }}</VListTileSubTitle>
            </VLayout>
            <VLayout
              column
              justify-space-between
              :class="$style.content"
            >
              <VListTileTitle>{{ order.productName }}</VListTileTitle>
              <VListTileSubTitle>{{ order.skuSum }}件商品</VListTileSubTitle>
            </VLayout>
            <VLayout
              column
              justify-space-between
              :class="$style.information"
            >
              <VListTileTitle>{{ order.totalAmount }}元</VListTileTitle>
              <VListTileSubTitle>{{ order.buyerNick }}</VListTileSubTitle>
            </VLayout>
            <VLayout :class="$style.listAction">
              <VIcon small>
                arrow_forward_ios
              </VIcon>
            </VLayout>
          </VLayout>
        </VListTile>
      </template>
      <infinite-loading
        :identifier="infiniteId"
        @infinite="infiniteHandler"
      />
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.subInfo {
  flex: none;
  flex-basis: 73px;
  text-align: center;
}
.information {
  flex: none;
  flex-basis: 120px;
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile__title) {
    text-align: right;
  }
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile__sub-title) {
    text-align: right;
  }
}
.listAction {
  flex: none;
  flex-basis: 16px;
}
</style>
