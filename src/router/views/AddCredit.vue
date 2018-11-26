<script>
import Layout from '@layouts/WithToolBar'

export default {
  metaInfo: {
    title: '会员储值',
    meta: [{ name: 'description', content: '会员储值' }],
  },
  name: 'AddCredit',
  components: { Layout },
  props: {
    id: {
      type: String,
      default: '2',
    },
  },
  data() {
    return {
      value: 5,
      payment: 'cash',
    }
  },
  created() {},
  methods: {},
}
</script>

<template>
  <Layout>
    <VCard>
      <VCardTitle>
        <VItemGroup
          v-model="value"
          mandatory
        >
          <VSubheader>充值金额：</VSubheader>
          <VContainer
            fluid
            grid-list-md
          >
            <VLayout wrap>
              <VFlex
                v-for="i in 6"
                :key="i"
                xs6
              >
                <VItem>
                  <VBtn
                    slot-scope="{ active, toggle }"
                    :input-value="active"
                    :class="$style.options"
                    block
                    @click="toggle"
                  >
                    {{ i*1000 }}元
                  </VBtn>
                </VItem>
              </VFlex>
            </VLayout>
          </VContainer>
          <VRadioGroup
            v-model="payment"
            :mandatory="false"
          >
            <VRadio
              label="微信支付"
              value="weixin"
            />
            <VRadio
              label="支付宝支付"
              value="alipay"
            />
            <VRadio
              label="现金支付"
              value="cash"
            />
          </VRadioGroup>
        </VItemGroup>
      </VCardTitle>
    </VCard>
    <VBtn
      :class="$style.button"
      block
      color="primary"
      dark
      fixed
    >
      充值
    </VBtn>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.button {
  bottom: 0;
}
</style>
