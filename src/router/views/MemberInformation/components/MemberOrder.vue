<script>
export default {
  name: 'MemberOrder',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      orders: () => {},
    }
  },
  async created() {
    this.orders = await this.$api.member.getConsume(this.id)
  },
}
</script>

<template>
  <VList
    v-if="orders"
    :class="$style.order"
    subheader
  >
    <div
      v-for="(order, index) in orders.orderInfo"
      :key="order.orderId"
      @click="$router.push({name:'order-detail',params:{orderID:order.orderId}})"
    >
      <VDivider v-if="index" />
      <VSubheader>
        <VIcon>assignment</VIcon>
        订单号：{{ order.orderNo }}
      </VSubheader>
      <VListTile>
        <VListTileContent>
          <VContainer
            fluid
            grid-list-sm
          >
            <VLayout
              v-if="order"
              :class="$style.imageContainer"
            >
              <VFlex
                v-for="item in order.orderDetail.length>5?order.orderDetail.slice(0,4):order.orderDetail"
                :key="item.id"
                d-flex
                :class="$style.imageContainer"
              >
                <VImg
                  :src="item.picUrl || ''"
                  :lazy-src="item.picUrl || ''"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <VLayout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <VProgressCircular
                      indeterminate
                      color="grey lighten-5"
                    />
                  </VLayout>
                </VImg>
              </VFlex>
              <VFlex
                v-if="order.orderDetail.length>5"
                d-flex
                align-center
                colunm
                :class="$style.itemQuantity"
              >
                <VLayout
                  :column="true"
                  align-center
                >
                  <VFlex>
                    共{{ order.orderDetail.length }}件
                  </VFlex>
                  <VFlex>
                    商品
                  </VFlex>
                </VLayout>
              </VFlex>
            </VLayout>
          </VContainer>
        </VListTileContent>
      </VListTile>
      <VSubheader>
        <VIcon>today</VIcon>
        日期：{{ order.createTime }}
        <VSpacer />
        <VIcon>payment</VIcon>
        总金额：￥{{ order.totalAmount }}
      </VSubheader>
    </div>
  </VList>
</template>

<style lang="scss" module>
@import '@design';
.order {
  // stylelint-disable selector-class-pattern
  :global(.v-list__tile) {
    height: 100%;
  }
  :global(.container.fluid) {
    padding-top: 0;
    padding-right: 0;
    padding-left: 0;
  }

  :global(.flex.d-flex) {
    flex-basis: 20%;
    flex-grow: 0;
  }
}
.imageContainer {
  height: 70px;
}
.itemQuantity {
  background-color: $color-button-bg;
}
</style>
