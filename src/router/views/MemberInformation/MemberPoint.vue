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
        v-for="point of pointList"
        :key="point.id"
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
      try {
        let newData = (await this.$api.member.getPointList({
          memberID: this.memberID,
          changeType: this.selectedTab,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        })).data
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
      } catch (error) {
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
