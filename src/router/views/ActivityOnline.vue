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
      items: [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          title: 'Ali Connors',
          subtitle:
            "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          title: 'me, Scrott, Jennifer',
          subtitle: "Wish I could come, but I'm out of town this weekend.",
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          title: 'Sandra Adams',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          title: 'Trevor Hansen',
          subtitle:
            'Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          title: 'Britta Holt',
          subtitle:
            'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    }
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
          @click="$router.push('/activity/online/detail')"
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
    <VList
      two-line
    >
      <VSubheader>已结束</VSubheader>
      <template v-for="(item, index) in items">
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
