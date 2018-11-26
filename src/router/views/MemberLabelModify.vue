<script>
import Layout from '@layouts/WithToolBar'

export default {
  metaInfo: {
    title: '会员标签',
    meta: [{ name: 'description', content: 'MemberLabelModify' }],
  },
  components: { Layout },
  props: {
    mode: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      labelDetail: {},
    }
  },
  created() {
    this.getLabelDetail()
  },
  methods: {
    async getLabelDetail() {
      this.labelDetail = (await this.$api.member.getLabelDetail(this.id)).data
    },
  },
}
</script>

<template>
  <Layout>
    <VContainer>
      <VFlex>
        <VTextField
          :label="labelDetail.labelName"
          outline
          :disabled="mode === 'edit'"
        />
      </VFlex>
      <VBtn
        v-if="mode === 'edit'"
        flat
        :color="$style['color-button-danger']"
      >
        删除标签
      </VBtn>
    </VContainer>
    <VSubheader>会员列表（0）</VSubheader>
    <VContainer
      fluid
      grid-list-lg
    >
      <VLayout
        row
        wrap
      >
        <VFlex xs3>
          <VAvatar
            color="primary"
            :size="$style['width-avatar']"
          >
            <VIcon dark>
              person_add
            </VIcon>
          </VAvatar>
          <p :class="$style.memberName">
            添加会员
          </p>
        </VFlex>
        <VFlex
          v-for="member in labelDetail.members"
          :key="member.id"
          xs3
        >
          <VAvatar :size="$style['width-avatar']">
            <img
              :src="member.picUrl"
              alt="Avatar"
              class="image"
              height="100%"
              width="100%"
            >
          </VAvatar>
          <p :class="$style.memberName">
            {{ member.buyerNick }}
          </p>
        </VFlex>
      </VLayout>
    </VContainer>
    <VLayout :class="$style.button">
      <VFlex v-if="mode === 'edit'">
        <VBtn
          block
          large
          @click="$router.back()"
        >
          返回
        </VBtn>
      </VFlex>
      <VFlex>
        <VBtn
          color="primary"
          dark
          block
          large
        >
          确定
        </VBtn>
      </VFlex>
    </VLayout>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
:export {
  // stylelint-disable property-no-unknown
  width-avatar: 20vw;
  color-button-danger: $color-button-danger;
}
.memberName {
  font-size: 14px;
  color: $color-brand-light;
  text-align: center;
}
.button {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
