import * as settingsModule from './settings'

describe('@state/modules/settings', () => {
  it('exports a valid Vuex module', () => {
    expect(settingsModule).toBeAVuexModule()
  })
})
