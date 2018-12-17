<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: 'OrderReturnDetail',
    meta: [{ name: 'description', content: 'OrderReturnDetail' }],
  },
  components: { Layout },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data: function() {
    return { order: {} }
  },
  created() {
    this.loadOrder()
  },
  methods: {
    async submit(isPass) {
      var func =
        (this.order && this.order.state) === ''
          ? this.$api.order.returnPass
          : this.$api.order.returnGoods
      try {
        await func({
          orderID: this.id,
          isPass,
          reason: '',
        })
        this.$snotify.success('请继续下一步', '审核完成')
        this.loadOrder()
      } catch (error) {
        this.$snotify.warning(error.data.msg, '申请失败')
      }
    },
    async loadOrder() {
      this.order = Object.assign(
        {},
        (await this.$api.order.getReturnDetail(this.id)).data
      )
    },
  },
}
</script>

<template>
  <Layout>
    <VList two-line>
      <VListTile
        v-for="it in order.orderDetailList"
        :key="it.skuName"
        avatar
      >
        <VListTileAvatar>
          <VImg :src="it.picUrl" />
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
      <VListTile :class="$style.fullHeight">
        <VListTileSubTitle>退单描述：</VListTileSubTitle>
        <VListTileTitle>
          <VTextarea
            :value="order.discribe"
            auto-grow
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
                v-for="n in order.imgs"
                :key="n"
                xs4
                d-flex
              >
                <VCard
                  flat
                  tile
                  class="d-flex"
                >
                  <VImg
                    :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                    :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
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
    </VList>
    <VLayout :class="$style.panel">
      <VFlex>
        <VBtn
          block
          text--primary
          @click="submit(false)"
        >
          驳回
        </VBtn>
      </VFlex>
      <VFlex>
        <VBtn
          block
          color="primary"
          dark
          @click="submit(true)"
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
