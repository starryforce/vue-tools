<script>
import Layout from '@layouts/main'
import ProductItem from '@components/ProductItem'
import NumericUpDown from '@components/NumericUpDown'

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
  beforeRouteEnter(to, from, next) {
    next(vm => {
      setTimeout(() => {
        document.getElementById('add').scrollIntoView(true)
      }, 200)
    })
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
        v-for="i in 8"
        :key="i"
      >
        <div :class="$style.slot">
          <div
            :class="$style.xssmall"
            @click="remove"
          >
            删除
          </div>
          <NumericUpDown :class="$style.xsbig" />
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
        <VBtn large>
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
