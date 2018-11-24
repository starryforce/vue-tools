<script>
import Layout from '@layouts/main'
import ProductItem from '@components/ProductItem'
import NumericUpDown from '@components/NumericUpDown'
import { mapState } from 'vuex'

export default {
  name: 'GoodsList',
  page: {
    title: '商品列表',
    meta: [{ name: 'description', content: '商品列表' }],
  },
  components: { Layout, ProductItem, NumericUpDown },
  props: {
    resource: {
      type: String,
      default: '',
    },
    activityId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectedIndex: 0,
      shopCart: [],
      products: [],
      keyWords: null,
    }
  },
  computed: {
    ...mapState({ cart: state => state.cart.goods }),
    shopCartNum() {
      var num = 0
      this.shopCart.forEach(element => {
        if (element.isChecked) num += element.num
      })
      return num
    },
  },
  async created() {
    await this.search()
    this.shopCart = JSON.parse(JSON.stringify(this.cart))
    // for (let index = 0; index < 5; index++) {
    //   this.shopCart.push({
    //     goodsId: this.products[index].skuId,
    //     num: index,
    //     isChecked: true,
    //   })
    // }
  },
  beforeDestroy() {
    this.$store.commit('cart/setCart', this.shopCart)
  },
  methods: {
    async search({ keyWords, classId, activityId, page = 1, size = 10 } = {}) {
      activityId = this.activityId
      keyWords = this.keyWords
      let res = await this.$api.item.searchSku({
        keyWords,
        classId,
        activityId,
        page,
        size,
      })
      this.products = res.data
    },
    getShopCart(id) {
      var list = this.shopCart.filter(it => it.goodsId === id)
      if (list && list[0]) return list[0]
      else return null
    },
    add2ShopCart(product, num = 1) {
      var item = this.getShopCart(product.skuId)
      if (item) {
        item.num += num
        item.isChecked = true
      } else
        this.shopCart.push({
          goodsId: product.skuId,
          num: num,
          isChecked: true,
          product: product,
        })
    },
    menuChanged(i) {
      this.selectedIndex = i
    },
  },
}
</script>

<template>
  <Layout>
    <VToolbar
      dark
      :color="$style['color-brand-light']"
    >
      <VTextField
        v-model="keyWords"
        prepend-inner-icon="search"
        single-line
        placeholder="搜索商品名称，条码"
        @keydown.enter="search()"
      />
      <VBtn
        flat
        icon
        @click="search()"
      >
        <VIcon>camera</VIcon>
      </VBtn>
    </VToolbar>


    <VLayout
      row
      wrap
      :class="$style.nobar"
    >
      <VFlex
        xs3
        :class="$style.fullheight"
      >
        <dl
          ref="menu"
          :class="$style.menu"
        >
          <dt
            v-for="i in 15"
            :key="i"
            :class="i==selectedIndex?$style.selected:''"
            @click="menuChanged(i)"
          >
            清洁用品{{ i }}
          </dt>
        </dl>
      </VFlex>
      <VFlex
        xs9
        :class="$style.fullheight"
      >
        <ProductItem
          v-for="item in products"
          :key="item.skuId"
          :title="item.itemName"
          :price="item.itemPrice"
          :cover="item.itemCover"
        >
          <NumericUpDown
            v-if="getShopCart(item.skuId) && getShopCart(item.skuId).isChecked && getShopCart(item.skuId).num"
            v-model="getShopCart(item.skuId).num"
            :min="0"
          />
          <VBtn
            v-else
            flat
            icon
            dark
            color="orange"
          >
            <VIcon
              dark
              @click="add2ShopCart(item)"
            >
              add
            </VIcon>
          </VBtn>
          <!-- {{ shopCartNumber(item.id) }} -->
        </ProductItem>
      </VFlex>
    </VLayout>


    <VLayout
      row
      wrap
      :class="$style.btnnav"
    >
      <VFlex xs4>
        <VBtn large>
          <VBadge
            color="red"
            right
          >
            <span
              slot="badge"
            />
            <span v-if="shopCartNum">
              挂单
            </span>
            <span v-else>
              取单
            </span>
          </VBadge>
        </VBtn>
      </VFlex>
      <VFlex xs4>
        <VBtn
          to="/work/prepay"
          large
        >
          <VBadge
            color="red"
            right
          >
            <span
              slot="badge"
            />
            结算
          </VBadge>
        </VBtn>
      </VFlex>
      <VFlex xs4>
        <VBtn
          to="/work/shopcart"
          large
        >
          <VBadge
            color="red"
            right
          >
            <span slot="badge">
              {{ shopCartNum }}
            </span>
            购物车
          </VBadge>
        </VBtn>
      </VFlex>
    </VLayout>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

:export {
  // stylelint-disable-next-line property-no-unknown
  color-brand-light: $color-brand-light;
}
.title {
  text-align: center;
}
.nobar {
  height: calc(100% - 112px);
  overflow: hidden;
}
.fullheight {
  height: 100%;
  overflow: auto;
}
.menu {
  text-align: center;
  dt {
    height: 45px;
    font-size: 13px;
    font-weight: 400;
    line-height: 45px;
    color: rgba(66, 66, 66, 1);
  }
  dt.selected {
    font-weight: 500;
    color: rgba(230, 162, 60, 1);
    background: rgba(240, 240, 240, 1);
  }

  .btnnav {
    position: fixed;
    .btn {
      overflow: hidden;
    }

    // stylelint-disable-next-line selector-class-pattern
    .v-badge__badge {
      width: 2px !important;
      height: 2px !important;
    }
  }
}
</style>
