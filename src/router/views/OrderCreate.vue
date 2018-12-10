<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: '创建订单',
    meta: [{ name: 'description', content: '创建订单' }],
  },
  name: 'OrderCreate',
  components: { Layout },
  data() {
    return {
      isSelfPick: false,
      usePoint: false,
      preOrderInfo: { usableCoupons: [] },
      pointAmount: 0,
      pointSheet: false,
      couponSheet: false,
      bargainDialog: false,
      selectedCouponList: [],
      remark: '',
    }
  },
  computed: {
    currentMember() {
      return this.$store.state.itemStorage.selectedMember
    },
    items() {
      return this.$store.state.itemStorage.cart
    },
    priceDetail() {
      return [
        { labelName: '商品原价合计：', value: 0 },
        {
          labelName: '优惠活动：',
          value: -(
            this.preOrderInfo.freeLimitAmount + this.preOrderInfo.freeFullAmount
          ),
        },
        { labelName: 'VIP优惠：', value: -this.preOrderInfo.freeVipAmount },
        { labelName: '改价优惠：', value: -0 },
        { labelName: '优惠券：', value: -this.preOrderInfo.freeCouponAmount },
        { labelName: '积分抵扣：', value: -this.preOrderInfo.usePointMoney },
        { labelName: '运费：', value: +this.preOrderInfo.totalPostAmount },
      ]
    },
    selectedAddress() {
      return this.$store.state.itemStorage.selectedAddress
    },
    couponAmountOptions() {
      const maxAmount = this.preOrderInfo.canUsePoint
      const list = Math.floor(maxAmount / 1000)
      return [...Array(list)].map((item, index) => (index + 1) * 1000)
    },
  },
  watch: {
    selectedCouponList() {
      this.preCreateOrder()
    },
    currentMember() {
      this.selectedCouponList = []
      this.preCreateOrder()
    },
    selectedAddress() {
      this.preCreateOrder()
    },
  },
  created() {
    this.preCreateOrder()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'item-center') {
        vm.selectedCouponList = []
        vm.$store.dispatch('itemStorage/clearAddress')
      }
    })
  },
  methods: {
    async preCreateOrder() {
      try {
        this.preOrderInfo = (await this.$api.order.preCreate({
          CustomerId: this.currentMember.id,
          AddressId: this.isSelfPick ? '' : this.selectedAddress.id,
          IsPostBySelf: this.isSelfPick,
          UsePoint: this.usePoint ? this.pointAmount : 0,
          CouponIds: this.selectedCouponList,
          SkuBuycount: this.items.map(item => ({
            SkuId: item.skuId,
            BuyCount: item.quantity,
          })),
        })).data
      } catch (error) {
        this.$q.notify({
          message: error.message,
          type: 'negative',
          position: 'top',
        })
      }
    },
    async createOrder() {
      try {
        const orderID = (await this.$api.order.createOrder({
          addressID: this.isSelfPick ? '' : this.selectedAddress.id,
          usePoint: this.usePoint ? this.pointAmount : 0,
          customerID: this.currentMember.id,
          isPostBySelf: this.isSelfPick,
          skuBuycount: this.items.map(item => ({
            SkuId: item.skuId,
            BuyCount: item.quantity,
          })),
          buyerMsg: this.remark,
          couponIDs: this.selectedCouponList,
          totalAmount: this.preOrderInfo.totalAmount,
        })).data
        this.$router.push({ name: 'order-checkout', params: { orderID } })
      } catch (error) {
        this.$q.notify({
          message: error.message,
          type: 'negative',
          position: 'center',
        })
      }
    },
    selectPointAmount(value) {
      this.preCreateOrder()
      this.pointAmount = value
      this.pointSheet = false
    },
  },
}
</script>

