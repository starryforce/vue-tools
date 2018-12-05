<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: 'ActivityOnlineDetail',
    meta: [{ name: 'description', content: 'ActivityOnlineDetail' }],
  },
  components: { Layout },
}
</script>

<template>
  <Layout>
    <VList>
      <VListTile>
        <VListTileContent>
          <VListTileTitle>
            <VChip
              small
              label
            >
              特价
            </VChip> 新年特价活动
          </VListTileTitle>
        </VListTileContent>
      </VListTile>
      <VDivider />
      <VListTile>
        <VListTileContent>
          <VListTileTitle>活动时间</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          18.01.01-18.01.08
        </VListTileAction>
      </VListTile>
      <VDivider />
      <VListTile>
        <VListTileContent>
          <VListTileTitle>活动内容</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          商品特价
        </VListTileAction>
      </VListTile>
      <VDivider />
      <VListTile>
        <VListTileContent>
          <VListTileTitle>参与人数</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          76
        </VListTileAction>
        <VListTileAction>
          <VIcon>chevron_right</VIcon>
        </VListTileAction>
      </VListTile>
      <VDivider />
      <VListTile>
        <VListTileContent>
          <VListTileTitle>活动商品</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          208
        </VListTileAction>
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
</style>
