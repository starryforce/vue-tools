<script>
export default {
  name: 'SelectorMember',
  data() {
    return {
      showPanel: null,
      labelList: [],
      keyword: '',
      settings: {
        belong: '',
        face: -1,
        labels: [],
      },
    }
  },
  created() {
    this.getLabelList()
  },
  methods: {
    async getLabelList() {
      this.labelList = (await this.$api.label.getLabelList()).data
    },
    confirm() {
      this.showPanel = null
      const isMobile = this.keyword.match(
        /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      )
      this.$emit('fetch:member-options', {
        mobile: isMobile ? this.keyword : '',
        customerName: !isMobile ? this.keyword : '',
        employeeId: this.settings.belong,
        isFaceId: this.settings.face,
        labelIds: this.settings.labels.join(','),
      })
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
        v-model="keyword"
        prepend-inner-icon="search"
        single-line
        light
        placeholder="搜索会员名、手机号、微信昵称"
        @change="confirm"
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
          <VSubheader><VIcon>more_vert</VIcon>会员池</VSubheader>
          <VRadioGroup
            v-model="settings.belong"
            color="primary"
            row
          >
            <VRadio
              color="primary"
              label="全部会员"
              value=""
            />
            <VRadio
              color="primary"
              label="仅看我的"
              value="f9eab77eb5d2fdc4392404b98726ebc037454767"
            />
          </VRadioGroup>
          <VSubheader><VIcon>more_vert</VIcon>人像识别</VSubheader>
          <VRadioGroup
            v-model="settings.face"
            color="primary"
            row
          >
            <VRadio
              color="primary"
              label="全部"
              :value="-1"
            />
            <VRadio
              color="primary"
              label="已绑定"
              :value="1"
            />
            <VRadio
              color="primary"
              label="未绑定"
              :value="0"
            />
          </VRadioGroup>
          <VItemGroup
            v-model="settings.labels"
            multiple
            :active-class="$style.brandable"
          >
            <VSubheader><VIcon>more_vert</VIcon>标签筛选</VSubheader>
            <VItem
              v-for="(label) of labelList"
              :key="label.labelName"
              :value="label.id"
            >
              <VChip
                slot-scope="{ active, toggle }"
                :selected="active"
                small
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
    margin-bottom: 0;
    background-color: #fff;
  }
  :global(.v-text-field__slot) {
    font-size: 13px;
  }
  :global(.v-subheader) {
    padding-left: 0;
  }
  :global(.v-input--radio-group) {
    margin-top: 0;
  }
}

.brandable.brandable {
  color: #fff !important;
  background-color: #57c5c2 !important;
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

<!--
target:
  根据选项查询取得对应的用户列表，并传给父组件
module:
  内部持久保存用户选择的预置选项，存入 vuex 并作持久化
export:
  一个用户信息列表
-->