<template>
  <Layout :class="$style.container">
    <VToolbar @click="$router.push({name:'home-member',params:{scene:'cart'}})">
      <VIcon>person</VIcon>:{{ currentMember.customerName }}
      <VSpacer />
      <VIcon>phone_iphone</VIcon>:{{ currentMember.mobile }}
    </VToolbar>
    <div :class="$style.section">
      <VRadioGroup
        v-model="isSelfPick"
        row
        :class="$style.deliveryType"
        @change="preCreateOrder"
      >
        <VRadio
          label="自提"
          :value="true"
          color="primary"
        />
        <VRadio
          :label="'快递'||'跨境购'"
          :value="false"
          color="primary"
        />
      </VRadioGroup>
    </div>

    <VListTile
      v-if="isSelfPick"
      :class="$style.address"
    >
      本门店自提
    </VListTile>
    <VList
      v-else
      three-line
      :class="$style.address"
    >
      <VListTile :to="{name:'address-manage',params:{memberID:currentMember && currentMember.id,scene:'order'}}">
        <VListTileContent v-if="selectedAddress.id">
          <VListTileTitle>
            <VLayout>
              <VFlex xs4>
                {{ selectedAddress.name }}
              </VFlex>
              <VFlex xs8>
                {{ selectedAddress.phone }}
              </VFlex>
            </VLayout>
          </VListTileTitle>
          <VListTileSubTitle>{{ selectedAddress.provName }}{{ selectedAddress.cityName }}{{ selectedAddress.distName }}{{ selectedAddress.detail }}</VListTileSubTitle>
        </VListTileContent>
        <VListTileContent v-else>
          请选择收货人
        </VListTileContent>
        <VListTileAction>
          <VIcon>
            chevron_right
          </VIcon>
        </VListTileAction>
      </VListTile>
    </VList>
    <div :class="$style.section">
      <VBottomSheet
        v-model="couponSheet"
        full-width
      >
        <VLayout
          slot="activator"
          :class="$style.option"
          align-center
        >
          <VFlex>优惠券</VFlex>
          <VSpacer />
          <VFlex
            xs2
            :class="$style.brandColor"
          >
            {{ preOrderInfo.usableCoupons.length }}张可用
          </VFlex>
          <VFlex xs1>
            <VIcon>chevron_right</VIcon>
          </VFlex>
        </VLayout>
        <VItemGroup
          v-model="selectedCouponList"
          multiple
        >
          <VList
            three-line
            :class="$style.bottomSheet"
          >
            <VSubheader>
              <VLayout align-center>
                <VFlex>优惠券</VFlex>
                <VSpacer />
                <VFlex :class="$style.rightElement">
                  <VBtn
                    flat
                    small
                    icon
                    @click="couponSheet = false"
                  >
                    <VIcon>close</VIcon>
                  </VBtn>
                </VFlex>
              </VLayout>
            </VSubheader>
            <VItem
              v-for="coupon in preOrderInfo.usableCoupons"
              :key="coupon.couponDetailId"
              :value="coupon.couponDetailId"
            >
              <VListTile
                slot-scope="{ active, toggle }"
                :selected="active"
                @click="toggle"
              >
                <VListTileAvatar>
                  <VAvatar tile>
                    {{ coupon.title }}
                  </VAvatar>
                </VListTileAvatar>
                <VListTileContent>
                  <VListTileTitle>{{ coupon.title }}</VListTileTitle>
                  <VListTileSubTitle>{{ coupon.beginTime.split(" ")[0] }} 至 {{ coupon.endTime.split(" ")[0] }}</VListTileSubTitle>
                </VListTileContent>
                <VListTileAction>
                  <VIcon
                    v-if="selectedCouponList.indexOf(coupon.couponDetailId) < 0"
                    color="grey lighten-1"
                  >
                    radio_button_unchecked
                  </VIcon>

                  <VIcon
                    v-else
                    color="primary"
                  >
                    check_circle
                  </VIcon>
                </VListTileAction>
              </VListTile>
            </VItem>
          </VList>
        </VItemGroup>
      </VBottomSheet>
      <VDivider />
      <VLayout
        :class="$style.option"
        align-center
      >
        <VFlex>
          积分
          <span :class="$style.brandColor">
            可用{{ preOrderInfo.canUsePoint }}积分，抵{{ preOrderInfo.canUsePointMoney }}元
          </span>
        </VFlex>
        <VFlex :class="$style.rightElement">
          <VSwitch
            v-model="usePoint"
            color="primary"
            :disabled="!preOrderInfo.canUsePoint"
          />
        </VFlex>
      </VLayout>
      <VLayout
        v-if="usePoint"
        :class="$style.option"
        align-center
      >
        使用
        <VBottomSheet
          v-model="pointSheet"
        >
          <VBtn
            slot="activator"
            color="primary"
            dark
            small
          >
            {{ pointAmount }}
          </VBtn>

          <VList :class="$style.bottomSheet">
            <VSubheader>选择需要使用的积分数量</VSubheader>
            <VListTile
              v-for="(option,index) in couponAmountOptions"
              :key="index"
              @click="selectPointAmount(option)"
            >
              <VListTileTitle>{{ option }}</VListTileTitle>
            </VListTile>
          </VList>
        </VBottomSheet>
        积分，抵￥{{ pointAmount*(preOrderInfo.canUsePointMoney/preOrderInfo.canUsePoint) }}
      </VLayout>
    </div>

    <VList
      :class="$style.items"
      three-line
    >
      <VSubheader>
        共<span :class="$style.brandColor">
          {{ preOrderInfo.skuSum }}
        </span>件商品
      </VSubheader>
      <template v-for="(item, index) in items">
        <VDivider
          :key="index"
          :inset="item.inset"
        />

        <VListTile
          :key="item.title"
          avatar
        >
          <VListTileAvatar tile>
            <img :src="item.itemCover">
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>
              <VLayout>
                <VFlex>{{ item.itemCode }}</VFlex>
                <VFlex :class="$style.rightElement">
                  {{ item.quantity }}件
                </VFlex>
              </VLayout>
            </VListTileTitle>
            <VListTileTitle>{{ item.itemName }}</VListTileTitle>
            <VListTileSubTitle>
              <VLayout
                justify-space-between
                shrink
              >
                <VFlex>{{ item.itemCode }}</VFlex>
                <VFlex :class="$style.rightElement">
                  ￥{{ item.itemPrice }}
                </VFlex>
              </VLayout>
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </template>
    </VList>
    <div :class="$style.section">
      <VTextField
        v-model="remark"
        label="备注"
        required
      />
    </div>
    <div :class="$style.section">
      <VLayout
        v-for="item of priceDetail"
        :key="item.labelName"
        :class="$style.priceList"
        align-center
      >
        <VFlex>
          {{ item.labelName }}
        </VFlex>
        <VFlex :class="$style.rightElement">
          {{ item.value }}
        </VFlex>
      </VLayout>
    </div>
    <VToolbar
      :class="$style.toobar"
      dense
    >
      <div :class="$style.priceContainer">
        总计： <span :class="$style.price">
          ￥{{ preOrderInfo.totalAmount }}
        </span>
      </div>
      <VSpacer />

      <VToolbarItems>
        <VBtn
          small
          dark
          color="primary"
          @click="bargainDialog = true"
        >
          改价
        </VBtn>
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
              <VTextField
                label="改价金额"
                required
              />
              <span>*改价金额必填</span>
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
                @click="bargainDialog = false"
              >
                确定
              </VBtn>
            </VCardActions>
          </VCard>
        </VDialog>
        <VBtn
          small
          dark
          color="secondary"
          @click="createOrder"
        >
          支付
        </VBtn>
      </VToolbarItems>
    </VToolbar>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.container {
  padding-bottom: 75px;
  background-color: #eee;
}
.section {
  padding: 0 10px;
  margin-bottom: 10px;
  background-color: #fff;
}
.deliveryType {
  padding-top: 15px;
  margin-top: 0;
}
.address {
  padding-bottom: 0;
  margin-bottom: 10px;
  background-color: #fff;
}
.option {
  height: 44px;
}
.priceList {
  height: 30px;
  padding: 0 10px;
}
.brandColor {
  color: $color-brand;
}
.rightElement {
  flex: none;
}
.items {
  margin-bottom: 10px;
}
.bottomSheet {
  height: 350px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.toobar {
  position: absolute !important;
  bottom: 0;
  // stylelint-disable selector-class-pattern
  :global(.v-toolbar__content) {
    padding-right: 0;
  }
}
.priceContainer {
  padding-right: 10px;
  font-size: 16px;
  line-height: 48px;
}
.price {
  color: $color-button-danger;
}
</style>
