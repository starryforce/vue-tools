<script>
import Layout from '@layouts/SubLayout'

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
    },
  },
  data() {
    return {
      todayFaceList: [],
      selection: {},
    }
  },
  async created() {
    this.todayFaceList = (await this.$api.face.todayFaceList()).toShopList
  },
  methods: {
    async confirmBind() {
      await this.$api.face.bindFace({
        memberID: this.id,
        ksFaceID: this.selection.ksFaceId,
      })
    },
  },
}
</script>

<template>
  <Layout>
    <VItemGroup
      v-model="selection"
    >
      <VContainer
        fluid
        grid-list-md
      >
        <VLayout wrap>
          <VFlex
            v-for="face in todayFaceList"
            :key="face.ksFaceId"
            xs3
          >
            <VItem>
              <VImg
                slot-scope="{ active, toggle }"
                class="white--text"
                :class="{[$style.selected]:active}"
                width="100%"
                height="100%"
                :src="face.picUrl"
                @click="toggle"
              >
                <VFlex
                  xs4
                  offset-xs8
                >
                  <VCheckbox
                    :value="active"
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
          确定
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
