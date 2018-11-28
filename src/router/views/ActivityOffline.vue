<script>
/* eslint-disable */
import Layout from '@layouts/main'
import { debug } from 'util'

export default {
  metaInfo: {
    title: 'ActivityOffline',
    meta: [{ name: 'description', content: 'ActivityOffline' }],
  },
  components: { Layout },
  data() {
    return {
      items: [],
    }
  },
  async created() {
    var res = await this.$api.activity.getOfflineActivitys()
    this.items = res.data
  },
}
</script>

<template>
  <Layout>
    <VList three-line>
      <VSubheader>报名中</VSubheader>
      <template v-for="(item, index) in items">
        <VDivider v-if="index" :key="index"/>

        <VListTile
          :key="item.title"
          avatar
          @click="$router.push('/activity/offline/detail/'+item.integralActiveId)"
        >
          <VListTileAvatar tile :class="$style.cover">
            <img :class="$style.cover" :src="item.activePicPath">
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>{{item.integralActiveName}}</VListTileTitle>
            <VListTileSubTitle>{{item.consumptionIntegral}}积分</VListTileSubTitle>
            <VListTileSubTitle>{{item.endTime}}截止 {{item.participateCount}}人已报名</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </template>
    </VList>
    <VList three-line>
      <VSubheader>已结束</VSubheader>
      <template v-for="(item, index) in 0">
        <VDivider v-if="index" :key="index"/>

        <VListTile :key="item.title" avatar>
          <VListTileAvatar tile :class="$style.cover">
            <img :class="$style.cover" :src="item.avatar">
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>欢庆儿童节宝宝绘画比赛</VListTileTitle>
            <VListTileSubTitle>5000积分</VListTileSubTitle>
            <VListTileSubTitle>2018.12.01截止 18人已报名</VListTileSubTitle>
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
