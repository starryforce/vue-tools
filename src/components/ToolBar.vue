<script>
export default {}
</script>

<template>
  <VToolbar
    dark
    color="primary"
  >
    <VToolbarSideIcon @click="$router.back()">
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
