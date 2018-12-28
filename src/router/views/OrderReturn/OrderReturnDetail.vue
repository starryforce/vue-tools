<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: '退单详情',
    meta: [{ name: 'description', content: '退单详情' }],
  },
  name: 'OrderReturnDetail',
  components: { Layout },
  props: {
    id: {
      type: String,
      required: true,
    },
    state: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      order: {},
      reason: '',
    }
  },
  computed: {
    /**
     * @description 退货商品，单笔退货仅有一种商品
     */
    returnItem() {
      if (this.order.orderDetailList && this.order.orderDetailList.length) {
        return this.order.orderDetailList.filter(item => item.num !== '0')
      } else {
        return []
      }
    },
  },
  created() {
    this.getReturnDetail()
  },
  methods: {
    async getReturnDetail() {
      this.order = (await this.$api.order.getReturnDetail(this.id)).data
    },
    async confirm(isPass) {
      let func
      if (this.state === 0) {
        func = this.$api.order.confirmReturn
      } else if (this.state === 3) {
        func = this.$api.order.confirmReturnItem
      }
      try {
        await func({
          orderID: this.id,
          isPass,
          reason: this.reason,
        })
        this.$snotify.success('请继续下一步', '审核完成')
      } catch (error) {
        this.$snotify.warning(error.data.msg, '申请失败')
      }
    },
  },
}
</script>

<template>
  <Layout>
    <VList two-line>
      <VListTile
        v-for="it in returnItem"
        :key="it.skuName"
        avatar
      >
        <VListTileAvatar tile>
          <VImg :src="it.picUrl || ''" />
        </VListTileAvatar>

        <VListTileContent>
          <VListTileSubTitle> {{ it.skuName }}</VListTileSubTitle>
          <VListTileSubTitle>
            <VLayout>
              <VFlex>总价：¥ {{ it.salePrice }}</VFlex>
              <VFlex>数量：{{ it.num }}</VFlex>
            </VLayout>
          </VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </VList>
    <VList :class="$style.form">
      <VListTile>
        <VListTileSubTitle>退单号:</VListTileSubTitle>
        <VListTileTitle>{{ order.no }}</VListTileTitle>
      </VListTile>
      <VListTile>
        <VListTileSubTitle>购买人：</VListTileSubTitle>
        <VListTileTitle>{{ order.nick }}</VListTileTitle>
      </VListTile>
      <VListTile>
        <VListTileSubTitle>联系电话：</VListTileSubTitle>
        <VListTileTitle>{{ order.phone }}</VListTileTitle>
      </VListTile>
      <VListTile>
        <VListTileSubTitle>申请时间：</VListTileSubTitle>
        <VListTileTitle>{{ order.time }}</VListTileTitle>
      </VListTile>
      <VListTile>
        <VListTileSubTitle>退单金额：</VListTileSubTitle>
        <VListTileTitle>{{ order.returnFee | currency }}</VListTileTitle>
      </VListTile>
      <VListTile :class="$style.fullHeight">
        <VListTileSubTitle>退单描述：</VListTileSubTitle>
        <VListTileTitle>
          <VTextarea
            :value="order.discribe"
            auto-grow
            disabled
          />
        </VListTileTitle>
      </VListTile>
      <VListTile :class="$style.fullHeight">
        <VListTileSubTitle>截图说明：</VListTileSubTitle>
        <VListTileTitle>
          <VContainer
            grid-list-sm
            fluid
          >
            <VLayout
              row
              wrap
            >
              <VFlex
                v-for="imgUrl in order.imgs"
                :key="imgUrl"
                xs4
                d-flex
              >
                <VCard
                  flat
                  tile
                  class="d-flex"
                >
                  <VImg
                    :src="imgUrl"
                    :lazy-src="imgUrl"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <VLayout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <VProgressCircular
                        indeterminate
                        color="grey lighten-5"
                      />
                    </VLayout>
                  </VImg>
                </VCard>
              </VFlex>
            </VLayout>
          </VContainer>
        </VListTileTitle>
      </VListTile>
      <VListTile
        v-if="state === 0 || state === 3"
        :class="$style.fullHeight"
      >
        <VListTileSubTitle>审核备注：</VListTileSubTitle>
        <VListTileTitle>
          <VTextarea
            v-model="reason"
            auto-grow
            placeholder="例如：人为损坏"
          />
        </VListTileTitle>
      </VListTile>
    </VList>
    <VLayout
      v-if="state === 0 || state === 3"
      :class="$style.panel"
    >
      <VFlex>
        <VBtn
          block
          color="error"
          @click="confirm(false)"
        >
          驳回
        </VBtn>
      </VFlex>
      <VFlex>
        <VBtn
          block
          color="primary"
          @click="confirm(true)"
        >
          确认
        </VBtn>
      </VFlex>
    </VLayout>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.form {
  padding-bottom: 50px;
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile) {
    height: 32px;
  }
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile__sub-title) {
    width: 100px;
  }
}
.fullHeight {
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile__title) {
    height: 100%;
  }
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile) {
    height: 100%;
  }
}
.panel {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
