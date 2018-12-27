<script>
import Layout from '@layouts/MainLayout'

export default {
  metaInfo: {
    title: '自提单详情',
    meta: [{ name: 'description', content: '自提单详情' }],
  },
  name: 'OrderPickUpDetail',
  components: { Layout },
  props: {
    orderID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      orderDetail: {},
    }
  },
  created() {
    this.getOrderDetail()
  },
  methods: {
    async getOrderDetail() {
      try {
        this.orderDetail = (await this.$api.order.getOrderList({
          OrderNo: this.orderID,
          orderStatus: 1, // 1 : 待发货
          postType: 0, // 0: 自提
        })).data.orders[0]
      } catch (error) {
        this.$snotify.warning('获取订单详情失败', '错误')
      }
    },
    confirmPick() {
      // eslint-disable-next-line
      wx.scanQRCode({
        // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
        needResult: 1,
        desc: '验证自提码',
        success: async res => {
          const result = res.resultStr
          if (result === this.orderID) {
            await this.$api.order.confirmPickUp(result)
            this.$snotify.success('提货码验证成功')
            this.$router.back()
          } else {
            this.$snotify.warning('自提码与订单不符')
          }
        },
      })
    },
  },
}
</script>

<template>
  <Layout>
    <VList :class="$style.form">
      <VListTile>
        <VListTileSubTitle>订单号:</VListTileSubTitle>
        <VListTileTitle>{{ orderDetail.orderNo }}</VListTileTitle>
      </VListTile>
      <VListTile>
        <VListTileSubTitle>会员名：</VListTileSubTitle>
        <VListTileTitle>{{ orderDetail.buyerNick }}</VListTileTitle>
      </VListTile>
      <VListTile>
        <VListTileSubTitle>下单时间：</VListTileSubTitle>
        <VListTileTitle>{{ orderDetail.createTime }}</VListTileTitle>
      </VListTile>
    </VList>
    <VList two-line>
      <template v-for="(item, index) in orderDetail.detailList">
        <VDivider
          v-if="index"
          :key="index"
        />

        <VListTile
          :key="item.skuName"
          avatar
        >
          <VListTileAvatar>
            <img :src="item.picUrl || ''">
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>{{ item.skuName }}</VListTileTitle>
            <VListTileSubTitle>数量：{{ item.number }}</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </template>
    </VList>

    <VLayout :class="$style.button">
      <VBtn
        color="primary"
        dark
        large
        block
        @click="confirmPick"
      >
        <VIcon
          left
          dark
        >
          cloud_upload
        </VIcon>
        扫码自提
      </VBtn>
    </VLayout>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.form {
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile) {
    height: 32px;
  }
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile__sub-title) {
    width: 100px;
  }
}
.button {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
