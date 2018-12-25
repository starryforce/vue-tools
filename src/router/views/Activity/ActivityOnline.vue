<script>
import Layout from '@layouts/MainLayout'

export default {
  metaInfo: {
    title: '线上活动',
    meta: [{ name: 'description', content: '线上活动' }],
  },
  name: 'ActivityOnline',
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
      let newData = (await this.$api.activity.getStoreActivitys({
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
    <VList two-line>
      <VSubheader>活动中</VSubheader>
      <template v-for="(item, index) in activityList">
        <VDivider
          v-if="index"
          :key="index"
        />
        <VListTile
          :key="item.id"
          avatar
          ripple
          @click="$router.push({name:'item-center',params:{activityID:item.id}})"
        >
          <VListTileAvatar
            tile
            :class="$style.label"
          >
            {{ item.activityType }}
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>{{ item.activityName }}</VListTileTitle>
            <VListTileSubTitle>{{ item.productCount }}件商品</VListTileSubTitle>
          </VListTileContent>
          <VListTileContent>
            <VListTileSubTitle class="text-xs-right body-1">
              开始时间：{{ item.beginTime | date }}
            </VListTileSubTitle>
            <VListTileSubTitle class="text-xs-right body-1">
              结束时间：{{ item.endTime | date }}
            </VListTileSubTitle>
          </VListTileContent>
          <VListTileAction :class="$style.icon">
            <VIcon>
              chevron_right
            </VIcon>
          </VListTileAction>
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
.icon {
  min-width: 20px;
}
.label {
  // stylelint-disable
  :global(.v-avatar) {
    font-size: 14px !important;
    color: #fff;
    background-color: #e6a23c;
  }
}
</style>
