<template>
  <div>
    <VTabs
      v-model="selectedTab"
      color="primary"
      dark
      grow
      @change="changeTab"
    >
      <VTabsSlider color="yellow" />
      <VTab
        v-for="tab in tabs"
        :key="tab.label"
        :href="`#${tab.value}`"
      >
        {{ tab.label }}
      </VTab>
    </VTabs>
    <VList two-line>
      <template
        v-for="(balance,index) of balanceList"
      >
        <VDivider
          v-if="index"
          :key="index"
        />
        <VListTile :key="balance.id">
          <VListTileContent>
            <VListTileTitle>关联订单:{{ balance.relationTid }}</VListTileTitle>
            <VListTileSubTitle>{{ balance.changeType?'消耗':'充值' }}</VListTileSubTitle>
          </VListTileContent>
          <VListTileAction>
            <VListTileTitle>{{ balance.changeAmount }}</VListTileTitle>
            <VListTileSubTitle>{{ balance.changeTime }}</VListTileSubTitle>
          </VListTileAction>
        </VListTile>
      </template>
      <infinite-loading
        :identifier="infiniteId"
        @infinite="infiniteHandler"
      />
    </VList>
  </div>
</template>

<script>
export default {
  name: 'MemberBalance',
  props: {
    memberID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedTab: null,
      tabs: [
        { label: '全部', value: 2 },
        { label: '充值', value: 0 },
        { label: '消耗', value: 1 },
      ],
      pageNo: 1,
      pageSize: 20,
      hasNext: true,
      infiniteId: +new Date(),
      balanceList: [],
    }
  },
  methods: {
    async infiniteHandler($state) {
      let newData = (await this.$api.member.getBalanceList({
        memberID: this.memberID,
        changeType: this.selectedTab,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      })).recordList
      this.hasNext = newData.length === this.pageSize
      if (newData.length) {
        this.balanceList.push(...newData)
      }
      if (this.hasNext) {
        this.pageNo += 1
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    changeTab(newValue) {
      this.selectedTab = newValue
      this.pageNo = 1
      this.couponList = []
      this.infiniteId += 1
    },
  },
}
</script>

<style lang="scss" module>
@import '@design';
</style>
