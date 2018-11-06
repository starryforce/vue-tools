<script>
export default {
  name: 'SelectorOrder',
  data() {
    return {
      dialog: true,
      panel: [true, true, true, true],
      selected: ['a', 'b', 'c', 'd'],
      radioGroup: 1,
      paymentType: [],
      notifications: false,
      sound: true,
      widgets: false,
      switch1: '',
      startTime: new Date().toISOString().substr(0, 10),
      endTime: new Date().toISOString().substr(0, 10),
      startTimeMenu: false,
      endTimeMenu: false,
    }
  },
  methods: {
    selectMember() {
      alert('selectMember')
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
            @click.native="dialog = false"
          >
            确定
          </VBtn>
        </VToolbarItems>
      </VToolbar>
      <VExpansionPanel
        v-model="panel"
        expand
      >
        <VExpansionPanelContent
          disabled
          @click.native="selectMember"
        >
          <VLayout
            slot="header"
            justify-space-between
          >
            <VFlex>
              会员选择
            </VFlex>
            <VFlex :class="$style.option">
              请选择
            </VFlex>
          </VLayout>
        </VExpansionPanelContent>
        <VExpansionPanelContent>
          <VLayout
            slot="header"
            justify-space-between
          >
            <VFlex>
              订单状态
            </VFlex>
            <VFlex :class="$style.option">
              全部
            </VFlex>
          </VLayout>
          <VContainer>
            <VLayout>
              <VCheckbox
                v-model="selected"
                label="待审核"
                value="a"
              />
              <VCheckbox
                v-model="selected"
                label="待收货"
                value="b"
              />
              <VCheckbox
                v-model="selected"
                label="待发货"
                value="c"
              />
              <VCheckbox
                v-model="selected"
                label="待评价"
                value="d"
              />
            </VLayout>
          </VContainer>
        </VExpansionPanelContent>
        <VExpansionPanelContent>
          <VLayout
            slot="header"
            justify-space-between
          >
            <VFlex>
              付款形式
            </VFlex>
            <VFlex :class="$style.option">
              全部
            </VFlex>
          </VLayout>
          <VContainer>
            <VLayout wrap>
              <VCheckbox
                v-model="paymentType"
                label="微信"
                value="a"
              />
              <VCheckbox
                v-model="paymentType"
                label="支付宝"
                value="b"
              />
              <VCheckbox
                v-model="paymentType"
                label="现金"
                value="c"
              />
            </VLayout>
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
              v-model="switch1"
              label="自定义"
            />
            <VLayout>
              <VFlex
                xs6
              >
                <VMenu
                  v-model="startTimeMenu"
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
                    v-model="startTime"
                    label="开始时间"
                    prepend-icon="event"
                    readonly
                  />
                  <VDatePicker
                    v-model="startTime"
                    @input="startTimeMenu = false"
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
                    v-model="endTime"
                    label="截止时间"
                    prepend-icon="event"
                    readonly
                  />
                  <VDatePicker
                    v-model="endTime"
                    @input="endTimeMenu = false"
                  />
                </VMenu>
              </VFlex>
            </VLayout>
            <VRadioGroup v-model="radioGroup">
              <VRadio
                label="今天"
                value="a"
              />
              <VRadio
                label="昨天"
                value="b"
              />
              <VRadio
                label="近7天"
                value="c"
              />
              <VRadio
                label="本周"
                value="d"
              />
              <VRadio
                label="上周"
                value="e"
              />
              <VRadio
                label="本月"
                value="f"
              />
              <VRadio
                label="上月"
                value="g"
              />
            </VRadioGroup>
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
