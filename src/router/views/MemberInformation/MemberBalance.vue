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
    <VContainer>
      <VCard
        v-for="balance of balanceList"
        :key="balance.id"
      >
        <VImg
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        />

        <VCardTitle primary-title>
          <div>
            <h3 class="headline mb-0">
              Kangaroo Valley Safari
            </h3>
            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          </div>
        </VCardTitle>

        <VCardActions>
          <VBtn
            flat
            color="orange"
          >
            Share
          </VBtn>
          <VBtn
            flat
            color="orange"
          >
            Explore
          </VBtn>
        </VCardActions>
      </VCard>
      <infinite-loading
        :identifier="infiniteId"
        @infinite="infiniteHandler"
      />
    </VContainer>
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
