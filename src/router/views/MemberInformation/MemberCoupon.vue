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
    <VList three-line>
      <template
        v-for="(coupon,index) of couponList"
      >
        <VDivider
          v-if="index"
          :key="index"
        />
        <VListTile
          :key="coupon.couponId"
          :class="$style.couponCard"
        >
          <VListTileAction>
            <VListTileTitle>{{ coupon.discountExplain }}</VListTileTitle>
            <VListTileTitle>{{ coupon.discountNum }}</VListTileTitle>
          </VListTileAction>
          <VListTileContent>
            <VListTileTitle>{{ coupon.name }}</VListTileTitle>
            <VListTileSubTitle>有效期:{{ coupon.availableTime }}</VListTileSubTitle>
          </VListTileContent>
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
  name: 'MemberCoupon',
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
        { label: '未使用', value: 0 },
        { label: '已使用', value: 1 },
        { label: '已过期', value: 2 },
      ],
      pageNo: 1,
      pageSize: 20,
      hasNext: true,
      infiniteId: +new Date(),
      couponList: [],
    }
  },
  methods: {
    async infiniteHandler($state) {
      try {
        let newData = (await this.$api.member.getCouponList({
          memberID: this.memberID,
          status: this.selectedTab,
          isPostCoupon: false,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        })).data
        this.hasNext = newData.length === this.pageSize
        if (newData.length) {
          this.couponList.push(...newData)
        }
        if (this.hasNext) {
          this.pageNo += 1
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (error) {
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
// stylelint-disable
.couponCard {
  :global(.v-list__tile__action) {
    width: 100px;
    color: #fff;
    background-color: #6a9ce7;
    :global(.v-list__tile__title) {
      text-align: center;
    }
  }
  :global(.v-list__tile__content) {
    padding-left: 10px;
  }
}
</style>
