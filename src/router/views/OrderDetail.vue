<script>
import Layout from '@layouts/MainLayout'

export default {
  metaInfo: {
    title: '订单详情',
    meta: [{ name: 'description', content: '订单详情' }],
  },
  name: 'OrderDetail',
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
  computed: {
    priceList() {
      return [
        {
          labelName: '优惠前的总金额',
          value: this.orderDetail.oldTotalAmount,
          sign: '',
        },
        {
          labelName: '邮费',
          value: this.orderDetail.postAmount,
          sign: '+',
        },
        {
          labelName: '优惠的邮费金额',
          value: this.orderDetail.couponPostAmount,
          sign: '-',
        },
        {
          labelName: 'vip优惠金额',
          value: this.orderDetail.vipAmount,
          sign: '-',
        },
        {
          labelName: '满减优惠金额',
          value: this.orderDetail.fullAmount,
          sign: '-',
        },
        {
          labelName: '限时折扣优惠的金额',
          value: this.orderDetail.limitAmount,
          sign: '-',
        },
        {
          labelName: '优惠券优惠的金额',
          value: this.orderDetail.couponAmount,
          sign: '-',
        },
        {
          labelName: '使用的积分数量',
          value: this.orderDetail.usePointAmount,
          sign: '-',
        },
        {
          labelName: '使用的余额',
          value: this.orderDetail.useBalance,
          sign: '',
        },
      ]
    },
    infoList() {
      const isCommonOrder = this.orderDetail.orderType === '普通订单'
      const list = [
        {
          labelName: '订单号',
          value: this.orderDetail.orderNo,
        },
        {
          labelName: '订单类型',
          value: this.orderDetail.orderType,
        },
        {
          labelName: '订单名称',
          value: this.orderDetail.productName,
        },
        {
          labelName: '订单时间',
          value: this.orderDetail.createTime,
        },
        {
          labelName: '收件人姓名：',
          value: this.orderDetail.receiverName,
          hide: !isCommonOrder,
        },
        {
          labelName: '收件人电话：',
          value: this.orderDetail.receiverPhone,
          hide: !isCommonOrder,
        },
        {
          labelName: '收件人地址：',
          value: this.orderDetail.receiverAddress,
          hide: !isCommonOrder,
        },
      ]
      return list.filter(item => !item.hide)
    },
  },
  created() {
    this.getOrderDetail()
  },
  methods: {
    async getOrderDetail() {
      this.orderDetail = (await this.$api.order.getOrderDetail(
        this.orderID
      )).data
    },
    async cancelOrder() {
      try {
        await this.$api.order.cancelOrder(this.orderID)
        this.$snotify.success('订单取消成功')
        this.orderDetail = Object.assign({}, this.orderDetail, {
          orderStatus: '订单关闭',
        })
      } catch (error) {
        this.$snotify.warning(error.msg)
      }
    },
  },
}
</script>

<template>
  <Layout>
    <VToolbar
      dense
      flat
    >
      <VToolbarTitle>
        <VChip
          label
          small
          color="#409EFF"
          text-color="white"
        >
          {{ orderDetail.payType }}
        </VChip>
      </VToolbarTitle>
      <VSpacer />
      <VToolbarItems>
        <VBtn flat>
          {{ orderDetail.orderStatus }}
        </VBtn>
      </VToolbarItems>
    </VToolbar>

    <!-- 订单信息列表 -->
    <VList dense>
      <template v-for="info in infoList">
        <VListTile :key="info.labelName">
          <VListTileContent>
            <VListTileTitle>{{ info.labelName }}</VListTileTitle>
          </VListTileContent>
          <VListTileAction>
            <VListTileActionText> {{ info.value }} </VListTileActionText>
          </VListTileAction>
        </VListTile>
      </template>
    </VList>

    <!-- 商品列表 -->
    <VList
      v-if="orderDetail.orderType=='普通订单'"
      two-line
    >
      <VListTile
        avatar
      >
        <VListTileAvatar>
          <VImg src="" />
        </VListTileAvatar>
        <VListTileContent>
          <VListTileTitle>{{ orderDetail.receiverName }} {{ orderDetail.receiverPhone }}</VListTileTitle>
          <VListTileSubTitle>
            {{ orderDetail.receiverAddress }}
          </VListTileSubTitle>
        </VListTileContent>
      </VListTile>
      <VListTile
        v-for="item of orderDetail.skuList"
        :key="item.id"
        avatar
      >
        <VListTileAvatar>
          <VImg :src="item.picUrl || ''" />
        </VListTileAvatar>

        <VListTileContent>
          <VListTileTitle>{{ item.skuName }}</VListTileTitle>
          <VListTileSubTitle>
            <VLayout>
              <VFlex>单价：¥ {{ item.salePrice }}</VFlex>
              <VFlex>数量：{{ item.number }}</VFlex>
            </VLayout>
          </VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </VList>

    <!-- 价格明细表 -->
    <VList dense>
      <template v-for="price in priceList">
        <VListTile :key="price.labelName">
          <VListTileContent>
            <VListTileTitle>{{ price.labelName }}</VListTileTitle>
          </VListTileContent>
          <VListTileAction>
            <VListTileActionText> {{ price.sign }} ¥{{ price.value }} </VListTileActionText>
          </VListTileAction>
        </VListTile>
      </template>
      <VDivider />
      <VListTile>
        <VListTileContent>
          <VListTileTitle>实际收款</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          <VListTileActionText> ¥ {{ orderDetail.totalAmount }} </VListTileActionText>
        </VListTileAction>
      </VListTile>
    </VList>
    <VFooter fixed>
      <VFlex
        xs4
      >
        <VBtn
          :to="'/'"
          replace
          block
        >
          回首页
        </VBtn>
      </VFlex>
      <template v-if="orderDetail.orderStatus !=='订单关闭'">
        <VFlex
          v-if="orderDetail.orderStatus ==='待支付'"
          xs3
        >
          <VBtn
            block
            @click="cancelOrder"
          >
            取消订单
          </VBtn>
        </VFlex>
        <VFlex
          v-if="orderDetail.orderStatus ==='待收货' && orderDetail.orderType=='普通订单'"
          xs3
        >
          <VBtn
            :to="'/order/returnCreate/'+orderID"
            block
          >
            申请退单
          </VBtn>
        </VFlex>
        <VFlex
          v-if="orderDetail.orderStatus ==='待支付'"
          xs5
        >
          <VBtn
            :to="'/order/checkout/'+orderID"
            block
            color="primary"
          >
            去支付
          </VBtn>
        </VFlex>
      </template>
    </VFooter>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
</style>
