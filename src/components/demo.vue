<template>
  <div>
    <button @click="onChangenum(-1)">-</button>
    <input
      type="text"
      :value="value"
      @input="onInput"
      :placeholder="placeholder"
      @blur="$emit('blur', $event.target.value)"
    >
    <button @click="onChangenum(1)">+</button>

    <slot name="a" :sonm="msg"></slot>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data () {
    return {
      msg: 'demo data',
      obj: {
        name: 'zs'
      }
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: 2
    },
    max: {
      type: Number,
      default: 9
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    onChangenum (num) {
      let res = this.value + num
      if (res < this.min) {
        res = this.min
      }
      if (res > this.max) {
        res = this.max
      }
      this.$emit('input', res)
    },
    onInput (e) {
      const res = Number.parseInt(e.target.value)
      if (res) {
        this.$emit('input', res)
      } else {
        this.$emit('input', this.min)
      }
    }
  }
}
</script>

<style>

</style>
