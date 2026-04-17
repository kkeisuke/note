# ローカル Markdown ファイル インポート機能 実装計画

## 概要

ローカルにある複数の `.md` ファイルを選択して、それぞれを 1 ノートとして IndexedDB に取り込む機能を実装します。`UseNoteBackup` の逆操作にあたり、別 PC への移行や既存 Markdown 資産の取り込みを主な利用シーンとして想定します。

## 要件

- **入力**: 複数の `.md` ファイル（`<input type="file" accept=".md" multiple>`）
- **タイトル**: ファイル名から `.md` 拡張子を除いた文字列
- **本文**: ファイルの中身をそのまま `content` に保存
- **重複処理**: 既存ノートと同タイトルでも常に新規ノートとして追加
- **配置**: Settings 画面に `SettingsBackup` と並ぶカードとして追加
- **入力ソース**: ファイル選択ダイアログのみ（ZIP 直接取り込みやドラッグ&ドロップは対象外）

## 実装するファイル

### 1. 新規作成ファイル

#### `src/components/Settings/use/UseNoteImport.ts`

インポート機能の Composition API。`UseNoteBackup` と対称な構造。

**責務**:
- `File[]` を受け取り、各ファイルを `file.text()` で読み込み
- ファイル名から `.md` 拡張子を除去してタイトルに変換
- `injectUseNoteCollection().addMany()` で bulk 追加
- 処理状態 / 結果 / 件数を ref で管理

**公開インターフェース**:
```typescript
export const UseNoteImport = (): {
  importFiles: (files: File[]) => Promise<void>
  isProcessing: ComputedRef<boolean>
  importResult: ComputedRef<boolean | null>
  importedCount: ComputedRef<number>
}
```

#### `src/components/Settings/SettingsImport.vue`

`SettingsBackup.vue` と対称な構造の設定セクション。

**責務**:
- `Card` でラップした見出し / 説明 / ボタン / 結果メッセージ
- `BaseButton` クリックで隠し `BaseFileInput` を `open()`
- 結果に応じて成功 (`Imported {n} notes`) / 失敗 (`Import failed ...`) を表示

#### `src/components/Common/BaseFileInput.vue`

ファイル選択 input を再利用可能にした基底コンポーネント。

**責務**:
- ルート要素 `<input type="file">` のみのシンプル構成
- `accept` / `multiple` / `hidden` などの標準属性は `inheritAttrs` で親から自動バインド
- `change` イベントで `File[]` を emit
- `open()` メソッドを `expose` し、親の `ref` 経由で外部から呼び出し可能
- 同一ファイル再選択を許容するため、change ハンドラ内で `target.value = ''` にリセット

**公開インターフェース**:
```typescript
emits: { change: (files: File[]) => boolean }
expose: { open: () => void }
```

#### `src/__tests__/components/UseNoteImport.spec.ts`

`UseNoteBackup.spec.ts` のパターンに倣ったユニットテスト。

**テストケース**:
- 複数 `.md` ファイルをインポートできる（タイトル / 本文の保存検証）
- 空配列では `importResult` が `false` になる
- ファイル名から `.md` 拡張子が除かれる

### 2. 修正が必要なファイル

#### `src/store/UseNoteCollection.ts`

bulk 追加用の `addMany` を追加。N 件追加するときに毎回 `fetch()` が走らないよう、ループ内では `repo.add()` のみ呼び、最後に 1 回だけ `fetch()` する。

```typescript
async function addMany(partials: Array<Pick<Note, 'title' | 'content'>>): Promise<number> {
  let count = 0
  for (const partial of partials) {
    const note: Note = { ...getDefaultNote(), ...partial }
    await repo.add(note)
    count++
  }
  await fetch()
  return count
}
```

戻り値は成功件数で、UI の成功メッセージに使用。既存の `add()` には変更を加えない。

#### `src/components/Settings/SettingsView.vue`

`SettingsImport` を `SettingsBackup` の隣に追加（カード間余白 `gap-4` は既設）。

#### `src/repository/mock/NoteCollectionMockRepository.ts`

mock の `add()` が引数 `note` の `title` / `content` を `title{n}` / `content{n}` で常時上書きしていたため、インポートテストで渡したタイトルを検証できなかった。`title` / `content` が空文字列のときだけダミーを採番する仕様に変更し、既存テストとの互換性も維持する。

