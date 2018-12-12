<script>
import Layout from '@layouts/MainLayout'
import EmployeeCard from './components/EmployeeCard'

export default {
  metaInfo: {
    title: '额度分配',
    meta: [{ name: 'description', content: '额度分配' }],
  },
  name: 'LimitManage',
  components: { Layout, EmployeeCard },
  data() {
    return {
      total: 16000,
      remain: 5000,
    }
  },
}
</script>

<template>
  <Layout>
    <VContainer :class="$style.header">
      <VLayout>
        <VFlex xs6>
          <p :class="$style.itemName">
            {{ total }}
          </p>
          <p :class="$style.itemValue">
            本月总额度
          </p>
        </VFlex>
        <VFlex xs6>
          <p :class="[$style.itemName,$style.rightItemName]">
            {{ remain }}
          </p>
          <p :class="$style.itemValue">
            剩余额度
          </p>
        </VFlex>
      </VLayout>
    </VContainer>
    <EmployeeCard :remain="remain" />
  </Layout>
</template>


<style lang="scss" module>
@import '@design';

.header {
  background-color: $color-brand-light;
}
.itemName {
  font-size: 30px;
  font-weight: 400;
  color: #fff;
  text-align: center;
}
.rightItemName {
  border-left: solid white 1px;
}
.itemValue {
  font-size: 12px;
  color: #fff;
  text-align: center;
}
</style>
