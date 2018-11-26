<script>
import Layout from '@layouts/WithToolBar'

export default {
  metaInfo: {
    title: '绑定新图片',
    meta: [{ name: 'description', content: '绑定新图片' }],
  },
  name: 'FaceList',
  components: { Layout },
  props: {
    id: {
      type: String,
      required: true,
      default: '0',
    },
  },
  data() {
    return {
      selection: [],
    }
  },
  created() {},
  methods: {
    confirmBind() {
      console.log(this.selection)
    },
  },
}
</script>

<template>
  <Layout>
    <VItemGroup
      v-model="selection"
      multiple
    >
      <VContainer
        fluid
        grid-list-md
      >
        <VLayout wrap>
          <VFlex
            v-for="i in 10"
            :key="i"
            xs3
          >
            <VItem>
              <VImg
                slot-scope="{ active, toggle }"
                class="white--text"
                :class="{[$style.selected]:active}"
                width="100%"
                height="100%"
                :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`"
                @click="toggle"
              >
                <VFlex
                  xs4
                  offset-xs8
                >
                  <VCheckbox
                    v-model="active"
                    color="primary"
                    :class="$style.identifier"
                  />
                </VFlex>
              </VImg>
            </VItem>
          </VFlex>
        </VLayout>
      </VContainer>
    </VItemGroup>

    <VLayout :class="$style.panel">
      <VFlex>
        <VBtn
          block
          @click="$router.back()"
        >
          取消
        </VBtn>
      </VFlex>
      <VFlex>
        <VBtn
          block
          color="primary"
          dark
          @click="confirmBind"
        >
          确定（{{ selection.length }}）
        </VBtn>
      </VFlex>
    </VLayout>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.panel {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.identifier {
  margin-top: 0;
}
.selected {
  filter: brightness(0.6);
}
</style>
