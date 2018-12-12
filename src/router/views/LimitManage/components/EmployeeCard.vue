<script>
export default {
  name: 'EmployeeCard',
  props: {
    remain: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      credit: 2000,
    }
  },
  methods: {
    assignCredit() {
      this.dialog = false
      // console.log(this.credit)
    },
  },
}
</script>

<template>
  <VList>
    <VListTile avatar>
      <VListTileAvatar>
        <img src="">
      </VListTileAvatar>
      <VListTileContent>
        <VListTileTitle>大幅度（店长）</VListTileTitle>
      </VListTileContent>
      <VListTileAction>
        <VDialog
          v-model="dialog"
          lazy
          persistent
        >
          <VBtn
            slot="activator"
            color="red lighten-2"
            dark
          >
            调整
          </VBtn>
          <VCard>
            <VCardText>
              <VLayout>
                <VFlex xs9>
                  <VSlider
                    v-model="credit"
                    :max="remain"
                    label="剩余"
                  />
                </VFlex>
                <VFlex xs3>
                  <VTextField
                    v-model="credit"
                    type="number"
                    prefix="￥"
                  />
                </VFlex>
              </VLayout>
            </VCardText>

            <VCardActions>
              <VSpacer />
              <VBtn
                flat
                @click="dialog = false"
              >
                取消
              </VBtn>
              <VBtn
                color="primary"
                flat
                @click="assignCredit"
              >
                确定
              </VBtn>
            </VCardActions>
          </VCard>
        </VDialog>
      </VListTileAction>
    </VListTile>
    <VDivider />
    <VListTile>
      <VListTileContent>
        <VListTileTitle>分配额度</VListTileTitle>
      </VListTileContent>
      <VListTileAction>￥5000</VListTileAction>
    </VListTile>
    <VDivider />
    <VListTile>
      <VListTileContent>
        <VListTileTitle>剩余</VListTileTitle>
      </VListTileContent>
      <VListTileAction>￥5000</VListTileAction>
    </VListTile>
    <VDivider />
  </VList>
</template>

<style lang="scss" module>
@import '@design';
</style>
