export const UseFilenameFormatter = (): {
  sanitize: (filename: string) => string
  generateUnique: (filename: string, existingFilenames: Set<string>) => string
} => {
  function sanitize(filename: string): string {
    const maxLength = 200

    // 1. 前後の空白を削除、2. OS で使用できない文字を置換、3. 連続するアンダースコアを1つに
    const processed = filename
      .trim()
      .replace(/[/\\:*?"<>|]/g, '_')
      .replace(/_+/g, '_')

    // 4. 空文字列の場合のデフォルト名
    const defaulted = processed === '' || processed === '_' ? 'untitled' : processed

    // 5. 最大長制限
    return defaulted.length > maxLength ? defaulted.substring(0, maxLength) : defaulted
  }

  function generateUnique(filename: string, existingFilenames: Set<string>): string {
    const sanitized = sanitize(filename)

    const findUniqueName = (base: string, count: number): string => {
      const candidate = count === 0 ? base : `${base}_${count}`
      return existingFilenames.has(`${candidate}.md`) ? findUniqueName(base, count + 1) : candidate
    }

    return findUniqueName(sanitized, 0)
  }

  return {
    sanitize,
    generateUnique
  }
}
