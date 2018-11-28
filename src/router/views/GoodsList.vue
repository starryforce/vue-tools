<script>
/* eslint-disable */
import Layout from '@layouts/main'
import ProductItem from '@components/ProductItem'
import InfiniteLoading from 'vue-infinite-loading'
import NumericUpDown from '@components/NumericUpDown'
import { mapState } from 'vuex'

export default {
  name: 'GoodsList',
  page: {
    title: '商品列表',
    meta: [{ name: 'description', content: '商品列表' }],
  },
  components: { Layout, ProductItem, NumericUpDown, InfiniteLoading },
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
      selectedIndex: 500,
      shopCart: [],
      products: [],
      menu: [],
      keyWords: null,
      classId: '',
      page: 1,
      pageSize: 20,
      hasNext: true,
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
    const cls = this.$api.item.getItemClassList()
    this.shopCart = JSON.parse(JSON.stringify(this.cart))
    this.menu = (await cls).data.filter(item => parseInt(item.parentCode) < 3)
  },
  beforeDestroy() {
    this.$store.commit('cart/setCart', this.shopCart)
  },
  methods: {
    async reset() {
      this.page = 1
      this.classId = null
      var res = await this.search()
      this.products = Object.assign({}, res)
    },
    async search() {
      return (await this.$api.item.searchSku({
        keyWords: this.keyWords,
        classId: this.classId,
        activityId: this.activityId,
        page: this.page,
        size: this.pageSize,
      })).data
    },
    async infiniteHandler($state) {
      const newData = await this.search()
      this.hasNext = newData.data.length === this.pageSize
      if (newData.data.length) {
        this.products.push(...newData.data)
      }
      if (this.hasNext) {
        this.page += 1
        $state.loaded()
      } else {
        $state.complete()
      }
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
    async menuChanged(i) {
      this.classId = i
      this.page = 1
      var res = await this.search()
      this.products = Object.assign({}, res)
    },
  },
}
</script>

<template>
  <Layout>
    <VToolbar dark :color="$style['color-brand-light']">
      <VTextField
        v-model="keyWords"
        prepend-inner-icon="search"
        single-line
        placeholder="搜索商品名称，条码"
        @keydown.enter="reset()"
      />
      <VBtn flat icon @click="reset()">
        <VIcon>camera</VIcon>
      </VBtn>
    </VToolbar>

    <VLayout row wrap :class="$style.nobar">
      <VFlex xs3 :class="$style.fullheight">
        <dl ref="menu" :class="$style.menu">
          <dt
            v-for="item in menu"
            :key="item.classCode"
            :class="item.classCode==classId?$style.selected:''"
            @click="menuChanged(item.classCode)"
          >{{ item.className }}</dt>
        </dl>
      </VFlex>
      <VFlex xs9 :class="$style.fullheight">
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
          <VBtn v-else flat icon dark color="orange">
            <VIcon dark @click="add2ShopCart(item)">add</VIcon>
          </VBtn>
          <!-- {{ shopCartNumber(item.id) }} -->
        </ProductItem>
        <InfiniteLoading :identifier="selectedIndex" @infinite="infiniteHandler"/>
      </VFlex>
    </VLayout>

    <VLayout row wrap :class="$style.btnnav">
      <VFlex xs4>
        <VBtn large>
          <VBadge color="red" right>
            <span slot="badge"/>
            <span v-if="shopCartNum">挂单</span>
            <span v-else>取单</span>
          </VBadge>
        </VBtn>
      </VFlex>
      <VFlex xs4>
        <VBtn to="/work/prepay" large>
          <VBadge color="red" right>
            <span slot="badge"/>
            结算
          </VBadge>
        </VBtn>
      </VFlex>
      <VFlex xs4>
        <VBtn to="/work/shopcart" large>
          <VBadge color="red" right>
            <span slot="badge">{{ shopCartNum }}</span>
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
