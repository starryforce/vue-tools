<script>
/* eslint-disable */
import Layout from '@layouts/WithToolBar'

export default {
  metaInfo: {
    title: 'ActivityOfflineDetail',
    meta: [{ name: 'description', content: 'ActivityOfflineDetail' }],
  },
  components: { Layout },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      detail: {},
    }
  },
  async created() {
    var res = await this.$api.activity.getOfflineActivityDetail(this.id)
    this.detail = Object.assign({}, res.data)
  },
}
</script>

<template>
  <Layout>
    <VList three-line>
      <VListTile :class="$style.info">
        <VListTileAvatar tile :class="$style.cover">
          <img :class="$style.cover" :src="detail.activePicPath">
        </VListTileAvatar>

        <VListTileContent>
          <VListTileTitle>{{detail.integralActiveName}}</VListTileTitle>
          <VListTileSubTitle>{{detail.consumptionIntegral}}积分</VListTileSubTitle>
          <VListTileSubTitle>{{detail.endTime}}截止 {{detail.participateCount}}人已报名</VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </VList>
    <VList>
      <VListTile>
        <VListTileContent>
          <VListTileTitle>活动时间</VListTileTitle>
        </VListTileContent>
        <VListTileAction>{{detail.startTime}}-{{detail.endTime}}</VListTileAction>
      </VListTile>
      <VDivider/>
      <VListTile>
        <VListTileContent>
          <VListTileTitle>名额限制</VListTileTitle>
        </VListTileContent>
        <VListTileAction>{{detail.participateCount}}人</VListTileAction>
      </VListTile>
      <VDivider/>
    </VList>
    <VSubheader>会员列表（0）</VSubheader>
    <VContainer fluid grid-list-lg>
      <VLayout row wrap>
        <VFlex xs3>
          <VAvatar color="primary" :size="$style['width-avatar']">
            <VIcon dark>person_add</VIcon>
          </VAvatar>
          <p :class="$style.memberName">代客报名</p>
        </VFlex>
        <VFlex v-for="i in detail.listcustomers" :key="i.integralActiveId" xs3>
          <VAvatar :size="$style['width-avatar']">
            <img :src="i.picUrl" alt="lorem" class="image" height="100%" width="100%">
          </VAvatar>
          <p :class="$style.memberName">{{ i.buyerNick }}</p>
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
