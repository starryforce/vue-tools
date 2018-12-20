<script>
import Layout from '@layouts/SubLayout'

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
      this.labelList = (await this.$api.label.getLabelList()).data
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
              {{ label.boundNum }}
              <VIcon color="grey lighten-1">
                chevron_right
              </VIcon>
            </VBtn>
          </VListTileAction>
        </VListTile>
      </template>
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
</style>
