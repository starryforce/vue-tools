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
      list: [],
    }
  },
  computed: {
    total() {
      var sum = 0
      this.list.forEach(element => {
        sum += element.assignAmount
      })
      return sum
    },
    remain() {
      var sum = 0
      this.list.forEach(element => {
        sum += element.currentAssignAmount
      })
      return sum
    },
  },
  async created() {
    this.list = (await this.$api.employee.getEmpleeAssignAmounts()).data
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
    <EmployeeCard
      v-for="it in list"
      :key="it.id"
      :remain="it.currentAssignAmount"
      :max="remain"
      :old="it.assignAmount"
      :name="it.name"
    />
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
