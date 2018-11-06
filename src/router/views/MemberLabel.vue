<script>
import Layout from '@layouts/WithToolBar'

export default {
  metaInfo: {
    title: '标签会员',
    meta: [{ name: 'description', content: 'MemberLabel' }],
  },
  components: { Layout },
  data() {
    return {
      labelList: [],
    }
  },
  created() {
    this.getLabelList()
  },
  methods: {
    async getLabelList() {
      this.labelList = (await this.$api.member.getLabelList()).data
    },
  },
}
</script>

<template>
  <Layout :class="$style.container">
    <VList>
      <template v-for="(item, index) in labelList">
        <VDivider
          v-if="index"
          :key="index"
        />
        <VListTile
          :key="index+100"
          to="/member/label/edit"
        >
          <VListTileContent>
            <VListTileTitle>{{ item.title }}</VListTileTitle>
          </VListTileContent>
          <VListTileAction>
            <VBtn
              icon
              ripple
            >
              <VIcon color="grey lighten-1">
                chevron_right
              </VIcon>
            </VBtn>
          </VListTileAction>
        </VListTile>
      </template>
    </VList>

    <VLayout :class="$style.button">
      <VBtn
        :color="$style['color-brand-light']"
        dark
        block
        large
        to="/member/label/add"
      >
        新增标签
      </VBtn>
    </VLayout>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
:export {
  // stylelint-disable-next-line property-no-unknown
  color-brand-light: $color-brand-light;
}
.button {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
