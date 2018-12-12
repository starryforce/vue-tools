<script>
import Layout from '@layouts/MainLayout'

export default {
  metaInfo: {
    title: '工作台',
    meta: [{ name: 'description', content: 'HomeWorkbench' }],
  },
  name: 'HomeWorkbench',
  components: { Layout },
  data() {
    return {
      showPanel: 0,
      items: [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          title: 'Ali Connors',
          subtitle:
            "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          title: 'me, Scrott, Jennifer',
          subtitle: "Wish I could come, but I'm out of town this weekend.",
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          title: 'Sandra Adams',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          title: 'Trevor Hansen',
          subtitle:
            'Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          title: 'Britta Holt',
          subtitle:
            'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
      todayFaceList: [],
    }
  },
  async created() {
    this.todayFaceList = await this.$api.face.todayFaceList()
    this.openWS()
  },
  methods: {
    openWS() {
      const ws = new WebSocket('ws://114.55.4.22:9002/bksoc?socketid=toshop123')

      ws.onopen = function(event) {
        // console.log('Connection open ...')
        ws.send('Hello WebSockets!')
      }

      ws.onmessage = function(event) {
        // console.log('Received Message: ' + event.data)
        ws.close()
      }

      ws.onclose = function(event) {
        // console.log('Connection closed.')
      }
    },
    async scan() {
      var list = (await this.$api.item.getItems()).data
      await this.scanSearch(list)
    },
    async scanSearch(list) {
      let code = '662562623525'
      var res = list.filter(item => item.itemBarcode === code)
      res = res & res[0]
      if (!res) {
        res = (await this.$api.item.getItems({
          keyword: code,
          pageNo: 1,
          pageSize: 1,
        })).data
        res = res & res[0]
      }
      if (res) {
        this.$snotify.success('', '已添加')
      } else {
        this.$snotify.warning('请检查商品是否存在多个条码', '条码不存在 ')
      }

      let isBreak = false
      if (isBreak)
        setTimeout(async () => {
          await this.scanSearch(list)
        }, 200)
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
            <VBtn flat>
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
              @click="scan"
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
                <VBtn flat>
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
