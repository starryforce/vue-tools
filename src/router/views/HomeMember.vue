<script>
import Layout from '@layouts/main'
import SelectorMember from '@components/SelectorMember'

export default {
  metaInfo: {
    title: '会员',
    meta: [{ name: 'description', content: 'HomeMember' }],
  },
  components: { Layout, SelectorMember },
  data() {
    return {
      memberList: [],
    }
  },
  created() {
    this.getMemberList()
  },
  methods: {
    async getMemberList() {
      this.memberList = (await this.$api.member.getMemberList()).data
    },
  },
}
</script>

<template>
  <Layout>
    <SelectorMember />
    <VLayout :class="$style.operations">
      <VFlex>
        <VBtn
          flat
          dark
        >
          <VIcon
            light
            small
          >
            person_add
          </VIcon>
          会员邀请
        </VBtn>
      </VFlex>
      <VFlex>
        <VBtn
          flat
          dark
        >
          <VIcon
            light
            small
          >
            print
          </VIcon>
          扫会员码
        </VBtn>
      </VFlex>
      <VFlex>
        <VBtn
          flat
          dark
          to="/member/label"
        >
          <VIcon
            light
            small
          >
            loyalty
          </VIcon>
          标签会员
        </VBtn>
      </VFlex>
    </VLayout>
    <VList two-line>
      <template v-for="(item, index) in memberList">
        <VDivider
          v-if="index"
          :key="index"
          inset
        />

        <VListTile
          :key="item.id"
          avatar
          :to="{name:'member-information',params:{id:item.id}}"
        >
          <VListTileAvatar>
            <img :src="item.avatar">
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>{{ item.name }}</VListTileTitle>
            <VListTileSubTitle>{{ item.mobile }}</VListTileSubTitle>
          </VListTileContent>
          <VListTileAction>
            <VLayout>
              <VFlex>
                <VBtn
                  icon
                  ripple
                >
                  <VIcon
                    large
                    color="grey lighten-1"
                  >
                    account_circle
                  </VIcon>
                </VBtn>
              </VFlex>

              <VFlex>
                <VBtn
                  icon
                  ripple
                >
                  <VIcon
                    large
                    color="grey lighten-1"
                  >
                    account_circle
                  </VIcon>
                </VBtn>
              </VFlex>
            </VLayout>
          </VListTileAction>
        </VListTile>
      </template>
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.operations {
  background-color: $color-brand-light;
}
</style>
