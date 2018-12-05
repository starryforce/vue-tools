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
      activityList: [],
    }
  },
  async created() {
    this.activityList = (await this.$api.activity.getOfflineActivitys()).data
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
            <VListTileSubTitle>{{ item.endTime }}截止 {{ item.participateCount || 0 }}人已报名</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </template>
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.cover {
  width: 140px !important;
  height: 80px !important;
  padding-right: 10px;
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-avatar--tile) {
    width: 140px !important;
    height: 80px !important;
  }
}
</style>
