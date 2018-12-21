<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: '取单',
    meta: [{ name: 'description', content: '取单' }],
  },
  name: 'ItemBaskets',
  components: { Layout },
  computed: {
    basketList() {
      return this.$store.state.itemStorage.baskets
    },
  },
  methods: {
    totalQuantity(items) {
      return items.reduce((accumulator, current) => {
        return accumulator + current.quantity
      }, 0)
    },
    totalPrice(items) {
      return items.reduce((accumulator, current) => {
        return accumulator + current.quantity * current.itemPrice
      }, 0)
    },
    removeBasket(basket) {
      this.$store.dispatch('itemStorage/removeBasket', basket)
    },
    popBasket(basket) {
      this.$store.dispatch('itemStorage/popBasket', basket)
      this.$router.back()
    },
  },
}
</script>

<template>
  <Layout>
    <VList
      v-if="basketList.length"
      subheader
      three-line
    >
      <template v-for="(basket, index) of basketList">
        <VDivider
          v-if="index"
          :key="'divider1'+basket.basketID"
        />
        <VSubheader :key="'header1'+basket.basketID">
          {{ basket.member.customerName?`${basket.member.customerName} ${basket.member.mobile}`:'散客' }}
          <VSpacer />
        </VSubheader>
        <VDivider
          :key="'divider2'+basket.basketID"
        />
        <VListTile
          :key="'basket'+ index"
        >
          <VListTileContent>
            <VContainer
              :class="$style.itemContainer"
              grid-list-md
            >
              <VLayout :class="$style.itemList">
                <VFlex
                  v-for="item of basket.items"
                  :key="item.id"
                  xs3
                  :class="$style.item"
                >
                  <VImg
                    :src="item.itemCover || ''"
                    :lazy-src="item.itemCover || ''"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <VLayout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <VProgressCircular
                        indeterminate
                        color="grey lighten-5"
                      />
                    </VLayout>
                  </VImg>
                </VFlex>
              </VLayout>
            </VContainer>
          </VListTileContent>
        </VListTile>
        <VDivider
          :key="'divider3'+basket.basketID"
        />
        <VSubheader :key="'header2'+basket.basketID">
          <VChip
            color="primary"
            text-color="white"
            small
          >
            {{ basket.items[0].isCross?'跨境购':'普通商品' }}
          </VChip>
          <VSpacer />
          共 {{ totalQuantity(basket.items) }} 件
          合计{{ totalPrice(basket.items) | currency }}
        </VSubheader>
        <VSubheader :key="'header3'+basket.basketID">
          <VSpacer />
          <VBtn
            outline
            small
            color="grey"
            @click="removeBasket(basket)"
          >
            作废
          </VBtn>
          <VBtn
            outline
            small
            color="primary"
            @click="popBasket(basket)"
          >
            取单
          </VBtn>
        </VSubheader>
      </template>
    </VList>
    <p v-else>
      暂无挂单
    </p>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.itemContainer {
  padding-right: 0;
  padding-left: 0;
}
.itemList {
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.item {
  flex-shrink: 0;
}
</style>
