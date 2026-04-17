<template>
  <div class="SettingsView p-8 flex flex-col gap-4 bg-gray-100 overflow-y-auto">
    <SettingsBackup />
    <SettingsImport />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SettingsBackup from '@/components/Settings/SettingsBackup.vue'
import SettingsImport from '@/components/Settings/SettingsImport.vue'

export default defineComponent({
  name: 'SettingsView',
  components: {
    SettingsBackup,
    SettingsImport
  }
})
</script>

<style lang="scss" scoped></style>
