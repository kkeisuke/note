import { ref, computed, type ComputedRef } from 'vue'

export const UseSettingsView = (): {
  showSettings: ComputedRef<boolean>
  toggleSettings: () => void
} => {
  const showSettings = ref(false)

  function toggleSettings() {
    showSettings.value = !showSettings.value
  }

  return {
    showSettings: computed(() => showSettings.value),
    toggleSettings
  }
}
