<script>
export default {
  name: 'Main',
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
  margin-bottom: 56px;
  overflow: auto;
}
</style>
