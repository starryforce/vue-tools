<script>
export default {
  name: 'SelectorMember',
  data() {
    return {
      showPanel: null,
      belong: '',
      face: '',
      labelList: [],
    }
  },
  created() {
    this.getLabelList()
  },
  methods: {
    async getLabelList() {
      this.labelList = (await this.$api.member.getLabelList()).data
    },
    confirm() {
      this.showPanel = null
    },
  },
}
</script>

<template>
  <div :class="$style.container">
    <VToolbar
      dark
      color="primary"
    >
      <VTextField
        prepend-inner-icon="search"
        single-line
        light
        placeholder="搜索会员名、手机号、微信昵称、卡号"
      />
      <VBtn
        flat
        icon
        @click="showPanel = showPanel === 0 ? null : 0"
      >
        <VIcon>settings</VIcon>
      </VBtn>
    </VToolbar>
    <VExpansionPanel
      v-model="showPanel"
      :class="$style.expansionPanel"
    >
      <VExpansionPanelContent>
        <VContainer>
          <VSubheader>
            会员池
          </VSubheader>
          <VRadioGroup
            v-model="belong"
            color="primary"
            row
          >
            <VRadio
              label="仅看我的"
              value="belong-1"
            />
            <VRadio
              label="全部会员"
              value="belong-2"
            />
          </VRadioGroup>
          <VSubheader>人像识别</VSubheader>
          <VRadioGroup
            v-model="face"
            color="primary"
            row
          >
            <VRadio
              label="全部"
              value="face-0"
            />
            <VRadio
              label="已绑定"
              value="face-1"
            />
            <VRadio
              label="未绑定"
              value="face-2"
            />
          </VRadioGroup>
          <VItemGroup multiple>
            <VSubheader>标签筛选</VSubheader>
            <VItem
              v-for="(label,index) of labelList"
              :key="index"
            >
              <VChip
                slot-scope="{ active, toggle }"
                :selected="active"
                @click="toggle"
              >
                {{ label.labelName }}
              </VChip>
            </VItem>
          </VItemGroup>
        </VContainer>
        <VLayout>
          <VFlex>
            <VBtn
              block
              :color="$style['button-bg-color']"
            >
              重置所选
            </VBtn>
          </VFlex>
          <VFlex>
            <VBtn
              block
              color="primary"
              dark
              @click="confirm"
            >
              确定
            </VBtn>
          </VFlex>
        </VLayout>
      </VExpansionPanelContent>
    </VExpansionPanel>
  </div>
</template>

<style lang="scss" module>
@import '@design';

:export {
  // stylelint-disable-next-line property-no-unknown
  button-bg-color: $color-button-bg;
}

.container {
  // stylelint-disable selector-class-pattern
  :global(.v-input__slot) {
    background-color: #fff;
  }

  :global(.v-text-field__slot) {
    font-size: 13px;
  }

  // 减小框架按钮大小及边距
  :global(.v-input--selection-controls) {
    margin-top: 0;
  }
  :global(.v-input--selection-controls .v-input__slot) {
    margin-bottom: 0;
  }
  :global(.theme--light.v-messages) {
    min-height: 0;
  }
}

.expansionPanel {
  position: absolute;
  z-index: $layer-modal-z-index;
  :global(.v-expansion-panel__body .container) {
    height: 75vh;
    max-height: 75vh;
    overflow: auto;
  }
}
</style>
