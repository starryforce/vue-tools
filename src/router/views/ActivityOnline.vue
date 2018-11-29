<script>
import Layout from '@layouts/main'

export default {
  metaInfo: {
    title: '线上活动',
    meta: [{ name: 'description', content: '线上活动' }],
  },
  name: 'ActivityOnline',
  components: { Layout },
  data() {
    return {
      activityList: [],
    }
  },
  async created() {
    this.activityList = (await this.$api.activity.getStoreActivitys()).data
  },
}
</script>

<template>
  <Layout>
    <VList
      two-line
    >
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
          @click="$router.push('/work/goods/'+item.id)"
        >
          <VListTileAvatar>
            {{ item.activityType }}
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>{{ item.activityName }}</VListTileTitle>
            <VListTileSubTitle>{{ item.productCount }}件商品</VListTileSubTitle>
          </VListTileContent>

          <VListTileAction>
            <VListTileActionText>{{ item.beginTime }}</VListTileActionText>
            <VListTileActionText>{{ item.endTime }}</VListTileActionText>
          </VListTileAction>
          <VListTileAction :class="$style.icon">
            <VIcon>
              chevron_right
            </VIcon>
          </VListTileAction>
        </VListTile>
      </template>
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.icon {
  min-width: 20px;
}
</style>
