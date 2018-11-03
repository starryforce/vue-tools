<script>
import Layout from '@layouts/main'

export default {
  page: {
    title: '订单统计',
    meta: [{ name: 'description', content: 'OrderStatistics' }],
  },
  name: 'OrderStatistics',
  components: { Layout },
  data() {
    return {
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
}
</script>

<template>
  <Layout>
    <VContainer>
      <VCard
        dark
        :color="$style['color-brand-light']"
      >
        <VCardText>
          <VLayout>总计金额（元）</VLayout>
          <VLayout
            justify-space-between
            align-center
          >
            <span>1200.09</span>
            <VBtn
              flat
              left
              large
            >
              <VIcon
                dark
                left
              >
                filter_list
              </VIcon>
              筛选订单
            </VBtn>
          </VLayout>
          <VLayout column>
            <VFlex>现金：198.09元</VFlex>
            <VFlex>微信：198.09元</VFlex>
            <VFlex>支付宝：198.09元</VFlex>
          </VLayout>
        </VCardText>
      </VCard>
    </VContainer>
    <VList two-line>
      <VSubheader>08.09</VSubheader>
      <template v-for="(item, index) in items">
        <VDivider
          v-if="index"
          :key="'divider'+index"
        />
        <VListTile
          :key="item.title"
        >
          <VLayout>
            <VLayout
              column
              :class="$style.subInfo"
            >
              <VChip
                label
                small
                disable
              >
                支付宝
              </VChip>
              <VListTileSubTitle>12:00</VListTileSubTitle>
            </VLayout>
            <VLayout
              column
              justify-space-between
              :class="$style.content"
            >
              <VListTileTitle>{{ item.title }}</VListTileTitle>
              <VListTileSubTitle>{{ item.subtitle }}</VListTileSubTitle>
            </VLayout>
            <VLayout
              column
              justify-space-between
              :class="$style.information"
            >
              <VListTileTitle>- 1929.00元</VListTileTitle>
              <VListTileSubTitle>年糕妈妈</VListTileSubTitle>
            </VLayout>
            <VLayout :class="$style.listAction">
              <VIcon small>
                arrow_forward_ios
              </VIcon>
            </VLayout>
          </VLayout>
        </VListTile>
      </template>
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
:export {
  // stylelint-disable-next-line property-no-unknown
  color-brand-light: $color-brand-light;
}
// stylelint-disable-next-line selector-class-pattern
:global(.v-list__tile) {
  padding: 0 5px;
}
.subInfo {
  flex: none;
  flex-basis: 73px;
  text-align: center;
}
.information {
  flex: none;
  flex-basis: 120px;
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile__title) {
    text-align: right;
  }
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile__sub-title) {
    text-align: right;
  }
}
.listAction {
  flex: none;
  flex-basis: 16px;
}
</style>
