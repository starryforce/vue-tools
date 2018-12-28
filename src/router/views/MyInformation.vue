<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: '个人信息',
    meta: [{ name: 'description', content: '个人信息' }],
  },
  name: 'MyInformation',
  components: { Layout },
  data() {
    return {
      information: {},
    }
  },
  created() {
    this.getEmployeeDetail()
  },
  methods: {
    async getEmployeeDetail() {
      this.information = (await this.$api.employee.getGuideEmployeeDetail()).data
    },
  },
}
</script>

<template>
  <Layout>
    <VList>
      <VListTile>
        <VListTileContent>
          <VListTileTitle>头像</VListTileTitle>
        </VListTileContent>
        <VListTileAvatar avatar>
          <img :src="information.wxHeadImgUrl || ''">
        </VListTileAvatar>
      </VListTile>
      <VDivider />
      <VListTile>
        <VListTileContent>
          <VListTileTitle>姓名</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          {{ information.employeeName }}
        </VListTileAction>
      </VListTile>
      <VDivider />
      <VListTile>
        <VListTileContent>
          <VListTileTitle>所属门店</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          {{ information.storeName }}
        </VListTileAction>
      </VListTile>
      <VDivider />
      <VListTile>
        <VListTileContent>
          <VListTileTitle>岗位</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          {{ information.role && information.role.join('、') }}
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
  background-color: #57c5c2;
}
.nameBoard {
  padding: 0;
  color: #fff;
  background-color: #57c5c2 !important;
}
</style>
