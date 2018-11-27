<script>
export default {
  name: 'ToolBar',
  props: {
    backEvent: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    back() {
      this.backEvent()
      this.$router.back()
    },
  },
}
</script>

<template>
  <VToolbar
    dark
    dense
    color="primary"
  >
    <VToolbarSideIcon @click="back">
      <VIcon>chevron_left</VIcon>
    </VToolbarSideIcon>

    <VToolbarTitle />

    <VSpacer />

    <VBtn icon>
      <VIcon>more_vert</VIcon>
    </VBtn>
  </VToolbar>
</template>

<style lang="scss" module>
@import '@design';
</style>
