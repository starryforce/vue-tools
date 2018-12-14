<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: 'MyStatistics',
    meta: [{ name: 'description', content: 'MyStatistics' }],
  },
  components: { Layout },
}
</script>

<template>
  <Layout>
    <VToolbar
      dense
      flat
    >
      <VToolbarSideIcon>
        <VBtn icon>
          <VIcon>chevron_left</VIcon>
        </VBtn>
      </VToolbarSideIcon>
      <VSpacer />
      <VToolbarTitle />
      <VSpacer />
      <VToolbarItems>
        <VBtn icon>
          <VIcon>chevron_right</VIcon>
        </VBtn>
      </VToolbarItems>
    </VToolbar>
    <VContainer
      :class="$style.datas"
    >
      <VLayout>
        <VFlex xs4>
          13000
        </VFlex>
        <VFlex xs4>
          188
        </VFlex>
        <VFlex xs4>
          18%
        </VFlex>
      </VLayout>
      <VLayout>
        <VFlex xs4>
          销售业绩
        </VFlex>
        <VFlex xs4>
          会员发展
        </VFlex>
        <VFlex xs4>
          业绩考核
        </VFlex>
      </VLayout>
    </VContainer>
    <VCard><VImg src="" /></VCard>
    <VList>
      <VSubheader>每日销售额</VSubheader>
      <template v-for="(item,index) of 10">
        <VDivider
          v-if="index"
          :key="'divider'+ item"
        />
        <VListTile :key="item">
          <VListTileContent>
            <VListTileTitle>09-08</VListTileTitle>
          </VListTileContent>
          <VListTileAction>
            <VListTileActionText>
              ¥ 1200.80
            </VListTileActionText>
          </VListTileAction>
        </VListTile>
      </template>
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.datas {
  color: $color-brand-light;
  text-align: center;
}
</style>
