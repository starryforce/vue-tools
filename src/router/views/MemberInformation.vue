<script>
import Layout from '@layouts/WithToolBar'

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
      active: 0,
      tabs: ['基础信息', '消费统计', '订单列表', '会员资产', '活动参与'],
    }
  },
  created() {
    this.getMemberInformation()
  },

  methods: {
    toggle(index) {},
    async getMemberInformation() {
      this.memberInformation = (await this.$api.member.getMemberInformation(
        this.id
      )).data
    },
    next() {
      const active = parseInt(this.active)
      this.active = active < 2 ? active + 1 : 0
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
        @click="toggle(index)"
      >
        <VListTileAvatar>
          <img :src="memberInformation.avatar">
        </VListTileAvatar>
        <VListTileContent>
          <VListTileTitle>{{ memberInformation.name }}</VListTileTitle>
          <VListTileSubTitle>
            {{ memberInformation.nickname }}
          </VListTileSubTitle>
        </VListTileContent>

        <VListTileAction>
          <VIcon
            color="grey lighten-1"
          >
            edit
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
      >
        {{ tabName }}
      </VTab>
    </VTabs>
    <VTabsItems v-model="active">
      <VTabItem>
        <VList>
          <VListTile>
            <VListTileContent>
              <VListTileTitle>姓名</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.name }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>昵称</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.nickname }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>会员卡号</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.cardID }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
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
              <VListTileActionText>{{ memberInformation.registerTime }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>所属门店</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.shop }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>所属导购</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.salesperson }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>会员标签</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.tags &&memberInformation.tags.join('、') }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>关系人</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.relationShip }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>人像识别</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.name }}</VListTileActionText>
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
              <VListTileActionText>￥{{ memberInformation.consumption }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>消费次数</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.timesOfConsume }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>客单价</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>￥{{ memberInformation.average }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>最近交易时间</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.recentTradeDate }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>最近消费时间</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.recentConsumeDate }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
        </VList>
      </VTabItem>
      <VTabItem>
        <VList
          v-if="memberInformation.orders"
          :class="$style.order"
          subheader
        >
          <template v-for="(order, index) in memberInformation.orders">
            <VDivider
              v-if="index"
              :key="'divider'+order.id"
            />
            <VSubheader :key="'header'+order.id">
              {{ order.orderTime }} 总金额：￥{{ order.payment }}
            </VSubheader>

            <VListTile
              :key="'order'+order.id"
            >
              <VListTileContent>
                <VContainer
                  fluid
                  grid-list-sm
                >
                  <VLayout v-if="order">
                    <VFlex
                      v-for="item in order.items.length>5?order.items.slice(0,4):order.items"
                      :key="item.id"
                      d-flex
                    >
                      <VImg
                        :src="item.cover"
                        :lazy-src="item.cover"
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
                      v-if="order.items.length>5"
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
                          共{{ order.items.length }}件
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
          </template>
        </VList>
      </VTabItem>
      <VTabItem>
        <VList subheader>
          <VSubheader>
            购物积分
          </VSubheader>
          <VListTile>
            <VListTileContent>
              <VListTileTitle>购物积分</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>￥{{ memberInformation.points }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>积分纪录</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.pointsRecord }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VSubheader>
            优惠券
          </VSubheader>
          <VListTile>
            <VListTileContent>
              <VListTileTitle>可使用</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.coupons && memberInformation.coupons.active }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>已使用</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.coupons && memberInformation.coupons.used }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>已过期</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.coupons && memberInformation.coupons.expired }}</VListTileActionText>
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
                  :src="activity.cover"
                  :lazy-src="activity.cover"
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
</style>
