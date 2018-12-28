<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: '销售统计',
    meta: [{ name: 'description', content: 'HomeMy' }],
  },
  name: 'HomeMy',
  components: { Layout },
  data() {
    return {
      detail: {
        kpiDetail: {},
        role: [],
      },
    }
  },
  created() {
    this.getEmployeeDetail()
  },
  methods: {
    async getEmployeeDetail() {
      this.detail = (await this.$api.employee.getGuideEmployeeDetail()).data
      this.detail.kpiDetail = this.detail.kpiDetail || { month: '本' }
    },
  },
}
</script>

<template>
  <Layout>
    <VList
      two-line
      dark
      :class="$style.nameBoard"
    >
      <VListTile
        avatar
      >
        <VListTileAvatar>
          <VImg src="" />
        </VListTileAvatar>

        <VListTileContent>
          <VListTileTitle>{{ detail.employeeName }}</VListTileTitle>
          <VListTileSubTitle>
            {{ detail.storeName }}
            {{ detail.role? detail.role.join(' '):'' }}
          </VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </VList>
    <VContainer
      v-if="detail.kpiDetail"
      :class="$style.datas"
      @click="$router.push('/my/statistics')"
    >
      <VSubheader dark>
        {{ detail.kpiDetail.month }}月业绩：
      </VSubheader>
      <VLayout>
        <VFlex xs4>
          {{ parseInt(detail.kpiDetail.currentSalesAmount / detail.kpiDetail.salesAmount *1000)/10 ||0 }}%
        </VFlex>
        <VFlex xs4>
          {{ parseInt(detail.kpiDetail.currentCustomerCount / detail.kpiDetail.customerCount *1000)/10 ||0 }}%
        </VFlex>
        <VFlex xs4>
          {{ parseInt(detail.kpiDetail.currentRepurchaseCount / detail.kpiDetail.repurchaseCount *1000)/10 ||0 }}%
        </VFlex>
      </VLayout>
      <VLayout>
        <VFlex xs4>
          销售业绩
        </VFlex>
        <VFlex xs4>
          会员发展
        </VFlex>
        <VFlex xs4>
          会员复购
        </VFlex>
      </VLayout>
    </VContainer>
    <VList>
      <VListTile :to="{name:'my-information'}">
        <VListTileContent>
          <VListTileTitle>个人信息</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          <VIcon>chevron_right</VIcon>
        </VListTileAction>
      </VListTile>
      <VDivider />
      <VListTile :to="{name:'limit-manage'}">
        <VListTileContent>
          <VListTileTitle>额度管理</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          <VIcon>chevron_right</VIcon>
        </VListTileAction>
      </VListTile>
      <VDivider />
      <!-- <VListTile>
        <VListTileContent>
          <VListTileTitle>意见反馈</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          <VIcon>chevron_right</VIcon>
        </VListTileAction>
      </VListTile>
      <VDivider />
      <VListTile>
        <VListTileContent>
          <VListTileTitle>我的影子店</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          <VIcon>chevron_right</VIcon>
        </VListTileAction>
      </VListTile>
      <VDivider /> -->
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
