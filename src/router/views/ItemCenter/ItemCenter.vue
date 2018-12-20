<script>
import Layout from '@layouts/SubLayout'
import ItemCard from './components/ItemCard'
import CartPanel from './components/CartPanel'

export default {
  metaInfo: {
    title: '商品列表',
    meta: [{ name: 'description', content: '商品列表' }],
  },
  name: 'ItemCenter',
  components: { Layout, ItemCard, CartPanel },
  props: {
    activityID: {
      type: String,
      default: '',
    },
    isScan: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      itemClassData: [],
      itemList: [],
      tabActive: null,
      tabs: ['分类查找', '扫码选择', '无码商品'],
      selectedFirstClassCode: null,
      selectedSecondClassCode: null,
      selectedThirdClassCode: null,
      dialog: false,
      keyword: '',
      pageNo: 1,
      pageSize: 20,
      hasNext: true,
      infiniteId: +new Date(),
      list: null,
    }
  },
  computed: {
    // 最终选中的类目 ID
    classID() {
      if (this.selectedThirdClassCode) return this.selectedThirdClassCode
      if (this.selectedSecondClassCode) return this.selectedSecondClassCode
      return this.selectedFirstClassCode
    },
  },
  watch: {
    selectedFirstClassCode() {
      this.selectedThirdClassCode = null
      this.selectedSecondClassCode = null
    },
  },
  created() {
    if (this.isScan) this.scan()
    else this.getItemClassList()
  },
  methods: {
    async scan() {
      if (!this.list) {
        this.$snotify.warning('', '商品数据下载中')
        this.list = (await this.$api.item.myStoreItemList()).data
      }
      await this.scanSearch(this.list)
    },
    async scanSearch(list) {
      // eslint-disable-next-line
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['barCode'], // 可以指定扫二维码还是一维码，默认二者都有 'qrCode',
        success: async msg => {
          // 当needResult 为 1 时，扫码返回的结果
          var code =
            msg.resultStr.indexOf(',') === -1
              ? msg.resultStr
              : msg.resultStr.split(',')[1]
          // eslint-disable-next-line
          var res = list.filter(item => item.itemBarcode == code)
          res = res && res[0]
          if (!res) {
            res = (await this.$api.item.getItemList({
              keyword: code,
              pageNo: 1,
              pageSize: 1,
            })).data
            res = res && res[0]
          }
          if (res) {
            try {
              this.$store.dispatch('itemStorage/addItem', {
                itemInfo: res,
                quantity: 1,
              })
              this.$snotify.success('', '已添加')
            } catch (error) {
              this.$snotify.warning(
                '普通商品和跨境购商品不可同时结算',
                `当前仅可添加${
                  error.message === 'oversea' ? '跨境商品' : '普通商品'
                }`
              )
            }
          } else {
            this.$snotify.warning('请检查商品是否存在多个条码', '条码不存在 ')
          }
          setTimeout(async () => {
            await this.scanSearch(list)
          }, 200)
        },
      })
    },
    async getItemClassList() {
      this.itemClassData = (await this.$api.item.getItemClassList()).data
    },
    async infiniteHandler($state) {
      let newData = (await this.$api.item.searchItem({
        keyword: this.keyword,
        activityID: this.activityID,
        classID: this.classID,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      })).data
      this.hasNext = newData.length === this.pageSize
      if (newData.length) {
        this.itemList.push(...newData)
      }
      if (this.hasNext) {
        this.pageNo += 1
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    changeKeyword() {
      this.dialog = false
      this.selectedFirstClassCode = null
      this.selectedSecondClassCode = null
      this.selectedThirdClassCode = null
      this.pageNo = 1
      this.itemList = []
      this.infiniteId += 1
    },
    changeClass() {
      this.dialog = false
      this.keyword = ''
      this.pageNo = 1
      this.itemList = []
      this.infiniteId += 1
    },
    subClass(parentCode) {
      return this.itemClassData
        .filter(item => item.parentCode === parentCode)
        .map(item =>
          Object.assign(item, {
            text: item.className,
            value: item.classCode,
            avatar: item.classImg,
          })
        )
        .sort((a, b) => a.order - b.order)
    },
    selectSecondClass(item) {
      if (this.selectedSecondClassCode === item.classCode) {
        this.selectedSecondClassCode = null
      } else {
        this.selectedSecondClassCode = item.classCode
      }
      this.selectedThirdClassCode = null
    },
    selectThirdClass(item) {
      this.selectedThirdClassCode = item.classCode
      this.changeClass()
    },
  },
}
</script>

