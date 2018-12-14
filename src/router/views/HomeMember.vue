<script>
import Layout from '@layouts/MainLayout'
import SelectorMember from '@components/SelectorMember'
import QRCode from '@components/QRCode'

export default {
  metaInfo: {
    title: '会员',
    meta: [{ name: 'description', content: 'HomeMember' }],
  },
  name: 'HomeMember',
  components: { Layout, SelectorMember, QRCode },
  props: {
    scene: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialog: false,
      memberList: [],
      pageNo: 1,
      pageSize: 20,
      hasNext: true,
      infiniteId: +new Date(),
      memberOptions: {},
      inviteURL: '',
    }
  },
  async created() {
    this.inviteURL = (await this.$api.employee.getTicketUrl()).data
  },
  methods: {
    fetchMemberOptions(newValue) {
      this.memberOptions = newValue
      this.pageNo = 1
      this.memberList = []
      this.infiniteId += 1
    },
    async infiniteHandler($state) {
      let newData = (await this.$api.member.getMemberList(
        Object.assign({}, this.memberOptions, {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        })
      )).customerList
      this.hasNext = newData.length === this.pageSize
      if (newData.length) {
        this.memberList.push(...newData)
      }
      if (this.hasNext) {
        this.pageNo += 1
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    // 选择会员时根据场景值进行跳转
    selectMember(member) {
      if (this.scene === 'list') {
        this.$router.push({
          name: 'member-information',
          params: { id: member.id },
        })
      } else if (this.scene === 'credit') {
        this.$router.push({
          name: 'add-credit',
          params: { memberID: member.id },
        })
      } else if (this.scene === 'vip') {
        this.$router.push({
          name: 'join-vip',
          params: { memberID: member.id },
        })
      } else if (this.scene === 'label') {
        this.$store.dispatch('label/addMember', member)
        this.$router.back()
      } else if (this.scene === 'offline') {
        this.$store.dispatch('activity/selectMember', member)
        this.$router.back()
      } else if (this.scene === 'cart') {
        this.$store.dispatch('itemStorage/selectMember', member)
        this.$router.back()
      } else if (this.scene === 'order') {
        this.$store.dispatch('order/selectMember', member)
        this.$router.back()
      }
    },
  },
}
</script>

<template>
  <Layout>
    <SelectorMember @fetch:member-options="fetchMemberOptions" />
    <VLayout :class="$style.brandable">
      <VFlex>
        <VDialog
          v-model="dialog"
          lazy
          width="300"
        >
          <VBtn
            slot="activator"
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

          <VCard>
            <VCardActions>
              <VSpacer />
              <VBtn
                icon
                @click="dialog = false"
              >
                <VIcon>close</VIcon>
              </VBtn>
            </VCardActions>
            <VLayout justify-space-around>
              <VFlex
                :class="$style.qr"
              >
                <QRCode
                  :value="inviteURL"
                  :size="250"
                />
              </VFlex>
            </VLayout>
            <VCardText :class="$style.scanTip">
              扫一扫注册贝卡会员
            </VCardText>

            <VDivider />
          </VCard>
        </VDialog>
      </VFlex>
      <VDivider
        vertical
        dark
      />
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
      <VDivider
        vertical
        dark
      />
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
          @click="selectMember(item)"
        >
          <VListTileAvatar>
            <img :src="item.picUrl">
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>{{ item.customerName }}</VListTileTitle>
            <VListTileSubTitle>{{ item.mobile }}</VListTileSubTitle>
          </VListTileContent>
          <VListTileAction>
            <VLayout>
              <VBadge
                right
                overlap
              >
                <span slot="badge">
                  {{ item.labelInfo ? item.labelInfo.length : 0 }}
                </span>
                <VIcon
                  :color="item.isFaceId?'primary':''"
                  large
                >
                  label_important
                </VIcon>
              </VBadge>
              <VIcon
                :color="item.isFaceId?'primary':''"
                large
              >
                account_box
              </VIcon>
            </VLayout>
          </VListTileAction>
        </VListTile>
      </template>
      <infinite-loading
        :identifier="infiniteId"
        @infinite="infiniteHandler"
      />
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.brandable {
  background-color: $color-brand-light;
}
.scanTip {
  font-size: 18px;
  color: $color-brand-light;
  text-align: center;
}
.qr {
  flex: none;
}
</style>
