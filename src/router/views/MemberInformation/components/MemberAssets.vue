<script>
export default {
  name: 'MemberAssets',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      assets: () => {},
    }
  },
  async created() {
    this.assets = await this.$api.member.getAssets(this.id)
  },
}
</script>

<template>
  <VList subheader>
    <VSubheader>
      抵用资产
    </VSubheader>
    <VListTile :to="{name:'member-point',params:{memberID:id}}">
      <VListTileContent>
        <VListTileTitle>购物积分</VListTileTitle>
      </VListTileContent>
      <VListTileAction>
        <VListTileActionText>{{ assets.integralCount }}</VListTileActionText>
      </VListTileAction>
    </VListTile>
    <VDivider />
    <VListTile :to="{name:'member-balance',params:{memberID:id}}">
      <VListTileContent>
        <VListTileTitle>余额</VListTileTitle>
      </VListTileContent>
      <VListTileAction>
        <VListTileActionText>￥{{ assets.memberAmount }}</VListTileActionText>
      </VListTileAction>
    </VListTile>
    <VDivider />
    <VSubheader>
      优惠券
    </VSubheader>
    <VListTile :to="{name:'member-coupon',params:{memberID:id}}">
      <VListTileContent>
        <VListTileTitle>可使用</VListTileTitle>
      </VListTileContent>
      <VListTileAction>
        <VListTileActionText>{{ assets.couponUsableCount }}</VListTileActionText>
      </VListTileAction>
    </VListTile>
    <VDivider />
    <VListTile :to="{name:'member-coupon',params:{memberID:id}}">
      <VListTileContent>
        <VListTileTitle>已使用</VListTileTitle>
      </VListTileContent>
      <VListTileAction>
        <VListTileActionText>{{ assets.couponUsedCount }}</VListTileActionText>
      </VListTileAction>
    </VListTile>
    <VDivider />
    <VListTile :to="{name:'member-coupon',params:{memberID:id}}">
      <VListTileContent>
        <VListTileTitle>已过期</VListTileTitle>
      </VListTileContent>
      <VListTileAction>
        <VListTileActionText>{{ assets.couponEexpiredCount }}</VListTileActionText>
      </VListTileAction>
    </VListTile>
  </VList>
</template>

<style lang="scss" module>
@import '@design';
</style>
