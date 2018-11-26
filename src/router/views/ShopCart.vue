<script>
import Layout from '@layouts/main'
import ProductItem from '@components/ProductItem'
import NumericUpDown from '@components/NumericUpDown'
import { mapState } from 'vuex'

export default {
  name: 'ShopCart',
  page: {
    title: '购物车',
    meta: [{ name: 'description', content: '购物车' }],
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
      dialog: false,
      shopCart: [],
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart.goods,
      stack: state => state.cart.stack,
    }),
  },
  mounted() {
    this.shopCart = JSON.parse(JSON.stringify(this.cart))
    setTimeout(() => {
      document.getElementById('add').scrollIntoView(true)
    }, 200)
  },
  beforeDestroy() {
    this.$store.commit('cart/setCart', this.shopCart)
  },
  methods: {
    remove(item) {
      this.shopCart.splice(this.shopCart.indexOf(item), 1)
      this.dialog = false
    },
    push() {
      // this.stack.push(this.shopCart)
      this.shopCart = Object.assign({}, {})
    },
  },
}
</script>

<template>
  <Layout>
    <div :class="$style.title">
      选择会员，默认散客
    </div>
    <div :class="$style.main">
      <ProductItem
        v-for="item in shopCart"
        :key="item.goodsId"
        :title="item.product.itemName"
        :price="item.product.itemPrice"
        :cover="item.product.itemCover"
      >
        <div :class="$style.slot">
          <VDialog
            v-model="dialog"
            max-width="290"
          >
            <div
              slot="activator"
              :class="$style.xssmall"
            >
              删除
            </div>

            <VCard>
              <VCardTitle class="headline">
                确认删除
              </VCardTitle>

              <VCardActions>
                <VSpacer />

                <VBtn
                  color="green darken-1"
                  flat="flat"
                  @click="dialog = false"
                >
                  我是误触
                </VBtn>

                <VBtn
                  color="green darken-1"
                  flat="flat"
                  @click="remove(item)"
                >
                  确认
                </VBtn>
              </VCardActions>
            </VCard>
          </VDialog>

          <NumericUpDown
            v-model="item.num"
            :class="$style.xsbig"
          />
        </div>
      </ProductItem>

      <VLayout
        id="add"
        row
        wrap
      >
        <VFlex xs6>
          <VBtn
            large
            to="/work/goods"
          >
            手动选择
          </VBtn>
        </VFlex>
        <VFlex xs6>
          <VBtn large>
            扫码添加
          </VBtn>
        </VFlex>
      </VLayout>
      <br>
    </div>

    <VLayout
      row
      wrap
      :class="$style.btnnav"
    >
      <VFlex xs6>
        合计：262625
      </VFlex>
      <VFlex xs3>
        <VBtn
          large
          @click="push"
        >
          挂单
        </VBtn>
      </VFlex>
      <VFlex xs3>
        <VBtn
          to="/work/prepay"
          large
        >
          结算
        </VBtn>
      </VFlex>
    </VLayout>
  </Layout>
</template>

<style lang="scss" module>
.title {
  position: absolute;
  width: 100%;
  height: 28px;
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
  color: rgba(89, 89, 89, 1);
  // border-bottom: 1px solid rgba(189, 189, 189, 1);
  box-shadow: 0 2px 3px rgba(189, 189, 189, 1);
}
.main {
  height: calc(100% - 84px);
  margin-top: 28px;
  overflow: auto;

  .slot {
    display: flex;
    width: 100%;
    height: 24px;
    overflow: hidden;
    line-height: 24px;
    .xsbig {
      width: 75%;
    }
    .xssmall {
      width: 20%;
      margin-right: 5%;
    }
  }
}
.btnnav {
  position: fixed;
  width: 100%;
  height: 56px;
  border-top: solid rgba(191, 191, 191, 1) 1px;
}
</style>
