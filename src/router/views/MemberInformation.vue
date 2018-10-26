<script>
import Layout from '@layouts/WithToolBar'

export default {
  page: {
    title: '会员信息',
    meta: [{ name: 'MemberInformation', content: 'MemberInformation' }],
  },
  components: { Layout },
  data() {
    return {
      item: {
        headline: '年糕妈妈',
        title: '超级会员',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      },
      active: null,
      tabs: ['基础信息', '消费统计', '订单列表', '会员资产', '活动参与'],
      information: {
        name: '王丽丽',
        nickName: '年糕的妈妈',
        memberCard: 'WX938913',
        mobile: '18900000000',
        registerTime: '2017-12-08',
        shop: '无锡惠山万达店',
        saler: '李笑笑',
        tags: '精明型、土豪',
        relationship: '孙梓豪',
        face: '已识别',
      },
    }
  },

  methods: {
    toggle(index) {},
    next() {
      const active = parseInt(this.active)
      this.active = active < 2 ? active + 1 : 0
    },
  },
}
</script>

<template>
  <Layout>
    <VList
      :class="$style.nameBoard"
      two-line
      dark
    >
      <VListTile
        :key="item.title"
        avatar
        @click="toggle(index)"
      >
        <VListTileAvatar>
          <img :src="item.avatar">
        </VListTileAvatar>
        <VListTileContent>
          <VListTileTitle>{{ item.title }}</VListTileTitle>
          <VListTileSubTitle>
            {{ item.headline }}
          </VListTileSubTitle>
        </VListTileContent>

        <VListTileAction>
          <VIcon
            color="grey lighten-1"
          >
            edit
          </VIcon>
        </VListTileAction>
      </VListTile>
    </VList>
    <VTabs
      v-model="active"
      :class="$style.tabs"
      :color="$style['color-brand-light']"
      dark
      grow
      centered
      slider-color="white"
    >
      <VTab
        v-for="tabName in tabs"
        :key="tabName"
        ripple
      >
        {{ tabName }}
      </VTab>
    </VTabs>
    <VTabsItems v-model="active">
      <VTabItem
        v-for="tab in tabs"
        :key="tab"
      >
        <VCard>
          <VCardText>
            {{ tab }}
          </VCardText>
        </VCard>
      </VTabItem>
    </VTabsItems>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
:export {
  width-avatar: 20vw;
  color-brand-light: $color-brand-light;
}
.nameBoard.nameBoard {
  background-color: $color-brand-light;
}

.tabs {
  :global(.v-tabs__item) {
    padding-right: 0;
    padding-left: 0;
  }
}
</style>
