<script>
export default {
  data() {
    return {
      bottomNav: '',
    }
  },
}
</script>

<template>
  <VBottomNav
    :class="$style.container"
    :active.sync="bottomNav"
    :value="$route.meta.showMainNav"
    fixed
  >
    <VBtn
      color="secondary"
      flat
      value="member"
      to="/home/member/list"
      replace
    >
      <span>会员</span>
      <VIcon>child_care</VIcon>
    </VBtn>

    <VBtn
      color="secondary"
      flat
      value="activity"
      to="/home/activity"
      replace
    >
      <span>活动</span>
      <VIcon>local_offer</VIcon>
    </VBtn>

    <VBtn
      color="secondary"
      flat
      value="workbench"
      to="/home/workbench"
      replace
    >
      <span>工作台</span>
      <VIcon>apps</VIcon>
    </VBtn>

    <VBtn
      color="secondary"
      flat
      value="order"
      to="/home/order"
      replace
    >
      <span>订单</span>
      <VIcon>local_play</VIcon>
    </VBtn>

    <VBtn
      color="secondary"
      flat
      value="my"
      to="/home/my"
      replace
    >
      <span>我的</span>
      <VIcon>person</VIcon>
    </VBtn>
  </VBottomNav>
</template>

<style lang="scss" module>
@import '@design';
.container {
  z-index: 1;
  // stylelint-disable  selector-class-pattern
  &:global(.v-item-group.v-bottom-nav .v-btn) {
    min-width: 50px;
  }
}
</style>
