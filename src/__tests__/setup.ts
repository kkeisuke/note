import { vi } from 'vitest'

// file-saver をモック化（すべてのテストで共通）
vi.mock('file-saver', () => ({
  saveAs: vi.fn()
}))
