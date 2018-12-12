<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/MainLayout'
import ImageUpload from '@components/ImageUpload'

export default {
  metaInfo: {
    title: '创建退货',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, ImageUpload },
  props: {
    orderID: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      orderDetail: {},
      count: 1,
    }
  },
  computed: {
    basketList() {
      return this.$store.state.itemStorage.baskets
    },
  },
  methods: {
    change(file) {
      // debugger
      this.count++
    },
  },
}
</script>

<template>
  <Layout>
    <VTextarea
      name="input-7-1"
      label="请输入退货原因："
      value=""
      hint="请确保不影响二次销售且不是跨境购商品"
    />
    <form>
      <VLayout
        row
        wrap
      >
        <VFlex
          v-for="n in count"
          :key="n"
          xs4
          d-flex
        >
          <ImageUpload @change="change" />
        </VFlex>
      </VLayout>
    </form>


    <div :class="$style.bottom">
      <VBtn
        color="info"
        to="/order/return/detail"
      >
        确认退货
      </VBtn>
    </div>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.bottom {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  text-align: right;
}
</style>
