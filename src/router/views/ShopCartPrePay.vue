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
      radios: 0,
      items: ['本店柜台仓', 25, 65, 25, 652, 56, 26],
      countdown: 45,
      smsCode: null,
      offsetTop: 0,
      shopCart: [],
    }
  },
  computed: {
    ...mapState({ cart: state => state.cart.goods }),
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
          IsPostBySelf: true,
          UsePoint: 0,
          CouponIds: [],
          SkuBuycount: sku,
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
  async mounted() {
    this.shopCart = JSON.parse(JSON.stringify(this.cart))
    var res = await this.post()
  },
}
</script>

<template>
  <Layout id="scroll">
    <div :class="$style.main">
      <div>年糕妈妈</div>
      <VRadioGroup v-model="radios" row style="margin-top:0">
        <VRadio label="自提" value="1"/>
        <VRadio label="快递" value="2"/>
        <VRadio label="跨境购" value="3"/>
      </VRadioGroup>
      <div>
        <VSelect v-if="radios==1" :items="items" box label="提货门店" value="本店柜台仓"/>
        <div v-if="radios!=1">
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
            <VListTileAvatar>
              <VTextField required/>
            </VListTileAvatar>
          </VListTile>

          <VListTile>
            <VListTileContent>余额</VListTileContent>
            <VListTileAvatar>
              <VSwitch/>
            </VListTileAvatar>
          </VListTile>

          <VListTile>
            <VListTileContent>积分</VListTileContent>
            <VListTileAvatar>
              <VSwitch/>
            </VListTileAvatar>
          </VListTile>

          <VListTile>
            <VListTileContent>优惠券</VListTileContent>
            <VListTileAvatar>>></VListTileAvatar>
          </VListTile>
        </VList>
      </VForm>

      <div id="products">共12件商品</div>
      <ProductViewItem v-for="i in 5" :key="i"/>
      <VList id="price">
        <VListTile>
          <VListTileContent>商品原价合计：</VListTileContent>
          <VListTileAvatar>8000</VListTileAvatar>
        </VListTile>
        <VListTile>
          <VListTileContent>优惠活动：</VListTileContent>
          <VListTileAvatar>-80</VListTileAvatar>
        </VListTile>

        <VListTile>
          <VListTileContent>改价优惠：</VListTileContent>
          <VListTileAvatar>-100</VListTileAvatar>
        </VListTile>
        <VListTile>
          <VListTileContent>优惠券：</VListTileContent>
          <VListTileAvatar>-100</VListTileAvatar>
        </VListTile>

        <VListTile>
          <VListTileContent>积分抵扣：</VListTileContent>
          <VListTileAvatar>-100</VListTileAvatar>
        </VListTile>
        <VListTile>
          <VListTileContent>余额抵扣：</VListTileContent>
          <VListTileAvatar>-100</VListTileAvatar>
        </VListTile>
      </VList>
    </div>

    <VLayout row wrap :class="$style.btnnav">
      <VFlex xs5>
        订单合计：￥262625
        还需付款：￥25
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
