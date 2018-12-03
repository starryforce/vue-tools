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
      this.$store.dispatch('basketTemp/updateItem', {
        itemInfo: this.item,
        quantity: newValue,
      })
    },
    quantity(skuId) {
      return this.$store.getters['basketTemp/cartItemQuantity'](skuId)
    },
  },
}
</script>

<template>
  <VListTile avatar>
    <VListTileAvatar
      tile
      size="70"
    >
      <VImg
        :src="item.itemCover"
      />
    </VListTileAvatar>

    <VListTileContent>
      <VListTileTitle>{{ item.itemName }}</VListTileTitle>
      <VListTileSubTitle>¥ {{ item.itemPrice.toFixed(2) }}</VListTileSubTitle>
    </VListTileContent>
    <VListTileAction>
      <NumericInput
        :value="quantity(item.skuId)"
        :min="0"
        :max="99"
        :step="1"
        @change="updateCart"
      />
    </VListTileAction>
  </VListTile>
</template>


<style lang="scss" module>
@import '@design';
</style>
