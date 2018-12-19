<script>
export default {
  name: 'MemberConsume',
  props: {
    consumAmount: {
      type: Number,
      default: 0,
    },
    consumCount: {
      type: Number,
      default: 0,
    },
    unitPrice: {
      type: Number,
      default: 0,
    },
    lastActivityTime: {
      type: String,
      default: '',
    },
    lastTradeTime: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <VList>
    <VListTile>
      <VListTileContent>
        <VListTileTitle>消费总金额</VListTileTitle>
      </VListTileContent>
      <VListTileAction>
        <VListTileActionText>￥{{ consumAmount }}</VListTileActionText>
      </VListTileAction>
    </VListTile>
    <VDivider />
    <VListTile>
      <VListTileContent>
        <VListTileTitle>消费次数</VListTileTitle>
      </VListTileContent>
      <VListTileAction>
        <VListTileActionText>{{ consumCount }}</VListTileActionText>
      </VListTileAction>
    </VListTile>
    <VDivider />
    <VListTile>
      <VListTileContent>
        <VListTileTitle>客单价</VListTileTitle>
      </VListTileContent>
      <VListTileAction>
        <VListTileActionText>￥{{ unitPrice }}</VListTileActionText>
      </VListTileAction>
    </VListTile>
    <VDivider />
    <VListTile>
      <VListTileContent>
        <VListTileTitle>最近活动参与时间</VListTileTitle>
      </VListTileContent>
      <VListTileAction>
        <VListTileActionText>{{ lastActivityTime }}</VListTileActionText>
      </VListTileAction>
    </VListTile>
    <VDivider />
    <VListTile>
      <VListTileContent>
        <VListTileTitle>最近消费时间</VListTileTitle>
      </VListTileContent>
      <VListTileAction>
        <VListTileActionText>{{ lastTradeTime }}</VListTileActionText>
      </VListTileAction>
    </VListTile>
  </VList>
</template>

<style lang="scss" module>
@import '@design';
</style>
