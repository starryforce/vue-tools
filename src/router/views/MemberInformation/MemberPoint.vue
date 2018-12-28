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
        v-for="(point,index) of pointList"
      >
        <VDivider
          v-if="index"
          :key="index"
        />
        <VListTile :key="point.id">
          <VListTileContent>
            <VListTileTitle class="body-2">
              关联订单:{{ point.relationTid }}
            </VListTileTitle>
            <VListTileSubTitle>{{ point.changeTime }}</VListTileSubTitle>
          </VListTileContent>
          <VListTileAction>
            <VListTileTitle class="text-xs-right">
              {{ point.changeType?'消耗':'充值' }}
            </VListTileTitle>
            <VListTileSubTitle class="text-xs-right">
              {{ point.changeType?'-':'+' }}{{ point.changeCount }}
            </VListTileSubTitle>
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
  name: 'MemberPoint',
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
        { label: '消费赠送', value: 0 },
        { label: '活动赠送', value: 1 },
        { label: '消费扣除', value: 2 },
        { label: '手动修改', value: 3 },
      ],
      pageNo: 1,
      pageSize: 20,
      hasNext: true,
      infiniteId: +new Date(),
      pointList: [],
    }
  },
  methods: {
    async infiniteHandler($state) {
      let newData = (await this.$api.member.getPointList({
        memberID: this.memberID,
        changeType: this.selectedTab,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      })).integralList

      this.hasNext = newData.length === this.pageSize
      if (newData.length) {
        this.pointList.push(...newData)
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
      this.pointList = []
      this.infiniteId += 1
    },
  },
}
</script>

<style lang="scss" module>
@import '@design';
</style>
