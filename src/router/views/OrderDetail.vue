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
    priceDetail() {
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
          value: this.orderDetail.usePoint,
          sign: '',
        },
        {
          labelName: '使用的余额',
          value: this.orderDetail.useBalance,
          sign: '',
        },
      ]
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
      await this.$api.order.cancelOrder(this.orderID)
    },
  },
}
</script>

<template>
  <Layout>
    <VSubheader>
      <VLayout
        justify-space-between
        align-center
      >
        <VFlex xs10>
          <VChip
            label
            small
            color="#409EFF"
            text-color="white"
          >
            {{ orderDetail.payType }}
          </VChip>
          {{ orderDetail.orderNo }}
        </VFlex>
        <VFlex xs2>
          {{ orderDetail.orderStatus }}
        </VFlex>
      </VLayout>
    </VSubheader>
    <ul :class="$style.infoList">
      <li>
        <label :class="$style.listLabel">
          订单类型：
        </label>{{ orderDetail.orderType }}
      </li>
      <li>
        <label :class="$style.listLabel">
          订单名称：
        </label>{{ orderDetail.productName }}
      </li>
      <li>
        <label :class="$style.listLabel">
          订单时间：
        </label>{{ orderDetail.createTime }}
      </li>
      <li>
        <label :class="$style.listLabel">
          收件人姓名：
        </label>{{ orderDetail.receiverName }}
      </li>
      <li>
        <label :class="$style.listLabel">
          收件人电话：
        </label>{{ orderDetail.receiverPhone }}
      </li>
      <li>
        <label :class="$style.listLabel">
          收件人地址：
        </label>{{ orderDetail.receiverAddress }}
      </li>
    </ul>
    <VList two-line>
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
    </VList>
    <VList two-line>
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
    <ul :class="$style.priceList">
      <template v-for="priceItem of priceDetail">
        <li
          v-if="priceItem.value"
          :key="priceItem.labelName"
          :class="$style.priceItem"
        >
          <label :class="$style.listLabel">
            {{ priceItem.labelName }}：
          </label><span>{{ priceItem.sign }} ¥{{ priceItem.value }}</span>
        </li>
      </template>
      <li :class="$style.priceItem">
        <label :class="[$style.listLabel,$style.priceLabel]">
          实际收款
        </label><span :class="$style.price">
          ¥ {{ orderDetail.totalAmount }}
        </span>
      </li>
    </ul>
    <VLayout>
      <VSpacer />
      <VFlex
        xs4
      >
        <VBtn
          :to="'/'"
          replace
        >
          回首页
        </VBtn>
      </VFlex>
      <template v-if="orderDetail.orderStatus !=='订单关闭'">
        <VFlex
          v-if="orderDetail.orderStatus ==='待支付'"
          xs4
        >
          <VBtn @click="cancelOrder">
            取消订单
          </VBtn>
        </VFlex>
        <VFlex
          v-if="orderDetail.orderStatus ==='待支付'"
          xs4
        >
          <VBtn :to="'/order/checkout/'+orderID">
            去支付
          </VBtn>
        </VFlex>
        <VFlex
          v-if="orderDetail.orderStatus ==='待收货' && orderDetail.orderType=='普通订单'"
          xs4
        >
          <VBtn
            :to="'/order/returnCreate/'+orderID"
          >
            申请退单
          </VBtn>
        </VFlex>
      </template>
    </VLayout>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.infoList,
.priceItem {
  line-height: 2;
  list-style-type: none;
}
.listLabel {
  color: #969696;
}
.priceItem {
  display: flex;
  justify-content: space-between;
  padding-right: 18px;
}
.priceLabel {
  font-size: 16px;
  font-weight: bold;
  color: #212121;
}
.price {
  font-size: 16px;
  font-weight: bold;
  color: $color-brand;
}
</style>
