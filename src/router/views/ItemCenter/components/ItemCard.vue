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
  },
  methods: {
    updateCart(newValue) {
      this.$store.dispatch('itemStorage/updateItem', {
        itemInfo: this.item,
        quantity: newValue,
      })
    },
    quantity(skuId) {
      return this.$store.getters['itemStorage/cartItemQuantity'](skuId)
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
        :src="item.itemCover"
      />
    </VListTileAvatar>

    <VListTileContent>
      <VListTileTitle>{{ item.itemName }}</VListTileTitle>
      <VListTileSubTitle>¥ {{ item.itemPrice.toFixed(2) }}</VListTileSubTitle>
      <VListTileSubTitle>
        <VLayout>
          <VFlex>1</VFlex>
          <VSpacer />

          <VFlex :class="$style.numeric">
            <NumericInput
              :value="quantity(item.skuId)"
              :min="0"
              :max="99"
              :step="1"
              @change="updateCart"
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
