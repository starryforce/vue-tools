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
      paymentList: [
        {
          icon: 'crop_free',
          title: '扫码支付',
          id: 1,
        },
        {
          icon: 'money',
          title: '现金支付',
          id: 2,
        },
        {
          icon: 'credit_card',
          title: 'POS机刷卡',
          id: 3,
        },
      ],
      bargainDialog: false,
      orderInfo: {},
      expectPrice: 0,
    }
  },
  computed: {
    minLimitPrice() {
      try {
        return this.orderInfo.skuList.reduce((prev, curr) => {
          return prev + curr.minPrice * curr.number
        }, 0)
      } catch (error) {
        return this.maxLimitPrice
      }
    },
    maxLimitPrice() {
      // 不含运费的实际价格
      return (this.orderInfo.totalAmount - this.orderInfo.postAmount).toFixed(2)
    },
  },
  async created() {
    this.getOrderDetail()
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
    async getOrderDetail() {
      this.orderInfo = (await this.$api.order.getOrderDetail(this.orderID)).data
      this.expectPrice = this.maxLimitPrice
    },
    success() {
      this.$snotify.success(this.body, '支付完成')
      this.$router.replace('/order/detail/' + this.orderID)
    },
    async changePrice() {
      try {
        await this.$api.order.changeOrder({
          orderID: this.orderID,
          newPrice: this.expectPrice,
          newPost: this.orderInfo.postAmount,
        })
        this.$snotify.success('', '改价完成')
        this.getOrderDetail()
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
        <VSubheader>改价范围{{ minLimitPrice | currency }} - {{ maxLimitPrice | currency }}</VSubheader>
        <VCardText>
          <VLayout
            row
            wrap
          >
            <VFlex xs6>
              <VTextField
                v-model.number="expectPrice"
                label="商品金额"
                :rules="[() => (expectPrice >= minLimitPrice && expectPrice <= maxLimitPrice)|| `改价范围${minLimitPrice} - ${ maxLimitPrice }`]"
                required
              />
            </VFlex>
            <VFlex xs1>
              <span />
            </VFlex>
            <VFlex xs5>
              <VTextField
                :value="orderInfo.postAmount"
                disabled
                label="运费金额"
              />
            </VFlex>
          </VLayout>
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
            @click="changePrice"
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
            <VIcon>{{ payment.icon }}</VIcon>
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
