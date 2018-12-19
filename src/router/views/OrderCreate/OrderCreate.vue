<script>
import $lodash from 'lodash'
import Layout from '@layouts/SubLayout'
import OrderItemList from './components/OrderItemList'
import OrderPriceList from './components/OrderPriceList'

export default {
  metaInfo: {
    title: '创建订单',
    meta: [{ name: 'description', content: '创建订单' }],
  },
  name: 'OrderCreate',
  components: { Layout, OrderItemList, OrderPriceList },
  filters: {
    couponTag: function(value) {
      const couponTags = [
        '商品优惠券',
        '品牌优惠券',
        '品类优惠券',
        '包邮券',
        '赠品券',
      ]
      return couponTags[value]
    },
  },
  data() {
    return {
      isSelfPick: false,
      usePoint: false,
      preOrderInfo: { usableCoupons: [] },
      pointAmount: 0,
      pointSheet: false,
      couponSheet: false,
      selectedCouponList: [],
      remark: '',
      realName: '',
      idCard: '',
      rules: {
        realName: value => value.length > 1 || '姓名不合法',
        idCard: v =>
          /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(v) ||
          '身份证号不合法',
      },
    }
  },
  computed: {
    currentMember() {
      return this.$store.state.itemStorage.selectedMember
    },
    items() {
      return this.$store.state.itemStorage.cart
    },
    isOversea() {
      return this.items[0] ? this.items[0].isCross : false
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
      this.usePoint = false
      this.pointAmount = 0
      this.pointSheet = false
      this.preCreateOrder()
    },
    currentMember() {
      // 重选客户后重置状态
      this.resetSelections()
      this.preCreateOrder()
    },
    selectedAddress() {
      this.preCreateOrder()
    },
    isSelfPick() {
      this.preCreateOrder()
    },
  },
  created() {
    this.preCreateOrder()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'item-center') {
        // 由商品中心进入时重置状态
        vm.resetSelections()
      }
    })
  },
  methods: {
    preCreateOrder: $lodash.debounce(
      async function() {
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
          this.$snotify.warning(error.message)
        }
      },
      600,
      { maxWait: 2000 }
    ),
    async createOrder() {
      if (!this.selectedAddress.id) {
        this.$snotify.warning('请选择地址')
        return
      }
      if (!this.currentMember.id) {
        this.$snotify.warning('请选择会员')
        return
      }

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
        this.$store.dispatch('itemStorage/clearCart')
        this.$router.replace({ name: 'order-checkout', params: { orderID } })
      } catch (error) {
        this.$snotify.warning(error.message)
      }
    },
    selectPointAmount(value) {
      this.pointAmount = value
      this.pointSheet = false
      this.preCreateOrder()
    },
    resetSelections() {
      this.isSelfPick = false
      this.usePoint = false
      this.pointAmount = 0
      this.pointSheet = false
      this.couponSheet = false
      this.selectedCouponList = []
      this.remark = ''
      this.realName = ''
      this.idCard = ''
      this.$store.dispatch('itemStorage/clearAddress')
    },
    isDisabled(coupon) {
      if (
        this.selectedCouponList.find(item => item === coupon.couponDetailId)
      ) {
        return false
      }
      const currentType = coupon.couponType
      return this.selectedCouponList.some(coupon => {
        const originCoupon = this.preOrderInfo.usableCoupons.find(
          item => item.couponDetailId === coupon
        )
        // 0商品优惠券 1品牌优惠券 2品类优惠券 3包邮券 4赠品券
        // [0,1,2] + 3 +4
        // 0 1 2 三种类型最多使用一张，3 4 各可用一张
        if (currentType in [0, 1, 2] && originCoupon.couponType in [0, 1, 2]) {
          return true
        } else {
          return currentType === originCoupon.couponType
        }
      })
    },
    async submitRealName() {
      try {
        await this.$api.member.verifyRealName({
          idCard: this.idCard,
          realName: this.realName,
          memberID: this.currentMember.id,
          mobile: this.currentMember.mobile,
        })
        this.$store.dispatch('itemStorage/updateRealnameStatus')
        this.$snotify.success('实名认证提交成功')
      } catch (error) {
        this.$snotify.warning(error.message)
      }
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
    <VCard v-if="isOversea && currentMember.isRealName !==1">
      <VCardText>
        <h3>实名认证</h3>
        <VTextField
          v-model="realName"
          :rules="[rules.realName]"
          label="姓名："
          hint="输入合法的姓名"
        />
        <VTextField
          v-model="idCard"
          :rules="[rules.idCard]"
          label="身份证号："
          hint="输入合法的身份证号"
          counter
        />
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          color="orange"
          flat
          @click="submitRealName"
        >
          提交
        </VBtn>
      </VCardActions>
    </VCard>
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
        :disabled="!preOrderInfo.usableCoupons.length"
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
                :disabled="isDisabled(coupon)"
                @click="toggle"
              >
                <VListTileAvatar
                  :class="$style.couponCover"
                  color="primary"
                  tile
                >
                  ￥<span :class="$style.couponValue">
                    {{ coupon.reduceAmount || coupon.postAmount }}
                  </span>
                </VListTileAvatar>
                <VListTileContent>
                  <VListTileTitle>
                    <VChip
                      :class="$style.couponTag"
                      color="primary"
                      text-color="white"
                      small
                    >
                      {{ coupon.couponType | couponTag }}
                    </VChip>{{ coupon.title }}
                  </VListTileTitle>
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
            最多可用{{ (Math.floor(preOrderInfo.canUsePoint/1000) * 1000) }}积分，抵{{ (Math.floor(preOrderInfo.canUsePoint/1000) * 10) | currency }}元
          </span>
        </VFlex>
        <VFlex :class="$style.rightElement">
          <VSwitch
            v-model="usePoint"
            color="primary"
            :disabled="!Math.floor(preOrderInfo.canUsePoint/1000)"
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

    <OrderItemList
      :items="items"
      :total-quantity="preOrderInfo.skuSum"
    />

    <div :class="$style.section">
      <VTextField
        v-model="remark"
        label="备注"
        required
      />
    </div>

    <OrderPriceList :pre-order-info="preOrderInfo" />

    <VToolbar
      :class="$style.toolbar"
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
.brandColor {
  color: $color-brand;
}
.rightElement {
  flex: none;
}
.bottomSheet {
  height: 350px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.toolbar {
  position: fixed !important;
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

.couponTag {
  height: 24px !important;
  margin: 0 5px 0 0;
}

.couponCover {
  width: 88px;
  height: 88px;
  margin-top: 0 !important;
  :global(.v-avatar--tile) {
    width: 80px !important;
    height: 80px !important;
    color: #fff;
  }
}
.couponValue {
  font-size: 24px;
}
</style>
