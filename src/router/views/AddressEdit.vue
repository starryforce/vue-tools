<script>
import Layout from '@layouts/WithToolBar'
import region from '@assets/address'

export default {
  metaInfo: {
    title: '会员地址编辑',
    meta: [{ name: 'description', content: '会员地址编辑' }],
  },
  name: 'AddressEdit',
  components: { Layout },
  props: {
    addressInfo: {
      type: Object,
      default: () => {},
    },
    memberID: {
      type: String,
      default: 'f9eab77eb5d2fdc4392404b98726ebc037454780',
    },
  },
  data() {
    return {
      editingData: {
        zipCode: '000000',
        provinceCode: '',
        provinceName: '',
        cityCode: '',
        cityName: '',
        districtCode: '',
        districtName: '',
        detail: '',
        name: '',
        mobile: '',
        tag: '家',
        isDefault: false,
        memberID: '',
        addressID: '',
      },
      tabActive: null,
      selectedRegion: [{ label: '请选择' }],
      sheet: false,
    }
  },
  computed: {
    regionOptions() {
      if (this.selectedRegion[0] && this.selectedRegion[0].children) {
        if (this.selectedRegion[1] && this.selectedRegion[1].children) {
          return [
            region,
            this.selectedRegion[0].children,
            this.selectedRegion[1].children,
          ]
        }
        return [region, this.selectedRegion[0].children]
      }
      return [region]
    },
    regionDisplay() {
      return this.selectedRegion.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue.label + ' '
      }, '')
    },
  },
  methods: {
    selectRegion(index, item) {
      this.$set(this.selectedRegion, index, item)
      this.selectedRegion = this.selectedRegion.slice(0, index + 1)
      if (this.tabActive < 2) {
        this.selectedRegion.push({ label: '请选择' })
        this.tabActive = this.tabActive + 1
      } else {
        this.sheet = false
      }
    },
    saveAddress() {
      this.$api.address.editMemberAddress(
        Object.assign({}, this.editingData, {
          provinceCode: this.selectedRegion[0].value,
          provinceName: this.selectedRegion[0].label,
          cityCode: this.selectedRegion[1].value,
          cityName: this.selectedRegion[1].label,
          districtCode: this.selectedRegion[2].value,
          districtName: this.selectedRegion[2].label,
          memberID: this.memberID,
        })
      )
    },
  },
}
</script>

<template>
  <Layout>
    <VContainer>
      <VForm>
        <VTextField
          v-model="editingData.name"
          label="收货人："
        />
        <VTextField
          v-model="editingData.mobile"
          label="手机号码："
        />
        <VBottomSheet
          v-model="sheet"
          full-width
          persistent
        >
          <VTextField
            slot="activator"
            :value="regionDisplay"
            label="所在地区："
          />
          <VTabs
            v-model="tabActive"
            dark
          >
            <VTab
              v-for="(tab,index) in selectedRegion"
              :key="index"
              ripple
            >
              {{ tab.label }}
            </VTab>
            <VTabItem
              v-for="(tab,index) in selectedRegion"
              :key="index"
            >
              <VList :class="$style.region">
                <VListTile
                  v-for="item of regionOptions[index]"
                  :key="item.value"
                  @click="selectRegion(index,item)"
                >
                  <VListTileContent>
                    <VListTileTitle>{{ item.label }}</VListTileTitle>
                  </VListTileContent>
                  <VListTileAction v-if="item.value === selectedRegion[index].value">
                    <VIcon color="primary">
                      check
                    </VIcon>
                  </VListTileAction>
                </VListTile>
              </VList>
            </VTabItem>
          </VTabs>
        </VBottomSheet>

        <VTextField
          v-model="editingData.detail"
          label="详细地址："
        />
        <VLayout row>
          <VFlex
            xs2
            align-self-center
          >
            标签：
          </VFlex>
          <VFlex xs10>
            <VItemGroup v-model="editingData.tag">
              <VItem
                v-for="item in ['家','公司','学校']"
                :key="item"
                :value="item"
              >
                <VChip
                  slot-scope="{ active, toggle }"
                  :selected="active"
                  @click="toggle"
                >
                  {{ item }}
                </VChip>
              </VItem>
            </VItemGroup>
          </VFlex>
        </VLayout>
        <VDivider />
        <VLayout row>
          <VFlex
            xs10
            align-self-center
          >
            设置默认地址
          </VFlex>
          <VFlex xs2>
            <VSwitch
              v-model="editingData.isDefault"
            />
          </VFlex>
        </VLayout>
      </VForm>
    </VContainer>
    <VBtn
      block
      fixed
      bottom
      color="primary"
      @click="saveAddress"
    >
      保存
    </VBtn>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.region {
  height: 400px;
  overflow: scroll;
}
</style>
