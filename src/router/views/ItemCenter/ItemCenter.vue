<script>
import Layout from '@layouts/WithToolBar'
import ItemCard from './components/ItemCard'
import CartPanel from './components/CartPanel'

export default {
  metaInfo: {
    title: '商品列表',
    meta: [{ name: 'description', content: '商品列表' }],
  },
  name: 'ItemCenter',
  components: { Layout, ItemCard, CartPanel },
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
    }
  },
  computed: {
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
    this.getItemClassList()
  },
  methods: {
    async getItemClassList() {
      this.itemClassData = (await this.$api.item.getItemClassList()).data
    },
    async getItemList({ keyword = null, classID = null } = {}) {
      this.itemList = (await this.$api.item.getItemList({
        keyword: keyword,
        classID: classID,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      })).data
      this.dialog = false
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
      this.dialog = false
    },
  },
}
</script>

<template>
  <Layout>
    <VToolbar
      dense
      dark
      color="primary"
    >
      <VTextField
        v-model="keyword"
        hide-details
        prepend-icon="search"
        single-line
        @change="getItemList(keyword)"
      />
      <VBtn icon>
        <VIcon>more_vert</VIcon>
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
            @click="tabActive=1"
          >
            扫码选择
          </VBtn>
        </VFlex>
        <VFlex>
          <VBtn
            dark
            flat
            small
            @click="tabActive=2"
          >
            无码商品
          </VBtn>
        </VFlex>
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
              @click="getItemList({classID})"
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
    </VList>
    <CartPanel />
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.classTitle {
  font-size: 10px;
  text-align: center;
}
.ways {
  text-align: center;
  background-color: $color-brand-light;
}
</style>
