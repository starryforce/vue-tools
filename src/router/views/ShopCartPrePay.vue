<script>
/* eslint-disable */
import Layout from '@layouts/main'
import ProductViewItem from '@components/ProductViewItem'
import { mapState } from 'vuex'

export default {
  page: {
    title: '购物车',
    meta: [{ name: 'description', content: '购物车' }],
  },
  components: { Layout, ProductViewItem },
  props: {
    resource: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialog: false,
      items: [{ text: '本店柜台仓', value: 0 }],
      countdown: 45,
      smsCode: null,
      offsetTop: 0,
      shopCart: [],
      oversea: false,
      params: {
        IsPostBySelf: true,
        isUsePoint: false,
        change: '',
        CouponIds: [],
      },
      order: {
        totalAmount: 2000,
        totalPostAmount: 10,
        canChangeAmount: 200,
        canUsePoint: 100,
        canUsePointMoney: 1,
      },
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart.goods,
      stack: state => state.cart.stack,
    }),
  },
  mounted() {
    this.shopCart = JSON.parse(JSON.stringify(this.cart))
  },
  async mounted() {
    this.shopCart = JSON.parse(JSON.stringify(this.cart))
    var res = await this.post()
  },
  methods: {
    gotoPay() {
      if (this.offsetTop === 0)
        document.getElementById('products').scrollIntoView(true)
      else if (this.offsetTop === 1)
        document.getElementById('price').scrollIntoView(true)
      else if (this.offsetTop === 2) this.dialog = true
      this.offsetTop++
    },
    smsSend() {
      --this.countdown
      var timer = setInterval(() => {
        if (--this.countdown < 1) {
          this.countdown = 45
          clearInterval(timer)
        }
      }, 1000)
    },
    async post() {
      try {
        var sku = []
        this.shopCart.forEach(element => {
          sku.push({ SkuId: element.goodsId, BuyCount: element.num })
        })
        var order = await this.$api.order.preCreate({
          CustomerId: 'f9eab77eb5d2fdc4392404b98726ebc037454767',
          // AddressId: 0,
          IsPostBySelf: this.params.IsPostBySelf,
          UsePoint: this.params.isUsePoint ? this.order.canUsePoint : 0,
          CouponIds: this.params.CouponIds,
          SkuBuycount: sku,
        })
        this.order = Object.assign({}, order.data)
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>

<template>
  <Layout id="scroll">
    <div :class="$style.main">
      <div>年糕妈妈</div>
      <VRadioGroup v-model="params.IsPostBySelf" row style="margin-top:0" @click="post()">
        <VRadio label="自提" :disabled="oversea" :value="true"/>
        <VRadio :label="oversea?'跨境购':'快递'" :value="false"/>
      </VRadioGroup>
      <div>
        <VSelect v-if="params.IsPostBySelf==1" :items="items" box label="提货门店" :value="0"/>
        <div v-if="params.IsPostBySelf!=1">
          <VListTile>
            <VListTileContent>
              <VListTileTitle>王思颖 17092559564</VListTileTitle>
              <VListTileSubTitle>无锡贝瑞卡诺科技有限公司</VListTileSubTitle>
            </VListTileContent>
          </VListTile>
        </div>
      </div>
      <VForm ref="form" lazy-validation>
        <VList>
          <VListTile>
            <VListTileContent>改价</VListTileContent>
            <VTextField
              v-model="params.change"
              required
              :placeholder="'最低改到'+order.canChangeAmount"
              :rule="[()=>params.change<=order.canChangeAmount || '超过限价']"
            />
          </VListTile>

          <VListTile>
            <VListTileContent>可用积分： {{ order.canUsePoint }}</VListTileContent>
            <VListTileAvatar>
              <VSwitch v-model="params.isUsePoint" @change="post()"/>
            </VListTileAvatar>
          </VListTile>

          <VListTile>
            <VListTileContent>优惠券</VListTileContent>

            <VBottomSheet>
              <span slot="activator" dark>>></span>

              <VList>
                <VSubheader>可用优惠券</VSubheader>
                <VListTile v-for="item in order.usableCoupons" :key="item.couponDetailId">
                  <VListTileTitle>
                    <VCheckbox
                      :label="item.title"
                      :value="item.couponDetailId"
                      v-model="params.CouponIds"
                      @change="post()"
                    ></VCheckbox>
                  </VListTileTitle>
                </VListTile>
              </VList>
            </VBottomSheet>
          </VListTile>
        </VList>
      </VForm>

      <div id="products">共{{ order.skuSum }}件商品</div>
      <ProductViewItem
        v-for="item in order.orderSkuPrices"
        :key="item.skuId"
        :title="item.itemName"
        spec=" "
        code=" "
        :num="item.buyCount"
        :price="item.totalAmount"
        :cover="item.itemCover"
      />
      <VList id="price">
        <!-- <VListTile>
          <VListTileContent>商品原价合计：</VListTileContent>
          <VListTileAvatar></VListTileAvatar>
        </VListTile>-->
        <VListTile v-if="order.freeLimitAmount + order.freeFullAmount">
          <VListTileContent>优惠活动：</VListTileContent>
          <VListTileAvatar>- {{ order.freeLimitAmount + order.freeFullAmount }}</VListTileAvatar>
        </VListTile>

        <VListTile v-if="order.freeVipAmount">
          <VListTileContent>VIP优惠：</VListTileContent>
          <VListTileAvatar>- {{ order.freeVipAmount }}</VListTileAvatar>
        </VListTile>

        <VListTile v-if="0">
          <VListTileContent>改价优惠：</VListTileContent>
          <VListTileAvatar>- 0</VListTileAvatar>
        </VListTile>
        <VListTile v-if="order.freeCouponAmount">
          <VListTileContent>优惠券：</VListTileContent>
          <VListTileAvatar>- {{ order.freeCouponAmount }}</VListTileAvatar>
        </VListTile>

        <VListTile v-if="order.usePointMoney">
          <VListTileContent>积分抵扣：</VListTileContent>
          <VListTileAvatar>- {{ order.usePointMoney }}</VListTileAvatar>
        </VListTile>
        <VListTile>
          <VListTileContent>运费：</VListTileContent>
          <VListTileAvatar>+ {{ order.totalPostAmount }}</VListTileAvatar>
        </VListTile>
      </VList>
    </div>

    <VLayout row wrap :class="$style.btnnav">
      <VFlex xs5>
        订单合计：￥{{ order.totalAmount }}
        <!-- 还需付款：￥25 -->
      </VFlex>
      <VFlex xs3>
        <VBtn large flat>取消</VBtn>
      </VFlex>
      <VFlex xs4>
        <VBtn large @click="gotoPay">去支付</VBtn>
      </VFlex>
    </VLayout>

    <VDialog v-model="dialog">
      <VCard>
        <VCardTitle class="headline grey lighten-2" primary-title>客户授权使用资产</VCardTitle>

        <VLayout>
          <VFlex xs5>
            <VCardText>输入用户密码</VCardText>
          </VFlex>
          <VFlex xs7>
            <VTextField label="请用户输入密码"/>
          </VFlex>
        </VLayout>
        <VLayout>
          <VFlex xs5>
            <VCardText>或使用短信验证</VCardText>
          </VFlex>
          <VFlex xs7>
            <VTextField
              v-if="countdown<45 || smsCode"
              v-model="smsCode"
              :label="countdown>30?'请输入验证码':`${countdown}秒后重试`"
            />
            <VBtn v-else @click="smsSend()">
              <span>发送到17092559564</span>
            </VBtn>
          </VFlex>
        </VLayout>
        <VLayout>
          <VFlex xs6>
            <VCardText>或扫描会员动态码</VCardText>
          </VFlex>
          <VFlex xs6>
            <VCardText>
              <VIcon>camera</VIcon>
            </VCardText>
          </VFlex>
        </VLayout>
        <VDivider/>

        <VCardActions>
          <VSpacer/>
          <VBtn color="primary" flat @click="dialog = false">放弃使用资产</VBtn>
          <VBtn @click="dialog = false">确认</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </Layout>
</template>

<style lang="scss" module>
.title {
  width: 100%;
  height: 28px;
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
  color: rgba(89, 89, 89, 1);
}
.main {
  height: calc(100% - 56px);
  overflow: auto;
}
.btnnav {
  position: fixed;
  width: 100%;
  height: 56px;
  border-top: solid rgba(191, 191, 191, 1) 1px;
}
</style>
