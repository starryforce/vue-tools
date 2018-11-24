<script>
import Layout from '@layouts/WithToolBar'

export default {
  metaInfo: {
    title: '销售统计',
    meta: [{ name: 'description', content: 'HomeMy' }],
  },
  components: { Layout },
  data() {
    return {
      detail: {
        employeeId: '00050037',
        employeeName: '陶阳春',
        storeId: '000508010103',
        storeName: '江苏南京雨花区紫荆广场店',
        role: ['店主', '店长'],
        lastAssignAmount: 8866,
        totalAssignAmount: 8866,
        kpiDetail: {
          month: 11,
          currentSalesAmount: 0,
          salesAmount: 36001,
          currentCustomerCount: 0,
          customerCount: 120,
          currentRepurchaseCount: 0,
          repurchaseCount: 0,
          currentActivationCount: 0,
          activationCount: 0,
        },
      },
    }
  },
  async created() {
    let res = await this.$api.employee.getGuideEmployeeDetail()
    this.detail = Object.assign({}, res.data)
  },
}
</script>

<template>
  <Layout>
    <VList
      two-line
      :class="$style.nameBoard"
    >
      <VListTile
        avatar
      >
        <VListTileAvatar>
          <img src="">
        </VListTileAvatar>

        <VListTileContent>
          <VListTileTitle>{{ detail.employeeName }}</VListTileTitle>
          <VListTileSubTitle>{{ detail.storeName }} {{ detail.role.join(' ') }}</VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </VList>
    <VContainer
      :class="$style.datas"
      @click="$router.push('/my/statistics')"
    >
      <VSubheader>{{ detail.kpiDetail.month }}月业绩：</VSubheader>
      <VLayout>
        <VFlex xs4>
          {{ parseInt(detail.kpiDetail.currentSalesAmount / detail.kpiDetail.salesAmount *1000)/10 }}%
        </VFlex>
        <VFlex xs4>
          {{ parseInt(detail.kpiDetail.currentCustomerCount / detail.kpiDetail.customerCount *1000)/10 }}%
        </VFlex>
        <VFlex xs4>
          {{ parseInt(detail.kpiDetail.currentRepurchaseCount / detail.kpiDetail.repurchaseCount *1000)/10 }}%
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
      <VListTile>
        <VListTileContent>
          <VListTileTitle>个人信息</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          <VIcon>chevron_right</VIcon>
        </VListTileAction>
      </VListTile>
      <VDivider />
      <VListTile>
        <VListTileContent>
          <VListTileTitle>额度管理</VListTileTitle>
        </VListTileContent>
        <VListTileAction>
          <VIcon>chevron_right</VIcon>
        </VListTileAction>
      </VListTile>
      <VDivider />
      <VListTile>
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
      <VDivider />
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.datas {
  color: #fff;
  text-align: center;
  background-color: $color-brand-light;
}
.nameBoard {
  padding: 0;
  background-color: $color-brand-light !important;
}
</style>
