<script>
import Layout from '@layouts/MainLayout'
import QRCode from '@components/QRCode'

export default {
  metaInfo: {
    title: '工作台',
    meta: [{ name: 'description', content: 'HomeWorkbench' }],
  },
  name: 'HomeWorkbench',
  components: { Layout, QRCode },
  data() {
    return {
      showPanel: 0,
      items: [],
      dialog: false,
      todayFaceList: [],
      inviteURL: '',
    }
  },
  async created() {
    this.todayFaceList = await this.$api.face.todayFaceList()
  },
  methods: {
    async invite() {
      this.inviteURL = (await this.$api.employee.getTicketUrl()).data
      this.dialog = true
    },
  },
}
</script>

<template>
  <Layout :class="$style.container">
    <VContainer :class="$style.workPanel">
      <VCard>
        <VLayout :class="$style.buttonGroup">
          <VFlex xs3>
            <VBtn
              flat
              to="/item/center"
            >
              <VIcon
                dark
                color="#99E3F9"
              >
                search
              </VIcon>
              <span>查看商品</span>
            </VBtn>
          </VFlex>
          <VFlex xs3>
            <VBtn
              flat
              @click="invite"
            >
              <VIcon
                dark
                color="#CDBCF0"
              >
                person_add
              </VIcon>
              <span>邀请会员</span>
            </VBtn>
          </VFlex>
          <VFlex xs3>
            <VBtn
              flat
              :to="{name:'home-member',params:{scene:'credit'}}"
            >
              <VIcon
                dark
                color="#FFE393"
              >
                monetization_on
              </VIcon>
              <span>会员充值</span>
            </VBtn>
          </VFlex>
          <VFlex xs3>
            <VBtn
              flat
              :to="{name:'item-center',params:{isScan:true}}"
            >
              <VIcon
                dark
                color="#FF7C7C"
              >
                indeterminate_check_box
              </VIcon>
              <span>扫码开单</span>
            </VBtn>
          </VFlex>
        </VLayout>
        <VExpansionPanel
          v-model="showPanel"
          expand
        >
          <VExpansionPanelContent>
            <VLayout :class="$style.buttonGroup">
              <VFlex xs3>
                <VBtn
                  flat
                  to="/item/center"
                >
                  <VIcon
                    dark
                    color="#FFC184"
                  >
                    child_friendly
                  </VIcon>
                  <span>购物车</span>
                </VBtn>
              </VFlex>
              <VFlex xs3>
                <VBtn flat>
                  <VIcon
                    dark
                    color="#F1ACC3"
                  >
                    redeem
                  </VIcon>
                  <span>发起退货</span>
                </VBtn>
              </VFlex>
              <VFlex xs3>
                <VBtn flat>
                  <VIcon
                    dark
                    color="#FB8D75"
                  >
                    center_focus_weak
                  </VIcon>
                  <span>核销</span>
                </VBtn>
              </VFlex>
              <VFlex xs3>
                <VBtn
                  flat
                  :to="{name:'home-member',params:{scene:'vip'}}"
                >
                  <VIcon
                    dark
                    color="#B28EFE"
                  >
                    people_outline
                  </VIcon>
                  <span>付费会员</span>
                </VBtn>
              </VFlex>
            </VLayout>
            <VLayout :class="$style.buttonGroup">
              <VFlex xs3>
                <VBtn flat>
                  <VIcon
                    dark
                    color="#54C2BF"
                  >
                    view_headline
                  </VIcon>
                  <span>提货列表</span>
                </VBtn>
              </VFlex>
              <VFlex xs3>
                <VBtn flat>
                  <VIcon
                    dark
                    color="#78B6F6"
                  >
                    settings
                  </VIcon>
                  <span>打印设置</span>
                </VBtn>
              </VFlex>
              <VFlex xs3>
                <VBtn flat>
                  <VIcon dark>
                    cloud_queue
                  </VIcon>
                  <span>构建标志</span>
                </VBtn>
              </VFlex>
              <VFlex xs3>
                <VBtn flat>
                  <VIcon dark>
                    cloud_queue
                  </VIcon>
                  <span>无</span>
                </VBtn>
              </VFlex>
            </VLayout>
          </VExpansionPanelContent>
        </VExpansionPanel>
        <VCardActions>
          <VBtn
            flat
            block
            @click="showPanel = showPanel === 0 ? null : 0"
          >
            <VIcon v-show="showPanel !== 0">
              arrow_downward
            </VIcon>
            <VIcon v-show="showPanel === 0">
              arrow_upward
            </VIcon>
          </VBtn>
        </VCardActions>
      </VCard>
    </VContainer>
    <VDialog
      v-model="dialog"
      lazy
      width="300"
    >
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

    <VList two-line>
      <template v-for="(item, index) in items">
        <VDivider
          v-if="index"
          :key="index"
        />
        <VListTile
          :key="item.title"
          avatar
          ripple
        >
          <VListTileAvatar>
            <img :src="item.avatar">
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>{{ item.title }}</VListTileTitle>
            <VListTileSubTitle class="text--primary">
              {{ item.headline }}
            </VListTileSubTitle>
          </VListTileContent>

          <VListTileAction>
            <VListTileActionText>{{ item.action }}</VListTileActionText>
          </VListTileAction>
        </VListTile>
      </template>
    </VList>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.container {
  background: linear-gradient(
    $color-brand-light 0%,
    $color-brand-light 10%,
    #fff 10%
  );
}
.workPanel {
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-expansion-panel) {
    box-shadow: unset;
  }
}

.buttonGroup {
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-btn) {
    width: 100%;
    min-width: 60px;
    height: auto;
    padding: 10px 0;
    margin-right: 0;
    margin-left: 0;
  }
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-btn__content) {
    flex-direction: column;
  }
}
</style>
