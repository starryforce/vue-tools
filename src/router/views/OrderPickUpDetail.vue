<script>
import Layout from '@layouts/main'

export default {
  metaInfo: {
    title: '自提单详情',
    meta: [{ name: 'description', content: 'OrderPickUpDetail' }],
  },
  components: { Layout },
  data() {
    return {
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        },
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
    <VList :class="$style.form">
      <VListTile>
        <VListTileSubTitle>退单号:</VListTileSubTitle>
        <VListTileTitle>VX902324356</VListTileTitle>
      </VListTile>
      <VListTile>
        <VListTileSubTitle>申请人：</VListTileSubTitle>
        <VListTileTitle>年糕妈妈</VListTileTitle>
      </VListTile>
      <VListTile>
        <VListTileSubTitle>联系电话：</VListTileSubTitle>
        <VListTileTitle>190000000000</VListTileTitle>
      </VListTile>
      <VListTile>
        <VListTileSubTitle>申请时间：</VListTileSubTitle>
        <VListTileTitle>2018-09-09 12:00</VListTileTitle>
      </VListTile>
    </VList>
    <VList two-line>
      <template v-for="(item, index) in items">
        <VDivider
          v-if="index"
          :key="index"
        />

        <VListTile
          :key="item.title"
          avatar
        >
          <VListTileAvatar>
            <img :src="item.avatar">
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>尤妮佳（Moony）纸尿裤 L68片（9-14kg）大号婴儿尿不湿</VListTileTitle>
            <VListTileSubTitle>数量：2</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </template>
    </VList>

    <VLayout :class="$style.button">
      <VBtn
        :color="$style['color-brand-light']"
        dark
        large
        block
      >
        <VIcon
          left
          dark
        >
          cloud_upload
        </VIcon>
        扫码自提
      </VBtn>
    </VLayout>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
:export {
  // stylelint-disable-next-line property-no-unknown
  color-brand-light: $color-brand-light;
}
.form {
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile) {
    height: 32px;
  }
  // stylelint-disable-next-line selector-class-pattern
  :global(.v-list__tile__sub-title) {
    width: 100px;
  }
}
.button {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
