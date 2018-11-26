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
      <template v-for="(label, index) in labelList">
        <VDivider
          v-if="index"
          :key="'divider'+label.id"
        />
        <VListTile
          :key="label.id"
          :to="{name:'member-label-edit',params:{id:label.id}}"
        >
          <VListTileContent>
            <VListTileTitle>{{ label.labelName }}</VListTileTitle>
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
        color="primary"
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
.button {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
