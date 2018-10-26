<script>
import Layout from '@layouts/main'
import SelectorMember from '@components/SelectorMember'

export default {
  page: {
    title: '会员',
    meta: [{ name: 'member', content: 'HomeMember' }],
  },
  components: { Layout, SelectorMember },
  data() {
    return {
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: '年糕妈妈1',
          subtitle: '18888888888',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: '年糕妈妈2',
          subtitle: '18888888888',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: '年糕妈妈3',
          subtitle: '18888888888',
        },
      ],
    }
  },
}
</script>

<template>
  <Layout>
    <SelectorMember />
    <VLayout :class="$style.operations">
      <VFlex>
        <VBtn
          flat
          dark
        >
          <VIcon
            light
            small
          >
            person_add
          </VIcon>
          会员邀请
        </VBtn>
      </VFlex>
      <VFlex>
        <VBtn
          flat
          dark
        >
          <VIcon
            light
            small
          >
            print
          </VIcon>
          扫会员码
        </VBtn>
      </VFlex>
      <VFlex>
        <VBtn
          flat
          dark
          to="/member/label"
        >
          <VIcon
            light
            small
          >
            loyalty
          </VIcon>
          标签会员
        </VBtn>
      </VFlex>
    </VLayout>
    <VList two-line>
      <template v-for="(item, index) in items">
        <VDivider
          v-if="item.divider"
          :key="index"
          :inset="item.inset"
        />

        <VListTile
          v-else
          :key="item.title"
          avatar
        >
          <VListTileAvatar>
            <img :src="item.avatar">
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>{{ item.title }}</VListTileTitle>
            <VListTileSubTitle>{{ item.subtitle }}</VListTileSubTitle>
          </VListTileContent>
          <VListTileAction>
            <VLayout>
              <VFlex>
                <VBtn
                  icon
                  ripple
                >
                  <VIcon
                    large
                    color="grey lighten-1"
                  >
                    account_circle
                  </VIcon>
                </VBtn>
              </VFlex>

              <VFlex>
                <VBtn
                  icon
                  ripple
                >
                  <VIcon
                    large
                    color="grey lighten-1"
                  >
                    account_circle
                  </VIcon>
                </VBtn>
              </VFlex>
            </VLayout>
          </VListTileAction>
        </VListTile>
      </template>
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.operations {
  background-color: $color-brand-light;
}
</style>
