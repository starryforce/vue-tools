<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/MainLayout'
import ItemCard from './ItemCenter/components/ReturnItemCard'
import ImageUpload from '@components/ImageUpload'

export default {
  metaInfo: {
    title: '创建退货',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, ItemCard, ImageUpload },
  props: {
    orderID: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      orderDetail: {},
      e1: 1,
      count: 1,
      returnReason: '',
    }
  },
  computed: {
    basketList() {
      return this.$store.state.itemStorage.baskets
    },
  },
  async created() {
    this.orderDetail = (await this.$api.order.getOrderDetail(this.orderID)).data
  },
  methods: {
    change(file) {
      // debugger
      this.count++
    },
    async submit() {
      if (this.e1 === 1) this.e1++
      else {
        try {
          var res = (await this.$api.order.CreateReturnOrder({
            orderID: this.orderID,
            items: this.orderDetail.skuList,
            returnReason: this.returnReason,
          })).data
          if (res.data) {
            this.$router.push('/order/return/detail')
          } else {
            this.$snotify.warning(res.data, '退货遇到一些问题')
          }
        } catch (error) {
          this.$snotify.warning(error.data.msg, '退货遇到一些问题')
        }
      }
    },
  },
}
</script>

<template>
  <Layout>
    <VStepper
      v-model="e1"
      style="height:100%"
    >
      <VStepperHeader>
        <VStepperStep
          :complete="e1 > 1"
          step="1"
        >
          选择商品
        </VStepperStep>

        <VDivider />

        <VStepperStep
          :complete="e1 > 2"
          step="2"
        >
          填写详情
        </VStepperStep>
      </VStepperHeader>

      <VStepperItems>
        <VStepperContent step="1">
          <p>请选择要退货的商品:</p>
          <VList three-line>
            <ItemCard
              v-for="item in orderDetail.skuList"
              :key="item.id"
              :item="item"
            />
          </VList>
        </VStepperContent>

        <VStepperContent step="2">
          <VTextarea
            name="input-7-1"
            label="请输入退货原因："
            :value="returnReason"
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
        </VStepperContent>
      </VStepperItems>
    </VStepper>
    <div :class="$style.bottom">
      <VBtn
        v-if="e1==2"
        @click="e1--"
      >
        上一步
      </VBtn>
      <VBtn
        color="info"
        @click="submit"
      >
        确认
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
  width: 80%;
  text-align: right;
}
</style>
