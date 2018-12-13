<script>
import NumericInput from '@components/NumericInput'

export default {
  name: 'ItemCard',
  components: {
    NumericInput,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    num: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    inp($event) {
      this.$emit('input', $event)
    },
  },
}
</script>

<template>
  <VListTile
    avatar
    :class="$style.container"
  >
    <VListTileAvatar
      tile
      size="80"
    >
      <VImg
        :src="item.picUrl || ''"
      />
    </VListTileAvatar>

    <VListTileContent>
      <VListTileTitle>{{ item.skuName }}</VListTileTitle>
      <VListTileSubTitle>¥ {{ item.salePrice.toFixed(2) }}</VListTileSubTitle>
      <VListTileSubTitle>
        <VLayout>
          <VFlex>共 {{ item.number }}减</VFlex>
          <VSpacer />

          <VFlex :class="$style.numeric">
            <NumericInput
              :value="num"
              :min="0"
              :max="item.number"
              :step="1"
              @input="inp"
            />
          </VFlex>
        </VLayout>
      </VListTileSubTitle>
    </VListTileContent>
  </VListTile>
</template>


<style lang="scss" module>
@import '@design';
.container {
  // stylelint-disable-next-line
  :global(.v-list__tile__avatar) {
    flex-shrink: 0;
    width: 88px;
    margin-top: 0;
  }
  // stylelint-disable-next-line
  :global(.v-list__tile__action) {
    flex-shrink: 0;
  }
}
.numeric {
  flex: none;
}
</style>
