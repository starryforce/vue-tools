<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: '线下活动详情',
    meta: [{ name: 'description', content: '线下活动详情' }],
  },
  name: 'ActivityOfflineDetail',
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
      alertVisible: null,
      alertText: '',
      alertType: 'info',
    }
  },
  async created() {
    const memberID = this.$store.state.activity.memberSigning.id
    if (memberID) {
      const result = (await this.$api.activity.pointExchange({
        activityID: this.id,
        memberID,
      })).data
      if (result.hasOwnProperty('False')) {
        this.alertText = result.False
        this.alertType = 'warning'
      } else if (result.hasOwnProperty('True')) {
        this.alertText = result.True
        this.alertType = 'success'
      }
      this.alertVisible = true
      setTimeout(() => (this.alertVisible = null), 2000)
      this.$store.dispatch('activity/clearMember')
    }
    var res = await this.$api.activity.getOfflineActivityDetail(this.id)
    this.detail = Object.assign({}, res.data)
  },
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
            :src="detail.activePicPath"
          >
        </VListTileAvatar>

        <VListTileContent>
          <VListTileTitle>{{ detail.integralActiveName }}</VListTileTitle>
          <VListTileSubTitle>{{ detail.consumptionIntegral }}积分</VListTileSubTitle>
          <VListTileSubTitle>{{ detail.registrationTime }}截止 {{ detail.participateCount }}人已报名</VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </VList>
    <VList>
      <VListTile>
        <VListTileContent>
          <VListTileTitle>活动时间:</VListTileTitle>
        </VListTileContent>
        <VListTileAction>{{ detail.registrationTime | date }} - {{ detail.endTime | date }}</VListTileAction>
      </VListTile>
      <VDivider />
      <VListTile>
        <VListTileContent>
          <VListTileTitle>名额限制</VListTileTitle>
        </VListTileContent>
        <VListTileAction>{{ detail.storeNum }}人</VListTileAction>
      </VListTile>
      <VDivider />
    </VList>
    <VSubheader>会员列表（{{ detail.participateCount }}）</VSubheader>
    <VContainer
      fluid
      grid-list-lg
    >
      <VLayout
        row
        wrap
      >
        <VFlex
          xs3
          @click="$router.push({name:'home-member',params:{scene:'offline'}})"
        >
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
          v-for="i in detail.listcustomers"
          :key="i.integralActiveId"
          xs3
        >
          <VAvatar :size="$style['width-avatar']">
            <img
              :src="i.picUrl"
              alt="lorem"
              class="image"
              height="100%"
              width="100%"
            >
          </VAvatar>
          <p :class="$style.memberName">
            {{ i.buyerNick }}
          </p>
        </VFlex>
      </VLayout>
    </VContainer>
    <VAlert
      :class="$style.alert"
      :value="alertVisible"
      :type="alertType"
      dismissible
      transition="scale-transition"
    >
      {{ alertText }}
    </VAlert>
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
.alert {
  position: absolute;
  top: 48px;
  z-index: $layer-popover-z-index;
  width: 100%;
}
</style>