<template>
  <Layout :class="$style.container">
    <VToolbar
      dark
      color="primary"
    >
      <VTextField
        v-model="keyword"
        color="white"
        hide-details
        prepend-icon="search"
        single-line
        @change="changeKeyword"
      />
      <VBtn
        :to="{name:'home-member',params:{scene:'cart'}}"
        icon
      >
        <VIcon>person</VIcon>
      </VBtn>
    </VToolbar>
    <VDialog
      v-model="dialog"
      fullscreen
      hide-overlay
      lazy
      full-width
      transition="dialog-bottom-transition"
    >
      <VLayout
        slot="activator"
        :class="$style.ways"
      >
        <VFlex>
          <VBtn
            dark
            flat
            small
            @click="tabActive=0"
          >
            分类查找
          </VBtn>
        </VFlex>
        <VFlex>
          <VBtn
            dark
            flat
            small
            @click.stop.prevent="scan"
          >
            扫码选择
          </VBtn>
        </VFlex>
        <!-- <VFlex>
          <VBtn
            dark
            flat
            small
            @click="tabActive=2"
          >
            无码商品
          </VBtn>
        </VFlex> -->
      </VLayout>
      <VCard>
        <VToolbar
          dark
          color="primary"
        >
          <VBtn
            icon
            dark
            @click="dialog = false"
          >
            <VIcon>close</VIcon>
          </VBtn>
          <VToolbarTitle>分类选择</VToolbarTitle>
          <VSpacer />
          <VToolbarItems>
            <VBtn
              dark
              flat
              @click="changeClass"
            >
              确定
            </VBtn>
          </VToolbarItems>
        </VToolbar>
        <VDivider />
        <VTabs
          v-model="selectedFirstClassCode"
          color="primary"
          dark
          slider-color="black"
          show-arrows
        >
          <VTab
            v-for="item of subClass(null)"
            :key="item.classCode"
            :href="`#${item.classCode}`"
            ripple
          >
            {{ item.className }}
          </VTab>
        </VTabs>
        <VTabsItems v-model="selectedFirstClassCode">
          <VTabItem
            v-for="item in subClass(null)"
            :key="item.classCode"
            :value="item.classCode"
            lazy
          >
            <VExpansionPanel>
              <VExpansionPanelContent
                v-for="(secondClassItem) of subClass(item.classCode)"
                :key="secondClassItem.classCode"
                lazy
              >
                <div slot="header">
                  <VBtn
                    :depressed="secondClassItem.classCode!==selectedSecondClassCode"
                    :color="secondClassItem.classCode==selectedSecondClassCode?'primary':''"
                    small
                    @click.stop.prevent="selectSecondClass(secondClassItem)"
                  >
                    {{ secondClassItem.className }}
                  </VBtn>
                </div>
                <VContainer
                  fluid
                  grid-list-sm
                >
                  <VLayout
                    row
                    wrap
                  >
                    <VFlex
                      v-for="thirdClassItem in subClass(secondClassItem.classCode)"
                      :key="thirdClassItem.classCode"
                      xs4
                    >
                      <VCard @click="selectThirdClass(thirdClassItem)">
                        <VImg
                          :src="thirdClassItem.classImg || ''"
                          aspect-ratio="1"
                        />
                        <VCardText :class="$style.classTitle">
                          {{ thirdClassItem.className }}
                        </VCardText>
                      </VCard>
                    </VFlex>
                  </VLayout>
                </VContainer>
              </VExpansionPanelContent>
            </VExpansionPanel>
          </VTabItem>
        </VTabsItems>
      </VCard>
    </VDialog>
    <VList three-line>
      <template v-for="(item, index) in itemList">
        <VDivider
          v-if="index"
          :key="index"
        />
        <ItemCard
          :key="item.id"
          :item="item"
        />
      </template>
      <infinite-loading
        :identifier="infiniteId"
        @infinite="infiniteHandler"
      />
    </VList>
    <CartPanel />
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.container {
  padding-bottom: 60px;
}
.classTitle {
  font-size: 10px;
  text-align: center;
}
.ways {
  text-align: center;
  background-color: $color-brand-light;
}
</style>
