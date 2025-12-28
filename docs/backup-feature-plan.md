# IndexedDB 全ノートバックアップ機能 実装計画

## 概要

IndexedDB に保存されている全ノートを .md ファイルとして ZIP 形式でバックアップする機能を実装します。

## 要件

- **対象範囲**: 全ノートを一括バックアップ
- **ファイル形式**: 各ノートを個別の .md ファイルとして ZIP にまとめる
- **ファイル名**: ノートのタイトルを使用
- **圧縮ライブラリ**: fflate を使用（軽量・高速）
- **UI**: 不要（ロジックのみ実装）
- **復元機能**: 不要

## 実装するファイル

### 1. 新規作成ファイル

#### `src/formatter/UseFilenameFormatter.ts`
ファイル名を安全化するフォーマッター関数（Composition API パターン）。

**責務**:
- OS で使用できない文字（`/`, `\`, `:`, `*`, `?`, `"`, `<`, `>`, `|`）を `_` に置換
- 空タイトルの場合は `untitled` を返す
- 重複ファイル名に連番を付与（`memo.md`, `memo_1.md`, `memo_2.md`）
- 最大長制限（200文字）

**公開インターフェース**:
```typescript
export const UseFilenameFormatter = (): {
  sanitize: (filename: string) => string
  generateUnique: (filename: string, existingFilenames: Set<string>) => string
}
```

#### `src/components/NoteList/use/UseNoteBackup.ts`
バックアップ機能の Composition API。

**責務**:
- `injectUseNoteCollection()` で全ノートを取得
- fflate で ZIP ファイルを生成
- file-saver でダウンロード
- ファイル名の sanitization 処理

**公開インターフェース**:
```typescript
export const UseNoteBackup = (): { backup: () => Promise<boolean> }
```

#### `src/__tests__/formatter/UseFilenameFormatter.spec.ts`
ファイル名フォーマットのユニットテスト。

**テストケース**:
- 不正文字の置換
- 空タイトルのデフォルト名生成
- 重複ファイル名の処理
- 長いファイル名の切り詰め

#### `src/__tests__/components/UseNoteBackup.spec.ts`
UseNoteBackup のユニットテスト。

**テストケース**:
- 複数ノートのバックアップ
- 空のノートリスト
- エラーハンドリング

### 2. 修正が必要なファイル

#### `package.json`
fflate を dependencies に追加:
```json
{
  "dependencies": {
    "fflate": "^0.8.2"
  }
}
```

## 実装の詳細

### UseNoteBackup.ts

```typescript
export const UseNoteBackup = (): { backup: () => Promise<boolean> }
```

**処理フロー**:
1. `injectUseNoteCollection()` で全ノートを取得
2. 各ノートを `generateUniqueFilename()` でファイル名を生成
3. `fflate.zipSync()` で ZIP を生成
4. `file-saver.saveAs()` でダウンロード

### UseFilenameFormatter.ts

```typescript
export const UseFilenameFormatter = (): {
  sanitize: (filename: string) => string
  generateUnique: (filename: string, existingFilenames: Set<string>) => string
}
```

**sanitize の処理**:
- 前後の空白を削除
- OS で使用できない文字を `_` に置換
- 連続するアンダースコアを1つに
- 空文字列は `untitled` に変換
- 最大長200文字に制限

**generateUnique の処理**:
- `sanitize()` で安全化
- 重複がある場合は連番を付与（`_1`, `_2`, ...）

## エッジケース対応

| ケース | 入力例 | 出力例 |
|--------|--------|--------|
| 不正文字 | `"My/Note:File"` | `"My_Note_File.md"` |
| 空タイトル | `""` | `"untitled.md"` |
| 空白のみ | `"   "` | `"untitled.md"` |
| 重複（1回目） | `"memo"` | `"memo.md"` |
| 重複（2回目） | `"memo"` | `"memo_1.md"` |
| 重複（3回目） | `"memo"` | `"memo_2.md"` |
| 長すぎる | `"a" * 300` | 先頭200文字 + `.md` |
| 日本語 | `"メモ/テスト"` | `"メモ_テスト.md"` |
| 空のコンテンツ | `content: ""` | 空の .md ファイルとして保存 |
| 0件のノート | `notes.length === 0` | 何もダウンロードせず警告表示 |

## 実装ステップ

### 1. 環境準備
```bash
npm install fflate
```

### 2. フォーマッター実装
- `src/formatter/UseFilenameFormatter.ts` を実装
- テスト `src/__tests__/formatter/UseFilenameFormatter.spec.ts` を作成
- `npm run test:unit` で動作確認

### 3. バックアップ機能実装
- `UseNoteBackup.ts` を実装
- テスト `src/__tests__/components/UseNoteBackup.spec.ts` を作成
- `npm run test:unit` で動作確認

## 技術的選択の理由

### fflate を選択した理由
- **軽量**: jszip (約 100KB) に対して fflate は約 25KB
- **高速**: 同期処理が可能で、パフォーマンスが優れている
- **TypeScript ネイティブ**: 型定義が組み込まれている
- **シンプルな API**: `zipSync()` で簡単に ZIP 生成可能

### ZIP 形式を選択した理由
- **ユーザーエクスペリエンス**: 1回のダウンロードで完結
- **整合性**: バックアップ時点のスナップショットとして保存
- **ブラウザ互換性**: ポップアップブロックの影響を受けない
- **業界標準**: Google Takeout などで採用されているパターン

## 重要なファイルパス

### 参照するファイル
- `src/components/NoteList/use/UseNoteDownload.ts` - file-saver の使用パターン
- `src/store/UseNoteCollection.ts` - 全ノート取得方法
- `src/entity/Note.ts` - Note 型定義

### 新規作成するファイル
- `src/formatter/UseFilenameFormatter.ts` - ファイル名フォーマット
- `src/components/NoteList/use/UseNoteBackup.ts` - バックアップ機能
- `src/__tests__/formatter/UseFilenameFormatter.spec.ts` - テスト
- `src/__tests__/components/UseNoteBackup.spec.ts` - テスト

### 修正するファイル
- `package.json` - fflate 依存関係追加

## アーキテクチャへの適合

- **Repository Pattern の遵守**: `injectUseNoteCollection()` 経由でデータ取得
- **Composition API の活用**: provide/inject パターンを使用
- **既存パターンとの整合性**: UseNoteDownload と同様の構造
- **型安全性**: TypeScript で完全に型定義

## 将来の拡張可能性

現在の設計では復元機能は実装しませんが、将来的に必要になった場合:

```typescript
// UseNoteRestore.ts を作成
import { unzipSync, strFromU8 } from 'fflate'

export const UseNoteRestore = (): { restore: (file: File) => Promise<void> } => {
  async function restore(file: File): Promise<void> {
    const arrayBuffer = await file.arrayBuffer()
    const unzipped = unzipSync(new Uint8Array(arrayBuffer))

    for (const [filename, data] of Object.entries(unzipped)) {
      const content = strFromU8(data)
      const title = filename.replace(/\.md$/, '')
      // リポジトリに追加
    }
  }

  return { restore }
}
```

この設計により、復元機能の追加も容易になります。
