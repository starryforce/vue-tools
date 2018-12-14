<script>
import Layout from '@layouts/MainLayout'

export default {
  metaInfo: {
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
      list1: [],
      list2: [],
    }
  },
  created() {
    this.getlist1()
  },
  methods: {
    async getlist1() {
      this.list1 = Object.assign(
        {},
        (await this.$api.order.getReturnOrders({ state: 0 })).data
      )
    },
    async getlist2() {
      this.list2 = Object.assign(
        {},
        (await this.$api.order.getReturnOrders({ state: 3 })).data
      )
    },
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
      <VTab @click="getlist1">
        审核
      </VTab>
      <VTab @click="getlist2">
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
            v-for="(item) in list1"
            :key="item.info.id"
            :class="$style.orderContainer"
            @click="$router.push('/order/return/detail/'+item.info.id)"
          >
            <VLayout>
              <VFlex>
                退单号：{{ item.info.returnOrderNo }}
              </VFlex>
              <VSpacer />
              <VFlex>
                {{ item.info.time }}
              </VFlex>
            </VLayout>
            <VLayout>
              <VFlex>
                用户：{{ item.info.receiverPhone }}
              </VFlex>
              <VSpacer />
              <VFlex>
                {{ item.info.payType }}
              </VFlex>
            </VLayout>
            <VDivider />
            <VContainer>
              <VLayout
                v-for="it in item.detailList"
                :key="it.skuName "
              >
                <VFlex xs2>
                  <VImg
                    :src="it.picUrl || ''"
                    :lazy-src="it.picUrl || ''"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  />
                </VFlex>
                <VFlex
                  xs9
                  offset-xs1
                >
                  {{ it.skuName }}
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
            v-for="(item) in list2"
            :key="item.info.id"
            :class="$style.orderContainer"
            @click="$router.push('/order/return/detail/'+id)"
          >
            <VLayout>
              <VFlex>
                退单号：{{ item.info.returnOrderNo }}
              </VFlex>
              <VSpacer />
              <VFlex>
                {{ item.info.time }}
              </VFlex>
            </VLayout>
            <VLayout>
              <VFlex>
                用户：{{ item.info.receiverPhone }}
              </VFlex>
              <VSpacer />
              <VFlex>
                {{ item.info.payType }}
              </VFlex>
            </VLayout>
            <VDivider />
            <VContainer>
              <VLayout
                v-for="it in item.detailList"
                :key="it.skuName "
              >
                <VFlex xs2>
                  <VImg
                    :src="it.picUrl || ''"
                    :lazy-src="it.picUrl || ''"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  />
                </VFlex>
                <VFlex
                  xs9
                  offset-xs1
                >
                  {{ it.skuName }}
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
