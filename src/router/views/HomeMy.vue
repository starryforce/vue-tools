<script>
import Layout from '@layouts/WithToolBar'

export default {
  metaInfo: {
    title: '销售统计',
    meta: [{ name: 'description', content: 'HomeMy' }],
  },
  components: { Layout },
}
</script>

<template>
  <Layout>
    <VList
      two-line
      :class="$style.nameBoard"
    >
      <VListTile
        avatar
      >
        <VListTileAvatar>
          <img src="">
        </VListTileAvatar>

        <VListTileContent>
          <VListTileTitle>王笑笑</VListTileTitle>
          <VListTileSubTitle>无锡万达店 店长</VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </VList>
    <VContainer
      :class="$style.datas"
      @click="$router.push('/my/statistics')"
    >
      <VSubheader>本月销售数据：</VSubheader>
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
    <VList>
      <VListTile>
        <VListTileContent>
          <VListTileTitle>个人信息</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          <VIcon>chevron_right</VIcon>
        </VListTileAction>
      </VListTile>
      <VDivider />
      <VListTile>
        <VListTileContent>
          <VListTileTitle>额度管理</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          <VIcon>chevron_right</VIcon>
        </VListTileAction>
      </VListTile>
      <VDivider />
      <VListTile>
        <VListTileContent>
          <VListTileTitle>意见反馈</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          <VIcon>chevron_right</VIcon>
        </VListTileAction>
      </VListTile>
      <VDivider />
      <VListTile>
        <VListTileContent>
          <VListTileTitle>我的影子店</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          <VIcon>chevron_right</VIcon>
        </VListTileAction>
      </VListTile>
      <VDivider />
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.datas {
  color: #fff;
  text-align: center;
  background-color: $color-brand-light;
}
.nameBoard {
  padding: 0;
  background-color: $color-brand-light !important;
}
</style>
