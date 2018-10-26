<script>
import Layout from '@layouts/WithToolBar'

export default {
  page: {
    title: '会员标签',
    meta: [{ name: 'MemberLabelAdd', content: 'MemberLabelAdd' }],
  },
  components: { Layout },
}
</script>

<template>
  <Layout>
    <VContainer>
      <VFlex>
        <VTextField
          label="标签名称"
          outline
        />
      </VFlex>
    </VContainer>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
</style>
