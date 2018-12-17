<script>
export default {
  name: 'MainLayout',
}
</script>

<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<style lang="scss" module>
@import '@design';

.container {
  height: 100vh;
  padding-bottom: 56px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
