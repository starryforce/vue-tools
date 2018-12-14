<script>
export default {
  name: 'SelectorOrder',
  data() {
    return {
      panel: [true, true, true, true, true],
      radioGroup: 1,
      customSwtich: false,
      beginTimeMenu: false,
      endTimeMenu: false,
      options: {
        orderStatus: '',
        payingType: '',
        postType: '',
        buyerName: '',
        orderNo: '',
        receiverName: '',
        skuName: '',
        skuCode: '',
        receiverPhone: '',
        beginTime: new Date().toISOString().substr(0, 10),
        endTime: new Date().toISOString().substr(0, 10),
      },
      statusOptions: [
        { label: '待支付', value: '0' },
        { label: '待发货', value: '1' },
        { label: '待收货', value: '2' },
        { label: '交易成功', value: '3' },
        { label: '交易关闭', value: '4' },
        { label: '买家删除', value: '5' },
        { label: '退款中', value: '6' },
        { label: '退款成功', value: '7' },
        { label: '拒绝退款', value: '8' },
        { label: '退货成功', value: '9' },
      ],
      payingTypeOptions: [
        { label: '支付宝', value: '0' },
        { label: '微信', value: '1' },
        { label: '现金', value: '2' },
        { label: '银行卡', value: '3' },
      ],
      postTypeOptions: [
        { label: '自提', value: '0' },
        { label: '快递', value: '1' },
        { label: '无需物流', value: '3' },
      ],
    }
  },
  computed: {
    selectedMember() {
      return this.$store.state.order.selectedMember
    },
    dialog: {
      get() {
        return this.$store.state.settings.orderSelector
      },
      set() {
        this.$store.dispatch('settings/triggerOrderSelector')
      },
    },
  },
  methods: {
    selectMember() {
      this.$router.push({ name: 'home-member', params: { scene: 'order' } })
    },
    confirm() {
      this.dialog = false
      this.$emit(
        'fetch:order-options',
        Object.assign({}, this.options, {
          beginTime: this.customSwtich ? this.options.beginTime : '',
          endTime: this.customSwtich ? this.options.endTime : '',
          buyerID: this.selectedMember.id,
        })
      )
    },
  },
}
</script>

<template>
  <VDialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <VBtn
      slot="activator"
      flat
      left
    >
      <VIcon>
        filter_list
      </VIcon>
      筛选订单
    </VBtn>
    <VCard>
      <VToolbar
        card
        dense
        dark
        flat
        color="primary"
      >
        <VBtn
          icon
          dark
          @click.native="dialog = false"
        >
          <VIcon>close</VIcon>
        </VBtn>
        <VToolbarTitle>设置</VToolbarTitle>
        <VSpacer />
        <VToolbarItems>
          <VBtn
            dark
            flat
            @click="confirm"
          >
            确定
          </VBtn>
        </VToolbarItems>
      </VToolbar>
      <VToolbar
        dense
        flat
        @click="selectMember"
      >
        <VToolbarTitle>{{ selectedMember.id?selectedMember.customerName:'选择会员' }}</VToolbarTitle>
        <VSpacer />
        <VToolbarItems @click.stop="$store.dispatch('order/clearMember')">
          <VBtn
            flat
            icon
          >
            <VIcon>close</VIcon>
          </VBtn>
        </VToolbarItems>
      </VToolbar>
      <VContainer>
        <VTextField
          v-model="options.buyerName"
          label="购买人昵称"
        />
        <VTextField
          v-model="options.orderNo"
          label="订单编号"
        />
        <VTextField
          v-model="options.receiverName"
          label="收货人姓名"
        />
        <VTextField
          v-model="options.skuName"
          label="商品名称关键字"
        />
        <VTextField
          v-model="options.skuCode"
          label="商品编码"
        />
        <VTextField
          v-model="options.receiverPhone"
          label="收货人电话"
        />
      </VContainer>

      <VExpansionPanel
        v-model="panel"
        expand
      >
        <VExpansionPanelContent>
          <VLayout slot="header">
            <VFlex>
              订单状态
            </VFlex>
            <VFlex class="text-xs-right">
              全部
            </VFlex>
          </VLayout>
          <VContainer>
            <VRadioGroup
              v-model="options.orderStatus"
              color="primary"
              row
            >
              <VRadio
                v-for="option of statusOptions"
                :key="option.label"
                color="primary"
                :label="option.label"
                :value="option.value"
              />
            </VRadioGroup>
          </VContainer>
        </VExpansionPanelContent>
        <VExpansionPanelContent>
          <VLayout slot="header">
            <VFlex>
              支付方式
            </VFlex>
            <VFlex class="text-xs-right">
              全部
            </VFlex>
          </VLayout>
          <VContainer>
            <VRadioGroup
              v-model="options.payingType"
              color="primary"
              row
            >
              <VRadio
                v-for="option of payingTypeOptions"
                :key="option.label"
                color="primary"
                :label="option.label"
                :value="option.value"
              />
            </VRadioGroup>
          </VContainer>
        </VExpansionPanelContent>
        <VExpansionPanelContent>
          <VLayout slot="header">
            <VFlex>
              发货类型
            </VFlex>
            <VFlex class="text-xs-right">
              全部
            </VFlex>
          </VLayout>
          <VContainer>
            <VRadioGroup
              v-model="options.postType"
              color="primary"
              row
            >
              <VRadio
                v-for="option of postTypeOptions"
                :key="option.label"
                color="primary"
                :label="option.label"
                :value="option.value"
              />
            </VRadioGroup>
          </VContainer>
        </VExpansionPanelContent>
        <VExpansionPanelContent>
          <VLayout
            slot="header"
            justify-space-between
          >
            <VFlex>
              时间选择
            </VFlex>
            <VFlex :class="$style.option">
              全部
            </VFlex>
          </VLayout>
          <VContainer>
            <VSwitch
              v-model="customSwtich"
              label="自定义时间"
            />
            <VLayout v-if="customSwtich">
              <VFlex
                xs6
              >
                <VMenu
                  v-model="beginTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <VTextField
                    slot="activator"
                    v-model="options.beginTime"
                    label="开始时间"
                    prepend-icon="event"
                    readonly
                  />
                  <VDatePicker
                    v-model="options.beginTime"
                    @input="beginTimeMenu = false"
                  />
                </VMenu>
              </VFlex>
              <VFlex
                xs6
              >
                <VMenu
                  v-model="endTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <VTextField
                    slot="activator"
                    v-model="options.endTime"
                    label="截止时间"
                    prepend-icon="event"
                    readonly
                  />
                  <VDatePicker
                    v-model="options.endTime"
                    @input="endTimeMenu = false"
                  />
                </VMenu>
              </VFlex>
            </VLayout>
            <!-- <VRadioGroup
              v-else
              v-model="radioGroup"
            >
              <VRadio
                label="今天"
                value="a"
              />
            </VRadioGroup> -->
          </VContainer>
        </VExpansionPanelContent>
      </VExpansionPanel>
    </VCard>
  </VDialog>
</template>

<style lang="scss" module>
@import '@design';
.option {
  flex: none;
}
</style>
