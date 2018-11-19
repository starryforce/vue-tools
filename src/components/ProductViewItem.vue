<template>
  <div :class="$style.item">
    <img
      :class="$style.cover"
      src="/assets/images/logo.png"
    >
    <div :class="$style.title2">
      <div :class="$style.line1">
        <span :class="$style.code">
          {{ code }}
        </span>
        <span :class="$style.number">
          {{ num }}件
        </span>
      </div>
      <div :class="$style.line2">
        {{ title }}
      </div>

      <div :class="$style.line3">
        <span :class="$style.spec">
          {{ spec }}
        </span>
        <span :class="$style.price">
          ¥ {{ price }}
        </span>
      </div>
    </div>
    <hr :class="$style.after">
  </div>
</template>

<script>
export default {
  name: 'ProductViewItem',
  props: {
    title: {
      type: String,
      default: '商品',
    },
    spec: {
      type: String,
      default: '默认',
    },
    code: {
      type: String,
      default: '888-888-888',
    },
    num: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      countValue: this.value,
    }
  },
}
</script>

<style lang="scss" module>
@import '@design';

.item {
  float: none;
  // display: flex;
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
    height: 75px;
    margin: 10px 10px 10px 0;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    color: rgba(66, 66, 66, 1);
  }

  // stylelint-disable-next-line selector-class-pattern
  .line1 {
    display: flex;
    height: 14px;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    .code {
      flex-grow: 1;
      width: 50%;
      color: rgba(245, 166, 35, 1);
    }
    .number {
      flex-grow: 1;
      width: 50%;
      color: rgba(230, 67, 64, 1);
      text-align: right;
    }
  }

  // stylelint-disable-next-line selector-class-pattern
  .line2 {
    height: 36px;
    margin-top: 5px;
    overflow: hidden;
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
  }

  // stylelint-disable-next-line selector-class-pattern
  .line3 {
    display: flex;
    height: 14px;
    margin-top: 5px;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    .spec {
      flex-grow: 1;
      width: 50%;
      color: rgba(66, 66, 66, 1);
    }
    .price {
      flex-grow: 1;
      width: 50%;
      color: rgba(230, 67, 64, 1);
      text-align: right;
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
