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
    <ToolBar />
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
