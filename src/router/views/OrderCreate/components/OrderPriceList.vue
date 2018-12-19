<script>
export default {
  name: 'OrderPriceList',
  props: {
    preOrderInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    cartTotalPrice() {
      return this.$store.getters['itemStorage/cartTotalPrice']
    },
    priceList() {
      return [
        { labelName: '商品原价合计：', value: this.cartTotalPrice, sign: '' },
        {
          labelName: 'VIP优惠：',
          value: this.preOrderInfo.freeVipAmount,
          sign: '-',
        },
        {
          labelName: '满减满折优惠：',
          value: this.preOrderInfo.freeFullAmount,
          sign: '-',
        },
        {
          labelName: '限时折扣：',
          value: this.preOrderInfo.freeLimitAmount,
          sign: '-',
        },
        {
          labelName: '优惠券抵扣：',
          value: this.preOrderInfo.freeCouponAmount,
          sign: '-',
        },
        {
          labelName: '积分抵扣：',
          value: this.preOrderInfo.usePointMoney,
          sign: '-',
        },
        {
          labelName: '运费：',
          value: this.preOrderInfo.totalPostAmount,
          sign: '+',
        },
        {
          labelName: '减免的邮费：',
          value: this.preOrderInfo.freePostAmount,
          sign: '-',
        },
      ]
    },
  },
}
</script>

<template>
  <VList>
    <template v-for="(price, index) in priceList">
      <VDivider
        v-if="index"
        :key="index"
      />

      <VListTile :key="price.labelName">
        <VListTileContent>
          <VListTileTitle>{{ price.labelName }}</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          <VListTileActionText> {{ price.sign }} ¥{{ price.value }} </VListTileActionText>
        </VListTileAction>
      </VListTile>
    </template>
  </VList>
</template>

<style lang="scss" module>
@import '@design';
</style>
