<script>
export default {
  data() {
    return {
      bottomNav: 'workbench',
    }
  },
}
</script>

<template>
  <VBottomNav
    :class="$style.container"
    :active.sync="bottomNav"
    :value="true"
    fixed
    color="transparent"
  >
    <VBtn
      color="teal"
      flat
      value="member"
      to="/home/member"
    >
      <span>会员</span>
      <VIcon>people</VIcon>
    </VBtn>

    <VBtn
      color="teal"
      flat
      value="activity"
      to="/home/activity"
    >
      <span>活动</span>
      <VIcon>event</VIcon>
    </VBtn>

    <VBtn
      color="teal"
      flat
      value="workbench"
      to="/home/workbench"
    >
      <span>工作台</span>
      <VIcon>grid_on</VIcon>
    </VBtn>

    <VBtn
      color="teal"
      flat
      value="order"
      to="/home/order"
    >
      <span>订单</span>
      <VIcon>assignment</VIcon>
    </VBtn>

    <VBtn
      color="teal"
      flat
      value="my"
      to="/home/my"
    >
      <span>我的</span>
      <VIcon>person</VIcon>
    </VBtn>
  </VBottomNav>
</template>

<style lang="scss" module>
@import '@design';
.container {
  &:global(.v-item-group.v-bottom-nav .v-btn) {
    min-width: 50px;
  }
}
</style>
