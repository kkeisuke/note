import { describe, expect, test } from 'vitest'
import { UseFilenameFormatter } from '@/formatter/UseFilenameFormatter'

describe('formatter/UseFilenameFormatter', () => {
  describe('sanitize', () => {
    test('不正文字を置換する', () => {
      const { sanitize } = UseFilenameFormatter()
      expect(sanitize('test/file:name*')).toBe('test_file_name_')
      expect(sanitize('file\\name?')).toBe('file_name_')
      expect(sanitize('file"<>|name')).toBe('file_name')
    })

    test('前後の空白を削除する', () => {
      const { sanitize } = UseFilenameFormatter()
      expect(sanitize('  test  ')).toBe('test')
      expect(sanitize('\ttest\t')).toBe('test')
    })

    test('連続するアンダースコアを1つにする', () => {
      const { sanitize } = UseFilenameFormatter()
      expect(sanitize('test___file')).toBe('test_file')
      expect(sanitize('a//b')).toBe('a_b')
    })

    test('空文字列はデフォルト名になる', () => {
      const { sanitize } = UseFilenameFormatter()
      expect(sanitize('')).toBe('untitled')
      expect(sanitize('   ')).toBe('untitled')
      expect(sanitize('/')).toBe('untitled')
    })

    test('長すぎるファイル名を切り詰める', () => {
      const { sanitize } = UseFilenameFormatter()
      const longName = 'a'.repeat(300)
      const result = sanitize(longName)
      expect(result.length).toBe(200)
      expect(result).toBe('a'.repeat(200))
    })
  })

  describe('generateUnique', () => {
    test('重複がない場合はそのまま返す', () => {
      const { generateUnique } = UseFilenameFormatter()
      const existing = new Set<string>()
      expect(generateUnique('memo', existing)).toBe('memo')
    })

    test('重複がある場合は番号を付与する', () => {
      const { generateUnique } = UseFilenameFormatter()
      const existing = new Set(['memo.md'])
      expect(generateUnique('memo', existing)).toBe('memo_1')
    })

    test('複数の重複がある場合は連番を付与する', () => {
      const { generateUnique } = UseFilenameFormatter()
      const existing = new Set(['memo.md', 'memo_1.md', 'memo_2.md'])
      expect(generateUnique('memo', existing)).toBe('memo_3')
    })

    test('不正文字も処理する', () => {
      const { generateUnique } = UseFilenameFormatter()
      const existing = new Set<string>()
      expect(generateUnique('test/file', existing)).toBe('test_file')
    })

    test('空タイトルの重複も処理する', () => {
      const { generateUnique } = UseFilenameFormatter()
      const existing = new Set(['untitled.md'])
      expect(generateUnique('', existing)).toBe('untitled_1')
    })
  })
})
