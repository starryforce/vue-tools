<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: '会员标签',
    meta: [{ name: 'description', content: 'MemberLabelModify' }],
  },
  name: 'MemberLabelModify',
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
      labelDetail: {
        members: [],
      },
    }
  },
  computed: {
    newMemberList() {
      return this.$store.state.label.memberListBinding
    },
  },
  created() {
    this.getLabelDetail()
  },
  activated() {
    this.getLabelDetail()
  },
  methods: {
    async getLabelDetail() {
      this.labelDetail = (await this.$api.label.getLabelDetail(this.id)).data
    },
    clearNewMemberList() {
      this.$store.dispatch('label/clearMemberList')
    },
    async confirm() {
      if (this.newMemberList.length) {
        const IDList = this.newMemberList.map(item => item.id)
        await this.$api.label.batchAddCustomer({
          labelID: this.id,
          customerIDList: IDList,
        })
      }
      this.clearNewMemberList()
      this.$router.back()
    },
    cancel() {
      this.clearNewMemberList()
      this.$router.back()
    },
  },
}
</script>

<template>
  <Layout :class="$style.container">
    <VContainer>
      <VTextField
        label="标签名称："
        :value="labelDetail.labelName"
        outline
        :disabled="mode === 'edit'"
      />
      <VBtn
        v-if="mode === 'edit'"
        flat
        :color="$style['color-button-danger']"
      >
        删除标签
      </VBtn>
    </VContainer>
    <VSubheader>会员列表（{{ labelDetail.members.length }}）</VSubheader>
    <VContainer
      fluid
      grid-list-lg
    >
      <VLayout
        row
        wrap
      >
        <VFlex
          xs3
          @click="$router.push({name:'home-member',params:{scene:'label'}})"
        >
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
          v-for="member in newMemberList"
          :key="member.id"
          :class="$style.newMemberList"
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
          @click="cancel"
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
          @click="confirm"
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
.container {
  padding-bottom: 56px;
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
.newMemberList {
  filter: opacity(0.6);
  border: dashed 1px $color-brand;
}
</style>
