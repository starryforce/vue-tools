<script>
export default {
  name: 'OrderItemList',
  props: {
    items: {
      type: Array,
      required: true,
    },
    totalQuantity: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<template>
  <VList
    :class="$style.container"
    three-line
  >
    <VSubheader>
      共<span :class="$style.brandColor">
        {{ totalQuantity }}
      </span>件商品
    </VSubheader>
    <template v-for="(item, index) in items">
      <VDivider
        :key="index"
        :inset="item.inset"
      />

      <VListTile
        :key="item.title"
        avatar
      >
        <VListTileAvatar tile>
          <img :src="item.itemCover">
        </VListTileAvatar>

        <VListTileContent>
          <VListTileTitle>
            <VLayout>
              <VFlex>{{ item.itemCode }}</VFlex>
              <VFlex :class="$style.rightElement">
                {{ item.quantity }}件
              </VFlex>
            </VLayout>
          </VListTileTitle>
          <VListTileTitle>{{ item.itemName }}</VListTileTitle>
          <VListTileSubTitle>
            <VLayout
              justify-space-between
              shrink
            >
              <VFlex>{{ item.itemCode }}</VFlex>
              <VFlex :class="$style.rightElement">
                ￥{{ item.itemPrice }}
              </VFlex>
            </VLayout>
          </VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </template>
  </VList>
</template>

<style lang="scss" module>
@import '@design';
.container {
  margin-bottom: 10px;
}
.brandColor {
  color: $color-brand;
}
</style>
