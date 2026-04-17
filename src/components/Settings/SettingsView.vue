<template>
  <div class="SettingsView p-8 flex flex-col gap-4 bg-gray-100 overflow-y-auto">
    <!-- 戻るボタン -->
    <div>
      <button class="flex items-center gap-1 text-gray-700 hover:opacity-70 transition-opacity" @click="$emit('back')">
        <SvgIcon icon="chevron-double-left" class="h-4 w-4" />
        <span class="text-sm">Back</span>
      </button>
    </div>
    <SettingsBackup />
    <SettingsImport />
    <SettingsReset />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SettingsBackup from '@/components/Settings/SettingsBackup.vue'
import SettingsImport from '@/components/Settings/SettingsImport.vue'
import SettingsReset from '@/components/Settings/SettingsReset.vue'
import SvgIcon from '@/components/Common/SvgIcon.vue'

export default defineComponent({
  name: 'SettingsView',
  components: {
    SettingsBackup,
    SettingsImport,
    SettingsReset,
    SvgIcon
  },
  emits: ['back']
})
</script>

<style lang="scss" scoped></style>
