<script>
import Layout from '@layouts/WithToolBar'

export default {
  metaInfo: {
    title: '会员标签',
    meta: [{ name: 'description', content: 'MemberLabelModify' }],
  },
  components: { Layout },
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <Layout>
    <VContainer>
      <VFlex>
        <VTextField
          label="标签名称"
          outline
          :disabled="mode === 'edit'"
        />
      </VFlex>
      <VBtn
        v-if="mode === 'edit'"
        flat
        :color="$style['color-button-danger']"
      >
        删除标签
      </VBtn>
    </VContainer>
    <VSubheader>会员列表（0）</VSubheader>
    <VContainer
      fluid
      grid-list-lg
    >
      <VLayout
        row
        wrap
      >
        <VFlex xs3>
          <VAvatar

            :size="$style['width-avatar']"
          >
            <VIcon
              :class="$style.addIcon"
              dark
            >
              person_add
            </VIcon>
          </VAvatar>
          <p :class="$style.memberName">
            添加会员
          </p>
        </VFlex>
        <VFlex
          v-for="i in 6"
          :key="i"
          xs3
        >
          <VAvatar :size="$style['width-avatar']">
            <img
              :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`"
              alt="lorem"
              class="image"
              height="100%"
              width="100%"
            >
          </VAvatar>
          <p :class="$style.memberName">
            {{ i }}
          </p>
        </VFlex>
      </VLayout>
    </VContainer>
    <VLayout :class="$style.button">
      <VFlex v-if="mode === 'edit'">
        <VBtn
          block
          large
          @click="$router.back()"
        >
          返回
        </VBtn>
      </VFlex>
      <VFlex>
        <VBtn
          :color="$style['color-brand-light']"
          dark
          block
          large
        >
          确定
        </VBtn>
      </VFlex>
    </VLayout>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
:export {
  // stylelint-disable property-no-unknown
  width-avatar: 20vw;
  color-brand-light: $color-brand-light;
  color-button-danger: $color-button-danger;
}
.addIcon {
  background-color: $color-brand-light;
}
.memberName {
  font-size: 14px;
  color: $color-brand-light;
  text-align: center;
}
.button {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
