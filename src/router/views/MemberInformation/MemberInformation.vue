<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: '会员信息',
    meta: [{ name: 'description', content: 'MemberInformation' }],
  },
  name: 'MemberInformation',
  components: { Layout },
  props: {
    id: {
      type: String,
      required: true,
      default: '0',
    },
  },
  data() {
    return {
      memberInformation: () => {},
      orders: () => {},
      assets: () => {},
      active: 0,
      tabs: ['基础信息', '消费统计', '订单列表', '会员资产', '活动参与'],
      isEditing: false,
    }
  },
  created() {
    this.getBaseInformation()
  },

  methods: {
    async getBaseInformation() {
      this.memberInformation = (await this.$api.member.getBaseInformation(
        this.id
      )).customerInfo
    },
    next() {
      const active = parseInt(this.active)
      this.active = active < 2 ? active + 1 : 0
    },
    async tabChange(name) {
      switch (name) {
        case '订单列表':
          this.orders = await this.$api.member.getConsume(this.id)
          break
        case '会员资产':
          this.assets = await this.$api.member.getAssets(this.id)
          break
      }
    },
  },
}
</script>

<template>
  <Layout>
    <VList
      :class="$style.nameBoard"
      two-line
      dark
    >
      <VListTile
        :key="memberInformation.id"
        avatar
      >
        <VListTileAvatar>
          <img :src="memberInformation.picUrl">
        </VListTileAvatar>
        <VListTileContent>
          <VListTileTitle>{{ memberInformation.customerName }}</VListTileTitle>
          <VListTileSubTitle>
            <template v-if="memberInformation.customerName =='V0'">
              <VIcon>
                child_friendly
              </VIcon>
              非会员
            </template>
            <template v-else>
              <span :class="$style.nameplate">
                <VIcon color="#6c4103">
                  child_friendly
                </VIcon>
                超级会员 VIP {{ memberInformation.gradeName }}
              </span>
            </template>
          </VListTileSubTitle>
        </VListTileContent>

        <VListTileAction @click="isEditing=!isEditing">
          <VIcon v-show="!isEditing">
            edit
          </VIcon>
          <VIcon v-show="isEditing">
            done
          </VIcon>
        </VListTileAction>
      </VListTile>
    </VList>
    <VTabs
      v-model="active"
      :class="$style.tabs"
      color="primary"
      dark
      grow
      centered
      slider-color="white"
    >
      <VTab
        v-for="tabName in tabs"
        :key="tabName"
        ripple
        @click="tabChange(tabName)"
      >
        {{ tabName }}
      </VTab>
    </VTabs>
    <VTabsItems
      v-model="active"
      :class="$style.tabsItems"
    >
      <VTabItem>
        <VList>
          <VListTile>
            <VListTileContent>
              <VListTileTitle>姓名</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.customerName }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>昵称</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.customerName }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <!-- <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>会员卡号</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.cardID }}</VListTileActionText>
            </VListTileAction>
          </VListTile> -->
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>注册手机</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.mobile }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>注册时间</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.createTime }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>所属门店</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.storeName }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>所属导购</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.employeeName }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>会员标签</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText v-if="!isEditing">
                <span
                  v-for="item in memberInformation.labelInfo"
                  :key="item.labelId"
                >
                  {{ item.labelName }}
                </span>
              </VListTileActionText>
              <VListTileActionText
                v-else
                :class="$style.isEditing"
              >
                <VBtn
                  flat
                  small
                  color="primary"
                >
                  添加标签
                  <VIcon
                    dark
                  >
                    chevron_right
                  </VIcon>
                </VBtn>
              </VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>关系人</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText v-if="!isEditing">
                {{ memberInformation.attributeValu &&memberInformation.attributeValu.join('、') }}
              </VListTileActionText>
              <VListTileActionText
                v-else
                :class="$style.isEditing"
              >
                <VBtn
                  flat
                  small
                  color="primary"
                >
                  添加关系人
                  <VIcon
                    dark
                  >
                    chevron_right
                  </VIcon>
                </VBtn>
              </VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>人像识别</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText v-if="!isEditing">
                {{ memberInformation.isFaceId }}
              </VListTileActionText>
              <VListTileActionText
                v-else
                :class="$style.isEditing"
              >
                <VBtn
                  flat
                  small
                  color="primary"
                  :to="{ name: 'member-face', params: {id}}"
                >
                  添加识别照片
                  <VIcon
                    dark
                  >
                    chevron_right
                  </VIcon>
                </VBtn>
              </VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile @click="$router.push({name:'address-manage',params:{memberID:id}})">
            <VListTileContent>
              <VListTileTitle>收货地址</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>" "</VListTileActionText>
            </VListTileAction>
          </VListTile>
        </VList>
      </VTabItem>
      <VTabItem>
        <VList>
          <VListTile>
            <VListTileContent>
              <VListTileTitle>消费总金额</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>￥{{ memberInformation.consumAmount }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>消费次数</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.consumCount }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>客单价</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>￥{{ memberInformation.unitPrice }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>最近活动参与时间</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.lastActivityTime }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>最近消费时间</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.lastTradeTime }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
        </VList>
      </VTabItem>
      <VTabItem>
        <VList
          v-if="orders"
          :class="$style.order"
          subheader
        >
          <template v-for="(order, index) in orders.orderInfo">
            <VDivider
              v-if="index"
              :key="'divider'+order.orderNo"
            />
            <VSubheader :key="'id'+order.orderNo">
              <VIcon>assignment</VIcon>
              订单号：{{ order.orderNo }}
            </VSubheader>
            <VListTile
              :key="'order'+order.orderNo"
            >
              <VListTileContent>
                <VContainer
                  fluid
                  grid-list-sm
                >
                  <VLayout v-if="order">
                    <VFlex
                      v-for="item in order.orderDetail.length>5?order.orderDetail.slice(0,4):order.orderDetail"
                      :key="item.id"
                      d-flex
                    >
                      <VImg
                        :src="item.picUrl || ''"
                        :lazy-src="item.picUrl || ''"
                        aspect-ratio="1"
                        class="grey lighten-2"
                      >
                        <VLayout
                          slot="placeholder"
                          fill-height
                          align-center
                          justify-center
                          ma-0
                        >
                          <VProgressCircular
                            indeterminate
                            color="grey lighten-5"
                          />
                        </VLayout>
                      </VImg>
                    </VFlex>
                    <VFlex
                      v-if="order.orderDetail.length>5"
                      d-flex
                      align-center
                      colunm
                      :class="$style.itemQuantity"
                    >
                      <VLayout
                        :column="true"
                        align-center
                      >
                        <VFlex>
                          共{{ order.orderDetail.length }}件
                        </VFlex>
                        <VFlex>
                          商品
                        </VFlex>
                      </VLayout>
                    </VFlex>
                  </VLayout>
                </VContainer>
              </VListTileContent>
            </VListTile>
            <VSubheader :key="'header'+order.orderNo">
              <VIcon>today</VIcon>
              日期：{{ order.createTime }}
              <VSpacer />
              <VIcon>payment</VIcon>
              总金额：￥{{ order.totalAmount }}
            </VSubheader>
          </template>
        </VList>
      </VTabItem>
      <VTabItem>
        <VList subheader>
          <VSubheader>
            抵用资产
          </VSubheader>
          <VListTile :to="{name:'member-point',params:{memberID:id}}">
            <VListTileContent>
              <VListTileTitle>购物积分</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ assets.integralCount }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile :to="{name:'member-balance',params:{memberID:id}}">
            <VListTileContent>
              <VListTileTitle>余额</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>￥{{ assets.memberAmount }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VSubheader>
            优惠券
          </VSubheader>
          <VListTile :to="{name:'member-coupon',params:{memberID:id}}">
            <VListTileContent>
              <VListTileTitle>可使用</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ assets.couponUsableCount }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile :to="{name:'member-coupon',params:{memberID:id}}">
            <VListTileContent>
              <VListTileTitle>已使用</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ assets.couponUsedCount }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile :to="{name:'member-coupon',params:{memberID:id}}">
            <VListTileContent>
              <VListTileTitle>已过期</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ assets.couponEexpiredCount }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
        </VList>
      </VTabItem>
      <VTabItem>
        <VList>
          <template v-for="(activity,index) of memberInformation.activities">
            <VDivider
              v-if="index"
              :key="'divider'+activity.id"
              inset
            />
            <VListTile
              :key="activity.id"
              avatar
              @click="toggle(index)"
            >
              <VListTileAvatar>
                <VImg
                  :src="activity.cover || ''"
                  :lazy-src="activity.cover || ''"
                  aspect-ratio="2"
                >
                  <VLayout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <VProgressCircular
                      indeterminate
                      color="grey lighten-5"
                    />
                  </VLayout>
                </VImg>
              </VListTileAvatar>
              <VListTileContent>
                <VListTileTitle>{{ activity.name }}</VListTileTitle>
                <VListTileSubTitle>
                  {{ activity.shop }}
                </VListTileSubTitle>
              </VListTileContent>
            </VListTile>
          </template>
        </VList>
      </VTabItem>
    </VTabsItems>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
:export {
  // stylelint-disable-next-line property-no-unknown
  width-avatar: 20vw;
}
.nameBoard.nameBoard {
  background-color: $color-brand-light;
}

.tabs {
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-tabs__item) {
    padding-right: 0;
    padding-left: 0;
  }
}
.tabsItems {
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile__action-text) {
    font-size: 15px;
  }
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile__title) {
    font-size: 15px;
  }
}
.order {
  // stylelint-disable selector-class-pattern
  :global(.v-list__tile) {
    height: 100%;
  }
  :global(.container.fluid) {
    padding-top: 0;
    padding-right: 0;
    padding-left: 0;
  }

  :global(.flex.d-flex) {
    flex-basis: 20%;
    flex-grow: 0;
  }
}
.itemQuantity {
  background-color: $color-button-bg;
}
.nameplate {
  display: inline-block;
  padding: 2px 6px;
  color: #6c4103;
  background: linear-gradient(
    to right,
    #f4de8f,
    #d3a809,
    #f4de8f,
    #d3a809,
    #f4de8f
  );
  border-radius: 5px;
}
.isEditing {
  color: $color-brand-light;
}
</style>
