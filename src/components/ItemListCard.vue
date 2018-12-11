<script>
export default {
  name: 'ItemListCard',
  props: {
    itemList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      items: {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
      },
    }
  },
}
</script>

<template>
  <VLayout :class="$style.container">
    <VLayout v-if="itemList.length === 1">
      <VFlex xs2>
        <VImg
          :src="itemList[0].picUrl || ''"
          :lazy-src="itemList[0].picUrl || ''"
          aspect-ratio="1"
          class="grey lighten-2"
        />
      </VFlex>
      <VFlex
        xs9
        offset-xs1
      >
        {{ itemList[0].skuName }}
      </VFlex>
    </VLayout>
    <template v-else>
      <VFlex
        v-for="item of itemList"
        :key="item.skuCode"
        :class="$style.item"
      >
        <VImg
          :src="item.picUrl || ''"
          :lazy-src="item.picUrl || ''"
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
      </VFlex>
    </template>
  </VLayout>
</template>

<style lang="scss" module>
@import '@design';
.item {
  flex-basis: 24.25%;
  flex-grow: 0;
  margin-right: 0.75%;
}
.itemName {
  word-wrap: break-word;
}
.container {
  padding: 10px 0;
}
</style>
