<script>
import Layout from '@layouts/MainLayout'

export default {
  metaInfo: {
    title: '订单详情',
    meta: [{ name: 'description', content: '订单详情' }],
  },
  name: 'OrderDetail',
  components: { Layout },
  data() {
    return {
      tab: 0,
      items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
        },
      ],
    }
  },
}
</script>

<template>
  <Layout>
    <VSubheader>
      <VLayout
        justify-space-between
        align-center
      >
        <VFlex xs10>
          <VChip
            label
            small
            color="#409EFF"
            text-color="white"
          >
            支付宝
          </VChip>
          VX109303546
        </VFlex>
        <VFlex xs2>
          待收货
        </VFlex>
      </VLayout>
    </VSubheader>
    <ul :class="$style.infoList">
      <li>
        <label :class="$style.listLabel">
          订单时间：
        </label>2017-05-01 12:00:00
      </li>
      <li>
        <label :class="$style.listLabel">
          订单编号：
        </label>201720182019
      </li>
      <li>
        <label :class="$style.listLabel">
          消费门店：
        </label>无锡 宝龙店
      </li>
      <li>
        <label :class="$style.listLabel">
          支付方式：
        </label>支付宝
      </li>
      <li>
        <label :class="$style.listLabel">
          配送方式：
        </label>快递
      </li>
    </ul>
    <VList two-line>
      <VListTile
        avatar
      >
        <VListTileAvatar>
          <VImg src="" />
        </VListTileAvatar>
        <VListTileContent>
          <VListTileTitle>年糕妈妈</VListTileTitle>
          <VListTileSubTitle>
            18900000000
          </VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </VList>
    <VList two-line>
      <VListTile
        avatar
      >
        <VListTileAvatar>
          <VImg src="" />
        </VListTileAvatar>

        <VListTileContent>
          <VListTileTitle>尤妮佳（Moony）纸尿裤 L68片（9-14kg）大号婴儿尿不湿</VListTileTitle>
          <VListTileSubTitle>
            <VLayout>
              <VFlex>单价：¥ 99.00</VFlex>
              <VFlex>数量：2</VFlex>
            </VLayout>
          </VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </VList>
    <ul :class="$style.priceList">
      <li :class="$style.priceItem">
        <label :class="$style.listLabel">
          商品总价：
        </label><span>¥ 2999.00</span>
      </li>
      <li :class="$style.priceItem">
        <label :class="$style.listLabel">
          活动优惠
        </label><span>- ¥ 299.09</span>
      </li>
      <li :class="$style.priceItem">
        <label :class="$style.listLabel">
          运费
        </label><span>¥ 29.00</span>
      </li>
      <li :class="$style.priceItem">
        <label :class="[$style.listLabel,$style.priceLabel]">
          实际收款
        </label><span :class="$style.price">
          ¥ 1999.00
        </span>
      </li>
    </ul>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.infoList,
.priceItem {
  line-height: 2;
  list-style-type: none;
}
.listLabel {
  color: #969696;
}
.priceItem {
  display: flex;
  justify-content: space-between;
  padding-right: 18px;
}
.priceLabel {
  font-size: 16px;
  font-weight: bold;
  color: #212121;
}
.price {
  font-size: 16px;
  font-weight: bold;
  color: $color-brand;
}
</style>
