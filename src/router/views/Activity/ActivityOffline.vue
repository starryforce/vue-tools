<script>
import Layout from '@layouts/MainLayout'

export default {
  metaInfo: {
    title: '线下活动',
    meta: [{ name: 'description', content: '线下活动' }],
  },
  name: 'ActivityOffline',
  components: { Layout },
  data() {
    return {
      pageNo: 1,
      pageSize: 20,
      hasNext: true,
      activityList: [],
    }
  },
  methods: {
    async infiniteHandler($state) {
      let newData = (await this.$api.activity.getOfflineActivitys({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      })).data
      this.hasNext = newData.length === this.pageSize
      if (newData.length) {
        this.activityList.push(...newData)
      }
      if (this.hasNext) {
        this.pageNo += 1
        $state.loaded()
      } else {
        $state.complete()
      }
    },
  },
}
</script>

<template>
  <Layout>
    <VList three-line>
      <VSubheader>报名中</VSubheader>
      <template v-for="(item, index) in activityList">
        <VDivider
          v-if="index"
          :key="index"
        />
        <VListTile
          :key="item.title"
          :class="$style.activity"
          avatar
          @click="$router.push('/activity/offline/detail/'+item.integralActiveId)"
        >
          <VListTileAvatar
            tile
            :class="$style.cover"
          >
            <img
              :class="$style.cover"
              :src="item.activePicPath"
            >
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>{{ item.integralActiveName }}</VListTileTitle>
            <VListTileSubTitle>{{ item.consumptionIntegral }}积分</VListTileSubTitle>
            <VListTileSubTitle>{{ item.registrationTime }}截止 {{ item.participateCount || 0 }}人已报名</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </template>
      <infinite-loading
        @infinite="infiniteHandler"
      />
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.activity {
  // stylelint-disable
  :global(.v-list__tile__avatar) {
    flex: none;
    width: 120px;
  }
  :global(.v-list__tile__avatar) {
    width: 120px;
    margin-top: 0;
  }
  :global(.v-avatar--tile) {
    width: 115px !important;
    height: 80px !important;
  }
}
</style>
