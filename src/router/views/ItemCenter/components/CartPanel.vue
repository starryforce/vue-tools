<script>
import NumericInput from '@components/NumericInput'

export default {
  name: 'CartPanel',
  components: {
    NumericInput,
  },
  props: {},
  data: () => ({
    dialog: false,
  }),
  computed: {
    cartItemList() {
      return this.$store.state.itemStorage.cart
    },
    totalQuantity() {
      return this.$store.getters['itemStorage/totalQuantity']
    },
    cartTotalPrice() {
      return this.$store.getters['itemStorage/cartTotalPrice']
    },
    currentMember() {
      return this.$store.state.itemStorage.selectedMember
    },
  },
  methods: {
    updateCart(newValue, item) {
      this.$store.dispatch('itemStorage/updateItem', {
        itemInfo: item,
        quantity: newValue,
      })
    },
    clearCart() {
      this.$store.dispatch('itemStorage/clearCart')
      this.dialog = false
    },
    confirmItems() {
      try {
        if (this.$store.state.itemStorage.cart.length < 1) {
          throw new Error('请选择至少一件商品')
        }
        if (!this.$store.state.itemStorage.selectedMember.id) {
          throw new Error('请选择会员')
        }
      } catch (error) {
        this.$snotify.warning(error.message)
        return
      }
      this.$router.push({ name: 'order-create' })
    },
  },
}
</script>

<template>
  <div>
    <VDialog v-model="dialog">
      <VCard>
        <VCardTitle>
          {{ currentMember.customerName }} 的购物车
          <VSpacer />
          <VBtn
            icon
            @click="dialog = false"
          >
            <VIcon>close</VIcon>
          </VBtn>
        </VCardTitle>
        <VCardText :class="$style.main">
          <VList two-line>
            <VListTile
              v-for="item in cartItemList"
              :key="item.skuId"
            >
              <VListTileAvatar>
                <VAvatar
                  tile
                >
                  <img
                    :src="item.itemCover"
                    :alt="item.spuName"
                  >
                </VAvatar>
              </VListTileAvatar>
              <VListTileContent>
                <VListTileTitle>{{ item.spuName || item.itemName }}</VListTileTitle>
                <VListTileSubTitle>{{ item.itemPrice | currency }}</VListTileSubTitle>
              </VListTileContent>
              <VListTileAction style="min-width:80px">
                <NumericInput
                  :value="item.quantity"
                  :min="0"
                  :max="99"
                  :step="1"
                  @change="updateCart($event,item)"
                />
              </VListTileAction>
            </VListTile>
          </VList>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            flat
            @click="clearCart"
          >
            清空
          </VBtn>
          <VBtn
            flat
            color="primary"
            @click="dialog=false"
          >
            关闭
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VToolbar
      :class="$style.container"
      dense
    >
      <VBadge
        overlap
        color="orange"
      >
        <span slot="badge">
          {{ totalQuantity>99 ? '99+' : totalQuantity }}
        </span>
        <VBtn
          icon
          @click="dialog = true"
        >
          <VIcon>shopping_cart</VIcon>
        </VBtn>
      </VBadge>

      <VSpacer />
      <VToolbarItems>
        <div :class="$style.priceContainer">
          ￥ <span :class="$style.price">
            {{ cartTotalPrice }}
          </span>
        </div>
        <VBtn
          v-if="totalQuantity"
          small
          dark
          color="primary"
          @click="$store.dispatch('itemStorage/pushBasket')"
        >
          挂单
        </VBtn>
        <VBtn
          v-else
          small
          dark
          color="primary"
          :to="{name:'item-baskets'}"
        >
          取单
        </VBtn>
        <VBtn
          small
          dark
          color="secondary"
          @click="confirmItems"
        >
          结算
        </VBtn>
      </VToolbarItems>
    </VToolbar>
  </div>
</template>


<style lang="scss" module>
@import '@design';
.priceContainer {
  padding-right: 10px;
  font-size: 16px;
  line-height: 48px;
}
.price {
  color: $color-button-danger;
}
.container {
  position: fixed !important;
  bottom: 0;
  // stylelint-disable selector-class-pattern
  :global(.v-toolbar__content) {
    padding-right: 0;
  }
}
.main {
  padding: 0;
}
</style>
