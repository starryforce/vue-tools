<script>
export default {
  name: 'SelectorMember',
  data() {
    return {
      showPanel: null,
      belong: '',
      face: '',
      tags: [
        '土豪',
        '精明型',
        '特别长的标签',
        '精明型',
        '精明型',
        '土豪',
        '土豪',
        '土豪',
        '精明型',
        '特别长的标签',
        '土豪',
        '精明型',
        '特别长的标签',
        '精明型',
        '精明型',
        '土豪',
        '土豪',
        '土豪',
      ],
    }
  },
  methods: {
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
      :color="$style['color-brand-light']"
    >
      <VTextField
        prepend-inner-icon="search"
        single-line
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
              v-for="(tag,index) of tags"
              :key="index"
            >
              <VChip
                slot-scope="{ active, toggle }"
                :selected="active"
                @click="toggle"
              >
                {{ tag }}
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
              :color="$style['color-brand-light']"
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
  // stylelint-disable-next-line property-no-unknown
  color-brand-light: $color-brand-light;
}

.container {
  // 减小框架按钮大小及边距
  // :global(.v-input--selection-controls) {
  //   margin-top: 0;
  // }
  // :global(.v-input--selection-controls .v-input__slot) {
  //   margin-bottom: 0;
  // }

  // :global(.theme--light.v-messages) {
  //   min-height: 0;
  // }
}

.expansionPanel {
  position: absolute;
  z-index: $layer-modal-z-index;
  // stylelint-disable-next-line  selector-class-pattern
  :global(.v-expansion-panel__body .container) {
    height: 73vh;
    max-height: 73vh;
    overflow: auto;
  }
}
</style>