```typescript
async add(note: Note) {
  const index = noteMockRepository.notes.length
  note.id = `test${index}`
  if (note.title === '') {
    note.title = `title${index}`
  }
  if (note.content === '') {
    note.content = `content${index}`
  }
  noteMockRepository.notes.push(note)
  return note.id
}
```

## 仕様の詳細

### タイトル変換

ファイル名から `.md`（大文字小文字無視）の拡張子のみを取り除き、その他の加工はしない。

| 入力ファイル名 | 生成されるタイトル |
|----------------|--------------------|
| `memo.md`      | `memo`             |
| `daily-note.MD` | `daily-note`      |
| `2026-04-17.md` | `2026-04-17`      |
| `日本語メモ.md` | `日本語メモ`        |

### 重複処理

タイトルが既存ノートと衝突しても判定せず、常に新規追加する。これは「バックアップで作成した ZIP を別 PC で取り込む」という主用途で、情報を欠損させないことを優先するため。

### エラー処理

| ケース                       | 結果                            |
|------------------------------|---------------------------------|
| ファイル選択ダイアログでキャンセル | `importResult = false` (件数 0)  |
| `file.text()` で例外          | `importResult = false`          |
| `addMany()` 内で例外          | `importResult = false`          |
| 1 件以上成功                  | `importResult = true` (件数 N)  |

## 再利用しているもの

- `UseNoteBackup` のコンポーザブル構造（`isProcessing` / `result` ref + 非同期エントリ関数）
- `BaseButton` の `loading` / `loadingText` プロパティ
- `Card` コンポーネント
- `injectUseNoteCollection()` の `notes` / `fetch`
- テスト雛形: `src/__tests__/components/UseNoteBackup.spec.ts`

## 検証

1. `npm run type-check` — 型エラーなし
2. `npm run lint` — ESLint 警告なし
3. `npm run test:unit` — 既存 + 新規テスト通過
4. `npm run dev` でブラウザ動作確認:
   - Settings を開き `Import Notes` をクリック
   - バックアップ ZIP を解凍した `.md` ファイルを複数選択
   - 成功メッセージが表示され、サイドバーに追加されたノートが並ぶ
   - 中身を開き Markdown が崩れていないことを確認
   - 同じファイルを再度選択しても取り込めること（`BaseFileInput` 内のリセット動作）
   - キャンセル時に失敗メッセージが表示されること

## 設計の補足

### `BaseFileInput` を切り出した理由

`<input type="file">` を直接テンプレートに書くと、隠し input + ボタン経由クリック + 再選択用リセットといった定型コードが各画面に散らばる。`BaseFileInput` でカプセル化することで:

- `accept` / `multiple` / `hidden` などの標準属性は `inheritAttrs`（既定 true）により親で書いたものが自動的に `<input>` へ伝搬する
- `change` の戻り値を `File[]` に正規化（`FileList` 経由のキャストを各箇所に書かない）
- `open()` を `expose` することで、ボタンと input の関係をテンプレート ref で疎結合に保てる

### `addMany` を `add` と分けた理由

既存の `add()` は `getDefaultNote()` を使って引数なしで呼ばれる前提の API（呼び出し箇所: `UseNoteAdd`）。インポートのために引数オーバーロードを追加すると呼び出し側の意味が曖昧になるため、用途別の別メソッドとした。`addMany` 内では `fetch()` を最後に 1 回だけ呼ぶことで、N 件追加時の Dexie 再クエリを抑える。

## 重要なファイルパス

### 新規作成するファイル

- `src/components/Common/BaseFileInput.vue` — ファイル選択 input の基底コンポーネント
- `src/components/Settings/SettingsImport.vue` — インポート設定セクション
- `src/components/Settings/use/UseNoteImport.ts` — インポート機能のロジック
- `src/__tests__/components/UseNoteImport.spec.ts` — テスト

### 修正するファイル

- `src/store/UseNoteCollection.ts` — `addMany` 追加
- `src/components/Settings/SettingsView.vue` — `SettingsImport` を配置
- `src/repository/mock/NoteCollectionMockRepository.ts` — 引数尊重の挙動に修正

## 関連ドキュメント

- [IndexedDB 全ノートバックアップ機能 実装計画](./backup-feature-plan.md) — 対称となるエクスポート機能
- [設定ビュー実装ガイド](./settings-view-plan.md) — `SettingsView` の構成と新規セクション追加手順
