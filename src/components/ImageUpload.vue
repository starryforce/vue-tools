<script>
export default {
  data: function() {
    return {
      url: '',
      id: 'file1',
    }
  },
  created() {
    this.id += Math.random() * 1000
  },
  methods: {
    getUrl(file) {
      // 创建读取文件的对象
      var reader = new FileReader()

      // 为文件读取成功设置事件
      reader.onload = e => {
        this.url = e.target.result
      }
      if (this.$refs.file.files[0])
        reader.readAsDataURL(this.$refs.file.files[0])
      else this.url = ''
      this.$emit('change', this.$refs.file)
    },
  },
}
</script>

<template>
  <VCard
    flat
    tile
    class="d-flex"
  >
    <VImg
      v-if="url"
      :src="url"
      :lazy-src="url"
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
    <template
      v-else
    >
      <label
        :for="id"
        style="display:flex;justify-content:center"
      >
        <VIcon
          large
        >
          add
        </VIcon>
      </label>
      <input
        :id="id"
        ref="file"
        type="file"
        accept="image/*"
        style="display:none"
        @change="getUrl"
      >
    </template>
  </VCard>
</template>
