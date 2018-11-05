<script>
import Layout from '@layouts/main'

export default {
  page: {
    title: '退单列表',
    meta: [{ name: 'description', content: 'OrderReturn' }],
  },
  name: 'OrderReturn',
  components: { Layout },
  data() {
    return {
      tab: 0,
      items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        },
        { divider: true, inset: true },
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
    <VTabs
      v-model="tab"
      grow
      :active-class="$style.activeTab"
    >
      <VTab>
        审核
      </VTab>
      <VTab>
        收货
      </VTab>
    </VTabs>
    <VTabsItems v-model="tab">
      <VTabItem>
        <VList subheader>
          <VSubheader>
            待审核
          </VSubheader>
          <VContainer
            v-for="(item) in items"
            :key="item.title"
            :class="$style.orderContainer"
            @click="$router.push('/order/return/detail')"
          >
            <VLayout>
              <VFlex>
                退单号：VX902324356
              </VFlex>
              <VSpacer />
              <VFlex>
                2018-09-09 12:00
              </VFlex>
            </VLayout>
            <VDivider />
            <VContainer>
              <VLayout>
                <VFlex xs2>
                  <VImg
                    :src="item.cover"
                    :lazy-src="item.cover"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  />
                </VFlex>
                <VFlex
                  xs9
                  offset-xs1
                >
                  尤妮佳（Moony）纸尿裤 L68片（9-14kg）大号婴儿尿不湿
                </VFlex>
              </VLayout>
            </VContainer>
          </VContainer>
        </VList>
      </VTabItem>
      <VTabItem>
        <VList subheader>
          <VSubheader>
            待收货
          </VSubheader>
          <VContainer
            v-for="(item) in items"
            :key="item.title"
            :class="$style.orderContainer"
            @click="$router.push('/order/return/detail')"
          >
            <VLayout>
              <VFlex>
                退单号：VX902324356
              </VFlex>
              <VSpacer />
              <VFlex>
                2018-09-09 12:00
              </VFlex>
            </VLayout>
            <VDivider />
            <VContainer>
              <VLayout>
                <VFlex xs2>
                  <VImg
                    :src="item.cover"
                    :lazy-src="item.cover"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  />
                </VFlex>
                <VFlex
                  xs9
                  offset-xs1
                >
                  尤妮佳（Moony）纸尿裤 L68片（9-14kg）大号婴儿尿不湿
                </VFlex>
              </VLayout>
            </VContainer>
          </VContainer>
        </VList>
      </VTabItem>
    </VTabsItems>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.orderContainer {
  padding-top: 0;
}
.activeTab {
  color: $color-brand;
}
</style>
