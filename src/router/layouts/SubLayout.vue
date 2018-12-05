<script>
export default {
  name: 'SubLayout',
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
  overflow: auto;
}
</style>
