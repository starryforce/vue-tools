<template>
  <div :class="$style.item">
    <img
      :class="$style.cover"
      :src="cover"
    >
    <div :class="$style.title">
      {{ title }}
    </div>
    <div :class="$style.linetwo">
      <div :class="$style.price">
        ¥ {{ price }}
      </div>
      <div :class="$style.slot">
        <slot slot-scope />
      </div>
    </div>
    <hr :class="$style.after">
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    title: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 999,
    },
    cover: {
      type: String,
      default: '',
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
.item {
  float: none;
  width: 100%;
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

  .title {
    float: left;
    width: calc(100% - 105px);
    height: 36px;
    margin: 10px 10px 10px 0;
    overflow: hidden;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    color: rgba(66, 66, 66, 1);
  }
  .linetwo {
    display: flex;
    float: left;
    width: calc(100% - 105px);
    margin: 0 10px 0 0;
    .price {
      width: 40%;
      height: 16px;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      color: rgba(230, 162, 60, 1);
    }
    .slot {
      width: 60%;
    }
  }
  .after {
    float: none;
    height: 0;
    margin-left: 10px;
    clear: both;
    border: none;
    border-top: solid 1px #dfdfdf;
  }
}
</style>
