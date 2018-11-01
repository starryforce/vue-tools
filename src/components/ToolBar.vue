<script>
export default {}
</script>

<template>
  <VToolbar
    dark
    :color="$style['color-brand-light']"
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
:export {
  // stylelint-disable-next-line property-no-unknown
  color-brand-light: $color-brand-light;
}
</style>
