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
      bargainDialog: false,
      orderAmount: 0,
      postAmount: 0,
      lowestAmount: 0,
    }
  },
  computed: {
    sumAmount() {
      return (this.orderAmount - 0 + this.postAmount).toFixed(2)
    },
    serverOrderAmount() {
      return (this.orderInfo.totalAmount - this.orderInfo.postAmount).toFixed(2)
    },
  },
  async created() {
    this.orderInfo = (await this.$api.order.getOrderDetail(this.orderID)).data
    this.lowestAmount = this.orderInfo.lowestAmount || 1000
    this.orderAmount = this.serverOrderAmount
    this.postAmount = this.orderInfo.postAmount
  },
  methods: {
    async pay(type) {
      if (type > 1) {
        const toast = this.$snotify.confirm(this.body, '确认您已收到钱款', {
          buttons: [
            {
              text: '收到了',
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
            { text: '没收到', action: () => this.$snotify.remove(toast.id) },
          ],
        })
      } else if (type === 1) {
        // eslint-disable-next-line
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有 '',
          success: async msg => {
            // 当needResult 为 1 时，扫码返回的结果
            var code =
              msg.resultStr.indexOf(',') === -1
                ? msg.resultStr
                : msg.resultStr.split(',')[1]

            try {
              var res = await this.$api.order.payOrderbyCode({
                orderID: this.orderID,
                authCode: code,
                orderNo: this.orderInfo.orderNo,
              })
              if (res.data === 'ok') {
                this.success()
              } else if (res.data === '等待') {
                this.$snotify.warning('等待用户操作，请确认用户付款', res.data)
                // websocket
              } else {
                this.$snotify.warning(res.data, '支付遇到一些问题')
              }
            } catch (error) {
              this.$snotify.warning(error.data.msg, '支付遇到一些问题')
            }
          },
        })
      }
    },
    success() {
      this.$snotify.success(this.body, '支付完成')
      this.$router.replace('/order/detail/' + this.orderID)
    },
    async change() {
      try {
        await this.$api.order.changeOrder({
          orderID: this.orderID,
          newPrice: this.orderAmount,
          newPost: this.postAmount,
        })
        this.$snotify.success('', '改价完成')
      } catch (error) {
        this.$snotify.warning(error.msg, '改价失败')
      }
      this.bargainDialog = false
    },
  },
}
</script>

<template>
  <Layout>
    <VToolbar dense>
      <VToolbarTitle v-if="orderInfo.orderType == '普通订单'">
        <VBtn
          color="primary"
          @click="bargainDialog = true"
        >
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


    <VDialog
      v-model="bargainDialog"
      persistent
      max-width="600px"
    >
      <VCard>
        <VCardTitle>
          <span class="headline">
            改价
          </span>
        </VCardTitle>
        <VCardText>
          <VLayout
            row
            wrap
          >
            <VFlex xs6>
              <VTextField
                v-model="orderAmount"
                label="商品金额"
                :rules="[() => (orderAmount >= lowestAmount && orderAmount <= serverOrderAmount)|| `改价范围${lowestAmount} - ${ serverOrderAmount }`]"
                required
              />
            </VFlex>
            <VFlex xs1>
              <span />
            </VFlex>
            <VFlex xs5>
              <VTextField
                v-model="postAmount"
                label="运费金额"
                :rules="[() => (postAmount >= 0 && postAmount <= orderInfo.postAmount)|| `改价范围${0} - ${orderInfo.postAmount }`]"
                required
              />
            </VFlex>
          </VLayout>
          <div>原价{{ orderInfo.totalAmount }}</div>
          <div>预计改到{{ sumAmount }}</div>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            flat
            @click="bargainDialog = false"
          >
            关闭
          </VBtn>
          <VBtn
            color="primary"
            @click="change"
          >
            确定
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

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
