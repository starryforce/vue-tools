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
  async created() {
    var res = await this.$api.order.getRecharge()
    this.list = res.data
  },
  methods: {
    async createRechargeOrder() {
      await this.$api.order.createRecharge({
        memberID: this.memberID,
        rechargeID: this.selectedItem,
      })
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
                xs6
              >
                <VItem :value="item.id">
                  <VBtn
                    slot-scope="{ active, toggle }"
                    :input-value="active"
                    :class="$style.options"
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
      优惠活动：
    </VSubheader>
    <VList>
      <template v-for="(item, index) in list">
        <VDivider
          v-if="index"
          :key="'divider'+index"
        />

        <VListTile
          :key="item.id"
          avatar
        >
          <VListTileContent>
            <VListTileTitle>
              {{ item.activityName }}<VListTileTitle />
            </vlisttiletitle>
          </VListTileContent>
        </VListTile>
      </template>
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
</style>
