<script>
import ToolBar from '@components/ToolBar'

export default {
  name: 'WithToolBar',
  components: {
    ToolBar,
  },
}
</script>
<template>
  <div :class="$style.container">
    <ToolBar :class="$style.toolbar" />
    <slot />
  </div>
</template>

<style lang="scss" module>
@import '@design';

.container {
  height: 100vh;
  padding-top: 48px;
  overflow: auto;
}
.toolbar {
  position: absolute;
  top: 0;
  z-index: $layer-page-z-index;
}
</style>
