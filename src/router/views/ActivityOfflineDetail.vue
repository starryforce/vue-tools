<script>
import Layout from '@layouts/WithToolBar'

export default {
  metaInfo: {
    title: 'ActivityOfflineDetail',
    meta: [{ name: 'description', content: 'ActivityOfflineDetail' }],
  },
  components: { Layout },
}
</script>

<template>
  <Layout>
    <VList three-line>
      <VListTile :class="$style.info">
        <VListTileAvatar
          tile
          :class="$style.cover"
        >
          <img
            :class="$style.cover"
            :src="avatar"
          >
        </VListTileAvatar>

        <VListTileContent>
          <VListTileTitle>欢庆儿童节宝宝绘画比赛</VListTileTitle>
          <VListTileSubTitle>¥ 200</VListTileSubTitle>
          <VListTileSubTitle>2018.12.01截止 18人已报名</VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </VList>
    <VList>
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
          <VListTileTitle>名额限制</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          20人
        </VListTileAction>
      </VListTile>
      <VDivider />
    </VList>
    <VSubheader>会员列表（0）</VSubheader>
    <VContainer
      fluid
      grid-list-lg
    >
      <VLayout
        row
        wrap
      >
        <VFlex xs3>
          <VAvatar
            color="primary"
            :size="$style['width-avatar']"
          >
            <VIcon dark>
              person_add
            </VIcon>
          </VAvatar>
          <p :class="$style.memberName">
            代客报名
          </p>
        </VFlex>
        <VFlex
          v-for="i in 6"
          :key="i"
          xs3
        >
          <VAvatar :size="$style['width-avatar']">
            <img
              :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`"
              alt="lorem"
              class="image"
              height="100%"
              width="100%"
            >
          </VAvatar>
          <p :class="$style.memberName">
            {{ i }}
          </p>
        </VFlex>
      </VLayout>
    </VContainer>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
:export {
  // stylelint-disable property-no-unknown
  width-avatar: 20vw;
  color-button-danger: $color-button-danger;
}
.info {
  min-height: 110px;
}
.cover {
  width: 140px !important;
  height: 80px !important;
  padding-right: 10px;
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-avatar--tile) {
    width: 140px !important;
    height: 100px !important;
  }
}
.memberName {
  font-size: 14px;
  color: $color-brand-light;
  text-align: center;
}
</style>
