<script>
import Layout from '@layouts/SubLayout'

export default {
  metaInfo: {
    title: '绑定人脸识别',
    meta: [{ name: 'description', content: '绑定人脸识别' }],
  },
  name: 'MemberFace',
  components: { Layout },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      memberInformation: {},
      dialog: false,
      confirmDialog: false,
      faceDeleting: {},
    }
  },
  created() {
    this.getBaseInformation()
  },
  methods: {
    async getBaseInformation() {
      this.memberInformation = (await this.$api.member.getBaseInformation(
        this.id
      )).customerInfo
    },

    async confirmDelete() {
      try {
        await this.$api.face.unbindFace(this.faceDeleting.ksFaceID)
        this.dialog = false
        this.faceDeleting = {}
        this.$q.notify({
          message: '删除成功',
          type: 'positive',
          position: 'center',
        })
      } catch (error) {
        this.$q.notify({
          message: error.message,
          type: 'negative',
          position: 'center',
        })
      }
    },
    selectFace(face) {
      this.faceDeleting = face
      this.dialog = true
    },
  },
}
</script>

<template>
  <Layout>
    <VList
      two-line
    >
      <VListTile
        avatar
      >
        <VListTileAvatar>
          <img :src="memberInformation.picUrl">
        </VListTileAvatar>
        <VListTileContent>
          <VListTileTitle>{{ memberInformation.customerName }}</VListTileTitle>
          <VListTileSubTitle>
            {{ memberInformation.mobile }}
          </VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </VList>
    <VSubheader>已绑定的照片</VSubheader>
    <VContainer
      fluid
      grid-list-md
    >
      <VLayout
        row
        wrap
      >
        <VFlex
          key="add"
          xs3
        >
          <VBtn
            outline
            fab
            color="primary"
            :class="$style.addNew"
            :to="{ name: 'face-list', params: {id}}"
          >
            <VIcon>add</VIcon>
          </VBtn>
        </VFlex>
        <VFlex
          v-for="face in 20"
          :key="face"
          xs3
        >
          <img
            :src="`https://randomuser.me/api/portraits/men/${face + 20}.jpg`"
            class="image"
            alt="lorem"
            width="100%"
            height="100%"
            @click="selectFace(face)"
          >
        </VFlex>
      </VLayout>
    </VContainer>
    <VDialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <VCard>
        <VToolbar
          dark
          color="primary"
        >
          <VBtn
            icon
            dark
            @click="dialog = false"
          >
            <VIcon>close</VIcon>
          </VBtn>
          <VToolbarTitle>人脸识别编辑</VToolbarTitle>
        </VToolbar>
        <VImg
          :class="$style.preview"
          :aspect-ratio="1"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        />
      </VCard>
      <VLayout :class="$style.panel">
        <VFlex>
          <VBtn
            block
            text--primary
            @click="dialog = false"
          >
            取消
          </VBtn>
        </VFlex>
        <VFlex>
          <VDialog
            v-model="confirmDialog"
            persistent
            :class="$style.button"
          >
            <VBtn
              slot="activator"
              block
              color="error"
              dark
            >
              删除绑定
            </VBtn>
            <VCard>
              <VCardTitle class="headline">
                删除
              </VCardTitle>
              <VCardText>请确认删除该绑定图片。</VCardText>
              <VCardActions>
                <VSpacer />
                <VBtn
                  color="green darken-1"
                  flat
                  @click="dialog = false"
                >
                  取消
                </VBtn>
                <VBtn
                  color="green darken-1"
                  flat
                  @click="confirmDelete"
                >
                  确认
                </VBtn>
              </VCardActions>
            </VCard>
          </VDialog>
        </VFlex>
      </VLayout>
    </VDialog>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.addNew {
  width: 100%;
  height: 100%;
  margin: 0;
  border-style: dashed;
  border-radius: 0;
}
.preview {
  margin-top: 20vw;
}
.panel {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.button {
  width: 100%;
}
</style>
