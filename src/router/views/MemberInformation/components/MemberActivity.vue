<script>
export default {
  name: 'MemberActivity',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activityList: () => {},
    }
  },
  async created() {
    this.activityList = (await this.$api.member.getActivityList(this.id)).data
  },
}
</script>

<template>
  <VList three-line>
    <template v-for="(activity,index) of activityList">
      <VDivider
        v-if="index"
        :key="'divider'+activity.activePicPath +activity.integralActiveName"
        inset
      />
      <VListTile
        :key="activity.activePicPath+activity.integralActiveName"
        avatar
        @click="toggle(index)"
      >
        <VListTileAvatar>
          <VImg
            :src="activity.activePicPath || ''"
            :lazy-src="activity.activePicPath || ''"
            aspect-ratio="2"
          >
            <VLayout
              slot="placeholder"
              fill-height
              align-center
              justify-center
              ma-0
            >
              <VProgressCircular
                indeterminate
                color="grey lighten-5"
              />
            </VLayout>
          </VImg>
        </VListTileAvatar>
        <VListTileContent>
          <VListTileTitle>
            <VChip
              small
              label
              color="secondary"
              text-color="#fff"
            >
              {{ activity.activeState }}
            </VChip>
            {{ activity.integralActiveName }}
          </VListTileTitle>
          <VListTileSubTitle>
            {{ activity.storeName }}
          </VListTileSubTitle>
          <VListTileSubTitle>
            {{ activity.startTime }} - {{ activity.endTime }}
          </VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </template>
  </VList>
</template>

<style lang="scss" module>
@import '@design';
</style>
