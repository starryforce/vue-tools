<template>
  <VContainer
    fluid
    fill-height
  >
    <VLayout
      align-center
      justify-center
    >
      <VFlex
        xs12
        sm8
        md4
      >
        <VCard class="elevation-12">
          <VToolbar
            dark
            color="primary"
          >
            <VToolbarTitle>登录</VToolbarTitle>
          </VToolbar>
          <VCardText>
            <VForm>
              <VTextField
                v-model="mobile"
                prepend-icon="person"
                name="login"
                label="手机号"
                type="text"
              />
              <VTextField
                id="password"
                v-model="password"
                prepend-icon="lock"
                name="password"
                label="密码"
                type="password"
              />
            </VForm>
          </VCardText>
          <VCardActions>
            <VSpacer />
            <VBtn
              color="primary"
              @click="employeeLogin"
            >
              登录
            </VBtn>
          </VCardActions>
        </VCard>
      </VFlex>
    </VLayout>
  </VContainer>
</template>

<script>
export default {
  data: () => ({
    mobile: '',
    password: '',
  }),
  methods: {
    async employeeLogin() {
      try {
        const response = (await this.$api.employee.employeeLogin({
          mobile: this.mobile,
          password: this.password,
        })).data
        const { storeId, token } = response
        this.$store.dispatch('auth/setAuth', {
          storeId,
          token,
        })
        this.$snotify.success('登陆成功')
        this.$router.replace({ name: 'home' })
      } catch (error) {
        this.$snotify.warning(error.data.msg, '登陆失败')
      }
    },
  },
}
</script>

<style lang="scss" module>
@import '@design';
</style>
