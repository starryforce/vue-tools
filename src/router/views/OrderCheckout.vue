<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: '收款',
    meta: [{ name: 'description', content: '收款' }],
  },
  name: 'OrderCheckout',
  components: { Layout },
  props: {
    orderID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      code: '12',
      paymentList: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: '扫码支付',
          id: 1,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: '现金支付',
          id: 2,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'POS机刷卡',
          id: 3,
        },
      ],
      orderInfo: {},
    }
  },
  async created() {
    this.orderInfo = (await this.$api.order.getOrderDetail(this.orderID)).data
  },
  methods: {
    async pay(type) {
      if (type > 1) {
        const toast = this.$snotify.confirm(this.body, '确认您已收到钱款', {
          buttons: [
            {
              text: '确认',
              action: async () => {
                try {
                  var res = await this.$api.order.payOrder({
                    orderID: this.orderID,
                    payType: type,
                  })
                  if (res.data) {
                    this.success()
                  } else {
                    this.$snotify.warning(res.data, '支付遇到一些问题')
                  }
                } catch (error) {
                  this.$snotify.warning(error.data.msg, '支付遇到一些问题')
                }

                this.$snotify.remove(toast.id)
              },
              bold: false,
            },
            { text: '我再想想', action: () => this.$snotify.remove(toast.id) },
          ],
        })
      } else if (type === 1) {
        try {
          var res = await this.$api.order.payOrderbyCode({
            orderID: this.orderID,
            authCode: this.code,
            orderNo: this.orderInfo.orderNo,
          })
          if (res.data) {
            this.success()
          } else {
            this.$snotify.warning(res.data, '支付遇到一些问题')
          }
        } catch (error) {
          this.$snotify.warning(error.data.msg, '支付遇到一些问题')
        }
      }
    },
    success() {
      this.$snotify.success(this.body, '支付完成')
      this.$router.replace('/order/detail/' + this.orderID)
    },
  },
}
</script>

<template>
  <Layout>
    <VToolbar dense>
      <VToolbarTitle>
        <VBtn color="primary">
          改价
        </VBtn>
      </VToolbarTitle>
      <VSpacer />
      <VToolbarItems>
        <VBtn flat>
          订单金额：{{ orderInfo.totalAmount }}元
        </VBtn>
      </VToolbarItems>
    </VToolbar>
    <br><br><br>
    <input
      v-model="code"
      type="text"
      style="margin:5px;border:2px solid;width:90%"
    >
    <VList>
      <template v-for="(payment, index) in paymentList">
        <VDivider
          v-if="index"
          :key="index"
        />
        <VListTile
          :key="payment.title"
          avatar
          @click="pay(payment.id)"
        >
          <VListTileAvatar tile>
            <img :src="payment.avatar">
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>
              {{ payment.title }}
            </VListTileTitle>
          </VListTileContent>
        </VListTile>
      </template>
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
</style>
