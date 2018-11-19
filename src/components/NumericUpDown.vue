<template>
  <div class="m-quantity_select">
    <input
      type="button"
      value="-"
      @click="minus"
    >
    <input
      v-model.number="count"
      type="number"
      name="quantity"
      @input="changeQuantity"
    >
    <input
      type="button"
      value="+"
      @click="add"
    >
  </div>
</template>

<script>
export default {
  name: 'NumericUpDown',
  props: {
    value: {
      type: Number,
      default: 1,
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 99,
    },
  },
  data() {
    return {
      countValue: this.value,
    }
  },
  computed: {
    count: {
      get() {
        return Number(this.countValue)
      },
      set(newValue) {
        if (Number.isNaN() || newValue < 0) {
          this.countValue = 0
        } else {
          this.countValue = Number(newValue).toFixed(0)
        }
        if (newValue > this.max) {
          this.countValue = this.max
        }
        if (newValue < this.min) {
          this.countValue = this.min
        }
      },
    },
  },
  watch: {
    value(newValue) {
      this.countValue = newValue
    },
  },
  methods: {
    add() {
      if (this.count < this.max) {
        this.count += 1
        this.$emit('input', this.count)
      }
    },
    minus() {
      if (this.count > this.min) {
        this.count -= 1
        this.$emit('input', this.count)
      }
    },
    changeQuantity() {
      this.$emit('input', this.count)
    },
  },
}
</script>



<style lang="scss">
// stylelint-disable-next-line selector-class-pattern
.m-quantity_select {
  display: flex;
  width: 100%;
  min-width: 4.8rem;
  height: 100%;
  min-height: 1.5rem;
  border-radius: 0.1rem;
  input {
    flex-grow: 1;
    min-width: 30%;
    max-width: 33.34%;
    height: 100%;
    line-height: 1.5rem;
    color: #333;
    text-align: center;
    background-color: #fff;
    border: solid 0.025rem #333;
  }
  input:nth-child(2) {
    border-right: none;
    border-left: none;
    border-radius: 0;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }
  input:first-child {
    border-radius: 0.1rem 0 0 0.1rem;
  }
  input:last-child {
    border-radius: 0 0.1rem 0.1rem 0;
  }
}
</style>
