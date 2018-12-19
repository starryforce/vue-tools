<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: '会员储值',
    meta: [{ name: 'description', content: '会员储值' }],
  },
  name: 'AddCredit',
  components: { Layout },
  props: {
    memberID: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectedItem: '',
      list: [],
    }
  },
  computed: {
    selectedActivity() {
      return this.list.find(item => item.id === this.selectedItem) || {}
    },
  },
  async created() {
    this.list = (await this.$api.order.getRecharge()).data
  },
  methods: {
    async createRechargeOrder() {
      if (!this.selectedItem) {
        this.$snotify.warning('', '请选择储值档位')
        return
      }
      const orderID = (await this.$api.order.createRecharge({
        memberID: this.memberID,
        rechargeID: this.selectedItem,
      })).data
      this.$router.push({ name: 'order-checkout', params: { orderID } })
    },
  },
}
</script>

<template>
  <Layout>
    <VCard>
      <VCardTitle>
        <VItemGroup
          v-model="selectedItem"
          mandatory
        >
          <VSubheader>充值金额：</VSubheader>
          <VContainer
            fluid
            grid-list-md
          >
            <VLayout wrap>
              <VFlex
                v-for="item in list"
                :key="item.id"
                :class="$style.options"
                xs6
              >
                <VItem :value="item.id">
                  <VBtn
                    slot-scope="{ active, toggle }"
                    :input-value="active"
                    block
                    @click="toggle"
                  >
                    {{ item.activityPrice }}元
                  </VBtn>
                </VItem>
              </VFlex>
            </VLayout>
          </VContainer>
        </VItemGroup>
      </VCardTitle>
    </VCard>
    <VSubheader>
      优惠活动：{{ selectedActivity.activityName }}
    </VSubheader>
    <VList>
      <VListTile v-if="selectedActivity.giveMoney">
        <VListTileContent>
          <VListTileTitle>
            充值送余额
            <VListTileTitle />
          </vlisttiletitle>
        </VListTileContent>
        <VListTileAction>
          <VListTileActionText>{{ selectedActivity.giveMoney }}</VListTileActionText>
        </VListTileAction>
      </VListTile>
      <VListTile v-if="selectedActivity.giveCoupons && selectedActivity.giveCoupons.id">
        <VListTileContent>
          <VListTileTitle>
            充值送券
            <VListTileTitle />
          </vlisttiletitle>
        </VListTileContent>
        <VListTileAction>
          <VListTileActionText>{{ selectedActivity.giveCoupons.name }}</VListTileActionText>
        </VListTileAction>
      </VListTile>
    </VList>
    <VBtn
      :class="$style.button"
      block
      color="primary"
      dark
      fixed
      @click="createRechargeOrder"
    >
      充值
    </VBtn>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.button {
  bottom: 0;
}
.options {
  // stylelint-disable-next-line
  :global(.v-btn--active) {
    color: #fff !important;
    background-color: $color-brand-light !important;
  }
}
</style>
