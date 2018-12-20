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
      selectedMemberList: [],
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
      if (this.selectedMemberList.length) {
        await this.$api.label.batchRemoveCustomer({
          labelID: this.id,
          customerIDList: this.selectedMemberList,
        })
      }
      this.selectedMemberList = []
      this.clearNewMemberList()
      this.$router.back()
    },
    cancel() {
      this.selectedMemberList = []
      this.clearNewMemberList()
      this.$router.back()
    },
  },
}
</script>

<template>
  <Layout :class="$style.container">
    <VToolbar
      color="#fff"
      dense
      flat
    >
      <VToolbarTitle>标签名称：</VToolbarTitle>
      <VSpacer />
      <VToolbarItems>
        <VBtn flat>
          {{ labelDetail.labelName }}
        </VBtn>
      </VToolbarItems>
    </VToolbar>
    <VToolbar
      color="#fff"
      dense
      flat
    >
      <VToolbarTitle>会员列表（{{ labelDetail.members.length }}）</VToolbarTitle>
      <VSpacer />
      <VToolbarItems>
        <VChip
          color="primary"
          text-color="white"
        >
          + {{ newMemberList.length }}
        </VChip>
        <VChip
          color="error"
          text-color="white"
        >
          - {{ selectedMemberList.length }}
        </VChip>
      </VToolbarItems>
    </VToolbar>
    <VItemGroup
      v-model="selectedMemberList"
      multiple
    >
      <VContainer grid-list-md>
        <VLayout wrap>
          <VFlex
            xs4
            @click="$router.push({name:'home-member',params:{scene:'label'}})"
          >
            <VCard dark>
              <VResponsive aspect-ratio="1">
                <VAvatar size="100%">
                  <VIcon
                    size="50"
                    dark
                  >
                    person_add
                  </VIcon>
                </VAvatar>
              </VResponsive>
              <VCardText class="pa-1 text-xs-center">
                添加会员
              </VCardText>
              <VCardText class="pa-1 text-xs-center">
                &nbsp;
              </VCardText>
            </VCard>
          </VFlex>
          <VFlex
            v-for="member in newMemberList"
            :key="member.id"
            xs4
          >
            <VCard
              color="grey"
              dark
            >
              <VResponsive
                aspect-ratio="1"
                :src="member.picUrl || ''"
              />
              <VCardText class="pa-1 text-xs-center">
                {{ member.buyerNick }}
              </VCardText>
              <VCardText class="pa-1 text-xs-center text-truncate">
                {{ member.mobile }}
              </VCardText>
            </VCard>
          </VFlex>
          <VFlex
            v-for="member in labelDetail.members"
            :key="member.id"
            xs4
          >
            <VItem
              :value="member.id"
            >
              <VCard
                slot-scope="{ active, toggle }"
                :disabled="true"
                :color="active ? 'error' : ''"
                dark
                @click="toggle"
              >
                <VResponsive
                  aspect-ratio="1"
                  :src="member.picUrl || ''"
                />
                <VCardText class="pa-1 text-xs-center">
                  {{ member.buyerNick }}
                </VCardText>
                <VCardText class="pa-1 text-xs-center text-truncate">
                  {{ member.mobile }}
                </VCardText>
              </VCard>
            </VItem>
          </VFlex>
        </VLayout>
      </VContainer>
    </VItemGroup>

    <VLayout :class="$style.button">
      <VFlex>
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
