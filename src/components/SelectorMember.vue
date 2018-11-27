<script>
export default {
  name: 'SelectorMember',
  data() {
    return {
      showPanel: null,
      labelList: [],
      keyword: '',
      settings: {
        belong: 'all',
        face: 'all',
        labels: [],
      },
    }
  },
  created() {
    this.getLabelList()
    this.getMemberList()
  },
  methods: {
    async getLabelList() {
      this.labelList = (await this.$api.label.getLabelList()).data
    },
    confirm() {
      this.showPanel = null
      this.getMemberList()
    },
    async getMemberList() {
      const memberList = (await this.$api.member.getMemberList({
        keyword: this.keyword,
        belong: this.settings.belong,
        face: this.settings.face,
        labels: this.settings.labels,
      })).data
      this.$emit('fetch:member-list', memberList)
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
        placeholder="搜索会员名、手机号、微信昵称、卡号"
        @change="getMemberList"
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
              value="all"
              label="全部会员"
              color="primary"
            />
            <VRadio
              value="my"
              label="仅看我的"
              color="primary"
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
              value="all"
            />
            <VRadio
              label="已绑定"
              value="binding"
              color="primary"
            />
            <VRadio
              label="未绑定"
              value="noBinding"
              color="primary"
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
              :value="label.labelName"
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
  color: #fff;
  background-color: $color-brand-light;
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
