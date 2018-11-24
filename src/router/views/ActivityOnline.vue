<script>
import Layout from '@layouts/main'

export default {
  metaInfo: {
    title: 'ActivityOnline',
    meta: [{ name: 'description', content: 'ActivityOnline' }],
  },
  components: { Layout },
  data() {
    return {
      selected: [2],
      items: [],
    }
  },
  async created() {
    let res = (await this.$api.activity.getStoreActivitys()).data
    this.items = res
  },
  methods: {},
}
</script>

<template>
  <Layout>
    <VList
      two-line
    >
      <VSubheader>活动中</VSubheader>
      <template v-for="(item, index) in items">
        <VListTile
          :key="item.title"
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
        <VDivider
          v-if="index + 1 < items.length"
          :key="index"
        />
      </template>
    </VList>
    <VList
      two-line
    >
      <VSubheader>已结束</VSubheader>
      <template v-for="(item, index) in 0">
        <VListTile
          :key="item.title"
          avatar
          ripple
          @click="toggle(index)"
        >
          <VListTileAvatar>
            <img :src="item.avatar">
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>新年特价活动</VListTileTitle>
            <VListTileSubTitle>200件商品</VListTileSubTitle>
          </VListTileContent>

          <VListTileAction>
            <VListTileActionText>已有12人参与</VListTileActionText>
            <VListTileActionText>18.01.01-18.01.08</VListTileActionText>
          </VListTileAction>
          <VListTileAction :class="$style.icon">
            <VIcon>
              chevron_right
            </VIcon>
          </VListTileAction>
        </VListTile>
        <VDivider
          v-if="index + 1 < items.length"
          :key="index"
        />
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
