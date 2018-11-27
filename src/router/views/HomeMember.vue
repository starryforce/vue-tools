<script>
import Layout from '@layouts/main'
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
      inviteURL: 'http://192.168.1.126:8080',
    }
  },
  created() {},
  methods: {
    fetchMemberList(newValue) {
      this.memberList = newValue.customerList
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
          params: { id: member.id },
        })
      } else if (this.scene === 'label') {
        this.$store.dispatch('label/addMember', member)
        this.$router.back()
      }
    },
  },
}
</script>

<template>
  <Layout>
    <SelectorMember @fetch:member-list="fetchMemberList" />
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
            <VResponsive>
              <QRCode
                :value="inviteURL"
                :size="300"
                :padding="25"
              />
            </VResponsive>

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
              <VIcon
                :color="item.isFaceId?'primary':''"
                large
              >
                account_box
              </VIcon>
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
            </VLayout>
          </VListTileAction>
        </VListTile>
      </template>
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
</style>
