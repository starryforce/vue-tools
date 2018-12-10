<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: '当日到店',
    meta: [{ name: 'description', content: '当日到店' }],
  },
  components: { Layout },
  data() {
    return {
      faceList: [],
    }
  },
  created() {
    this.todayFaceList()
  },
  methods: {
    async todayFaceList() {
      this.faceList = (await this.$api.face.todayFaceList()).data
    },
  },
}
</script>

<template>
  <Layout>
    <VList two-line>
      <template v-for="(face, index) in faceList">
        <VDivider
          v-if="index"
          :key="index"
        />

        <VListTile
          :key="face.title"
          avatar
          @click="$router.push({name:'member-today'})"
        >
          <VListTileAvatar>
            <img :src="face.avatar">
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>
              123456
            </VListTileTitle>
            <VListTileSubTitle>
              123456
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </template>
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
</style>
