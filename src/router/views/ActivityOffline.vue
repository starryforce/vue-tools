<script>
import Layout from '@layouts/main'

export default {
  page: {
    title: 'ActivityOffline',
    meta: [{ name: 'description', content: 'ActivityOffline' }],
  },
  components: { Layout },
  data() {
    return {
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
        },
      ],
    }
  },
}
</script>

<template>
  <Layout>
    <VList three-line>
      <VSubheader>
        报名中
      </VSubheader>
      <template v-for="(item, index) in items">
        <VDivider
          v-if="index"
          :key="index"
        />

        <VListTile
          :key="item.title"
          avatar
          @click="$router.push('/activity/offline/detail')"
        >
          <VListTileAvatar
            tile
            :class="$style.cover"
          >
            <img
              :class="$style.cover"
              :src="item.avatar"
            >
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>欢庆儿童节宝宝绘画比赛</VListTileTitle>
            <VListTileSubTitle>5000积分</VListTileSubTitle>
            <VListTileSubTitle>2018.12.01截止 18人已报名</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </template>
    </VList>
    <VList three-line>
      <VSubheader>
        已结束
      </VSubheader>
      <template v-for="(item, index) in items">
        <VDivider
          v-if="index"
          :key="index"
        />

        <VListTile
          :key="item.title"
          avatar
        >
          <VListTileAvatar
            tile
            :class="$style.cover"
          >
            <img
              :class="$style.cover"
              :src="item.avatar"
            >
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
