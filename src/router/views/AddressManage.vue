<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: '会员地址管理',
    meta: [{ name: 'description', content: '会员地址管理' }],
  },
  name: 'AddressManage',
  components: { Layout },
  props: {
    memberID: {
      type: String,
      default: '',
    },
    scene: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      addressList: [],
    }
  },
  created() {
    this.getAddressList()
  },
  methods: {
    selectAddress(address) {
      if (this.scene === 'order') {
        this.$store.dispatch('itemStorage/selectAddress', address)
        this.$router.back()
      }
    },
    async getAddressList() {
      this.addressList = (await this.$api.address.getMemberAddressList({
        memberID: this.memberID,
      })).data
    },
  },
}
</script>

<template>
  <Layout :class="$style.container">
    <VList two-line>
      <div v-if="!addressList || addressList.length<1">
        暂无地址
      </div>
      <template v-for="(address, index) in addressList">
        <VDivider
          v-if="index"
          :key="index"
        />
        <VListTile
          :key="address.id"
          ripple
          @click="selectAddress(address)"
        >
          <VListTileContent>
            <VListTileTitle>
              <VLayout>
                <VFlex
                  xs4
                  style="overflow:hidden;text-overflow : ellipsis "
                >
                  {{ address.name }}
                </VFlex>
                <VFlex xs5>
                  {{ address.phone }}
                </VFlex>
                <VFlex
                  v-if="address.addressLable"
                  xs3
                >
                  <VChip
                    small
                    label
                    color="secondary"
                    text-color="#fff"
                  >
                    {{ address.addressLable }}
                  </VChip>
                </VFlex>
              </VLayout>
            </VListTileTitle>
            <VListTileSubTitle>
              <VChip
                v-if="address.isDefault"
                outline
                small
                color="secondary"
              >
                默认
              </VChip>{{ address.provName }}{{ address.cityName }}{{ address.distName }}{{ address.detail }}
            </VListTileSubTitle>
          </VListTileContent>

          <!-- <VListTileAction @click.stop="$router.push({name:'address-edit',params:{addressInfo:address,memberID:memberID}})">
            <VIcon color="grey lighten-1">
              edit
            </VIcon>
          </VListTileAction> -->
        </VListTile>
      </template>
    </VList>
    <VBtn
      :to="'/address/add/'+memberID"
      block
      fixed
      bottom
      color="primary"
    >
      <VIcon dark>
        add
      </VIcon>新建收货地址
    </VBtn>
  </Layout>
</template>


<style lang="scss" module>
@import '@design';

.container {
  padding-bottom: 50px;
}
</style>
