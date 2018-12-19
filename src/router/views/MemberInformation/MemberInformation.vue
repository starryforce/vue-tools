<script>
import Layout from '@layouts/SubLayout'
import MemberConsume from './components/MemberConsume'
import MemberOrder from './components/MemberOrder'
import MemberAssets from './components/MemberAssets'
import MemberActivity from './components/MemberActivity'

export default {
  metaInfo: {
    title: '会员信息',
    meta: [{ name: 'description', content: 'MemberInformation' }],
  },
  name: 'MemberInformation',
  components: {
    Layout,
    MemberAssets,
    MemberOrder,
    MemberConsume,
    MemberActivity,
  },
  props: {
    id: {
      type: String,
      required: true,
      default: '0',
    },
  },
  data() {
    return {
      memberInformation: {},
      active: 0,
      tabs: ['基础信息', '消费统计', '订单列表', '会员资产', '活动参与'],
      isEditing: false,
    }
  },
  created() {
    this.getBaseInformation()
  },

  methods: {
    async getBaseInformation() {
      this.memberInformation = (await this.$api.member.getBaseInformation(
        this.id
      )).customerInfo
    },
  },
}
</script>

<template>
  <Layout>
    <VList
      :class="$style.nameBoard"
      two-line
      dark
    >
      <VListTile
        :key="memberInformation.id"
        avatar
      >
        <VListTileAvatar>
          <img :src="memberInformation.picUrl">
        </VListTileAvatar>
        <VListTileContent>
          <VListTileTitle>{{ memberInformation.customerName }}</VListTileTitle>
          <VListTileSubTitle>
            <template v-if="memberInformation.customerName =='V0'">
              <VIcon>
                child_friendly
              </VIcon>
              非会员
            </template>
            <template v-else>
              <span :class="$style.nameplate">
                <VIcon color="#6c4103">
                  child_friendly
                </VIcon>
                超级会员 VIP {{ memberInformation.gradeName }}
              </span>
            </template>
          </VListTileSubTitle>
        </VListTileContent>

        <VListTileAction @click="isEditing=!isEditing">
          <VIcon v-show="!isEditing">
            edit
          </VIcon>
          <VIcon v-show="isEditing">
            done
          </VIcon>
        </VListTileAction>
      </VListTile>
    </VList>
    <VTabs
      v-model="active"
      :class="$style.tabs"
      color="primary"
      dark
      grow
      centered
      slider-color="white"
    >
      <VTab
        v-for="tabName in tabs"
        :key="tabName"
        ripple
      >
        {{ tabName }}
      </VTab>
    </VTabs>
    <VTabsItems
      v-model="active"
      :class="$style.tabsItems"
    >
      <VTabItem>
        <VList>
          <VListTile>
            <VListTileContent>
              <VListTileTitle>姓名</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.customerName }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>昵称</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.buyerNick }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>注册手机</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.mobile }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>注册时间</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.createTime }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>所属门店</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.storeName }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>所属导购</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText>{{ memberInformation.employeeName }}</VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>会员标签</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText v-if="!isEditing">
                <span
                  v-for="item in memberInformation.labelInfo"
                  :key="item.labelId"
                >
                  {{ item.labelName }}
                </span>
              </VListTileActionText>
              <VListTileActionText
                v-else
                :class="$style.isEditing"
              >
                <VBtn
                  flat
                  small
                  color="primary"
                >
                  添加标签
                  <VIcon
                    dark
                  >
                    chevron_right
                  </VIcon>
                </VBtn>
              </VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>关系人</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText v-if="!isEditing">
                {{ memberInformation.attributeValu &&memberInformation.attributeValu.join('、') }}
              </VListTileActionText>
              <VListTileActionText
                v-else
                :class="$style.isEditing"
              >
                <VBtn
                  flat
                  small
                  color="primary"
                >
                  添加关系人
                  <VIcon
                    dark
                  >
                    chevron_right
                  </VIcon>
                </VBtn>
              </VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile>
            <VListTileContent>
              <VListTileTitle>人像识别</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText v-if="!isEditing">
                <VIcon
                  :color="memberInformation.isFaceId?'primary':''"
                  large
                >
                  account_box
                </VIcon>
              </VListTileActionText>
              <VListTileActionText
                v-else
                :class="$style.isEditing"
              >
                <VBtn
                  flat
                  small
                  color="primary"
                  :to="{ name: 'member-face', params: {id}}"
                >
                  添加识别照片
                  <VIcon
                    dark
                  >
                    chevron_right
                  </VIcon>
                </VBtn>
              </VListTileActionText>
            </VListTileAction>
          </VListTile>
          <VDivider />
          <VListTile @click="$router.push({name:'address-manage',params:{memberID:id}})">
            <VListTileContent>
              <VListTileTitle>收货地址</VListTileTitle>
            </VListTileContent>
            <VListTileAction>
              <VListTileActionText> >> </VListTileActionText>
            </VListTileAction>
          </VListTile>
        </VList>
      </VTabItem>
      <VTabItem lazy>
        <MemberConsume v-bind="memberInformation" />
      </VTabItem>
      <VTabItem lazy>
        <MemberOrder :id="id" />
      </VTabItem>
      <VTabItem lazy>
        <MemberAssets :id="id" />
      </VTabItem>
      <VTabItem lazy>
        <MemberActivity :id="id" />
      </VTabItem>
    </VTabsItems>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
:export {
  // stylelint-disable-next-line property-no-unknown
  width-avatar: 20vw;
}
.nameBoard.nameBoard {
  background-color: $color-brand-light;
}

.tabs {
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-tabs__item) {
    padding-right: 0;
    padding-left: 0;
  }
}
.tabsItems {
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile__action-text) {
    font-size: 15px;
  }
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile__title) {
    font-size: 15px;
  }
}
.nameplate {
  display: inline-block;
  padding: 2px 6px;
  color: #6c4103;
  background: linear-gradient(
    to right,
    #f4de8f,
    #d3a809,
    #f4de8f,
    #d3a809,
    #f4de8f
  );
  border-radius: 5px;
}
.isEditing {
  color: $color-brand-light;
}
</style>
