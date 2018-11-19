<template>
  <div :class="$style.item">
    <img
      :class="$style.cover"
      src="/assets/images/logo.png"
    >
    <div :class="$style.title2">
      美国Jason天然薰衣草健康薰衣草健康呵护洗手液473ml 6个月
    </div>
    <div :class="$style.right">
      <div :class="$style.price">
        ¥ {{ price }}
      </div>
      <div :class="$style.updown">
        <slot
          slot-scope="updown"
          :alt="updown"
        />
      </div>
    </div>
    <hr :class="$style.after">
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    price: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      countValue: this.price,
    }
  },
}
</script>

<style lang="scss" module>
@import '@design';

.item {
  // display: flex;
  float: none;
  width: 375px;
  height: 95px;
  clear: both;
  background: rgba(255, 255, 255, 1);
  .cover {
    display: block;
    float: left;
    width: 75px;
    height: 75px;
    margin: 10px 10px 9px 10px;
  }

  // stylelint-disable-next-line selector-class-pattern
  .title2 {
    float: left;
    width: 270px;
    height: 36px;
    margin: 10px 10px 10px 0;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    color: rgba(66, 66, 66, 1);
  }
  .right {
    float: left;
    width: 270px;
    margin: 0 10px 0 0;
    .price {
      float: left;
      width: 68px;
      height: 16px;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      color: rgba(230, 162, 60, 1);
    }
    .updown {
      float: right;
    }
  }
  .after {
    float: none;
    height: 0;
    margin-left: 10px;
    clear: both;
    border: none;
    border-top: solid 1px #ddd;
  }
}
</style>
