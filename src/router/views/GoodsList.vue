<script>
import Layout from '@layouts/main'
import ProductItem from '@components/ProductItem'
import NumericUpDown from '@components/NumericUpDown'

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
  },
  data() {
    return {
      selectedIndex: 1,
      shopCart: [],
      products: [],
    }
  },
  computed: {
    shopCartNum() {
      var num = 0
      this.shopCart.forEach(element => {
        if (element.isChecked) num += element.num
      })
      return num
    },
  },
  created() {
    for (let index = 0; index < 10; index++) {
      this.products.push({
        id: index,
        title: '美国Jason天然薰衣草健康薰衣草健康呵护洗手液473ml 6个月',
        price: index * 10,
        cover: '/*/*',
      })
    }
    for (let index = 0; index < 5; index++) {
      this.shopCart.push({ productId: index * 2, num: index, isChecked: true })
    }
  },
  methods: {
    getShopCart(id) {
      var list = this.shopCart.filter(it => it.productId === id)
      if (list && list[0]) return list[0]
      else return null
    },
    add2ShopCart(product, num = 1) {
      var item = this.getShopCart(product.id)
      if (item) {
        item.num += num
        item.isChecked = true
      } else
        this.shopCart.push({ productId: product.id, num: num, isChecked: true })
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
        prepend-inner-icon="search"
        single-line
        placeholder="搜索商品名称，条码"
      />
      <VBtn
        flat
        icon
        @click="showPanel = showPanel === 0 ? null : 0"
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
          :key="item.id"
          :title="item.title"
          :price="item.price"
          :cover="item.cover"
        >
          <NumericUpDown
            v-if="getShopCart(item.id) && getShopCart(item.id).isChecked && getShopCart(item.id).num"
            v-model="getShopCart(item.id).num"
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
