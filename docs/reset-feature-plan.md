# 全ノート削除リセット機能 実装計画

## 概要

設定画面から IndexedDB に保存されている全ノートを一括削除するリセット機能を実装します。`SettingsBackup` / `SettingsImport` と並ぶカードとして追加し、誤操作防止のため実行前に確認ダイアログを表示します。

## 要件

- **対象**: IndexedDB 上の全ノート（`note` テーブルを空にする）
- **副作用**: 現在開いているノート状態 (`UseNoteSingle`) と `localStorage` の最後に開いたノート ID キャッシュも初期化する
- **配置**: Settings 画面に `SettingsBackup` / `SettingsImport` と並ぶカードとして追加
- **確認フロー**: `window.confirm` によるダイアログを 1 回表示。キャンセル時は何もしない
- **UI テキスト**: 英語で記載（`Reset` / `Delete all notes. This action cannot be undone.` / `Delete All Notes`）

## 実装するファイル

### 1. 新規作成ファイル

#### `src/components/Settings/use/UseNoteReset.ts`

リセット処理をラップする Composition API。`UseNoteBackup` / `UseNoteImport` と対称な構造。

**責務**:
- `injectUseNoteCollection().deleteAll()` で全ノート削除
- `injectUseNoteSingle().reset()` で現在ノートとキャッシュを初期化
- 処理状態 / 結果を ref で管理

**公開インターフェース**:
```typescript
export const UseNoteReset = (): {
  reset: () => Promise<void>
  isProcessing: ComputedRef<boolean>
  resetResult: ComputedRef<boolean | null>
}
```

#### `src/components/Settings/SettingsReset.vue`

`SettingsBackup.vue` / `SettingsImport.vue` と対称な構造の設定セクション。

**責務**:
- `Card` でラップした見出し / 説明 / ボタン / 結果メッセージ
- `BaseButton` クリックで `window.confirm` を表示し、承認時のみ `reset()` を実行
- 結果に応じて成功 (`All notes have been deleted`) / 失敗 (`Reset failed`) を表示

#### `src/__tests__/components/UseNoteReset.spec.ts`

`UseNoteReset` 固有の責務（2 ストアの協調実行 + `isProcessing` / `resetResult` の状態遷移）に絞ったユニットテスト。削除前後の差分が読みやすいよう、事前に件数と現在ノート ID をアサートする。

**テストケース**:
- `reset` で `collection.deleteAll` と `single.reset` が協調実行され、状態が正しく遷移する

### 2. 修正が必要なファイル

#### `src/repository/NoteRepository.d.ts`

`NoteCollectionRepository` に `deleteAll` を追加。

```typescript
export type NoteCollectionRepository = {
  fetch: () => Promise<Note[]>
  add: (note: Note) => Promise<string>
  deleteAll: () => Promise<void>
}
```

#### `src/repository/dexie/NoteCollectionDexieRepository.ts`

Dexie の `Table#clear()` で全レコードを削除。

```typescript
async deleteAll() {
  await noteDexieRepository.table().clear()
}
```

#### `src/repository/mock/NoteCollectionMockRepository.ts`

モック配列を空にする。

```typescript
async deleteAll() {
  noteMockRepository.notes.length = 0
}
```

#### `src/store/UseNoteCollection.ts`

`deleteAll` を追加。削除後に `fetch()` を呼んでストアのノート一覧を空に反映する。

```typescript
async function deleteAll() {
  await repo.deleteAll()
  await fetch()
}
```

#### `src/store/UseNoteSingle.ts`

公開 API として `reset` を追加。内部の `noteSingle.reset()` と `cacheRepo.reset()` をまとめて呼ぶ。既存の `destroy` の中で同じ処理をインライン実装していたが、外部から呼び出せる形で切り出した。

```typescript
function reset() {
  noteSingle.reset()
  cacheRepo.reset()
}
```

#### `src/components/Settings/SettingsView.vue`

`SettingsReset` を `SettingsBackup` / `SettingsImport` の後ろに追加。

#### `src/__tests__/store/UseNoteCollection.spec.ts`

`deleteAll` のテストを追加。削除前後の件数を明示する。

#### `src/__tests__/store/UseNoteSingle.spec.ts`

`reset` のテストを追加。ノート状態とキャッシュがクリアされることを検証する。

## 仕様の詳細

### 確認フロー

`window.confirm('Delete all notes? This action cannot be undone.')` を表示し、`true` 時のみ `reset()` を実行する。キャンセル時は何も起きず、`resetResult` は `null` のまま。

### エラー処理

| ケース                        | 結果                           |
|-------------------------------|--------------------------------|
| `repo.deleteAll()` で例外     | `resetResult = false`          |
| `useNoteSingle.reset()` で例外 | `resetResult = false`          |
| 正常終了                      | `resetResult = true`           |

`UseNoteReset` の `try/catch` で全体をラップしているため、どちらかのステップで失敗しても UI に失敗メッセージを出せる。

### 責務の分離

テストの重複を避けるため、`UseNoteReset` のテストは「2 ストアの協調」に絞り、個別の動作（全ノート削除 / ノート状態クリア）はそれぞれのストアテストで検証する。

- `UseNoteReset.spec.ts` → `reset()` 全体の挙動・状態遷移
- `UseNoteCollection.spec.ts` → `deleteAll` 単体
- `UseNoteSingle.spec.ts` → `reset` 単体

## 再利用しているもの

- `UseNoteBackup` / `UseNoteImport` のコンポーザブル構造（`isProcessing` / `result` ref + 非同期エントリ関数）
- `BaseButton` の `loading` / `loadingText` プロパティ
- `Card` コンポーネント
- `injectUseNoteCollection()` / `injectUseNoteSingle()`
- テスト雛形: `src/__tests__/components/UseNoteImport.spec.ts`

## 検証

1. `npm run type-check` — 型エラーなし
2. `npm run lint` — ESLint 警告なし
3. `npm run test:unit` — 既存 29 件 + 新規 3 件 = 32 件通過
4. `npm run dev` でブラウザ動作確認:
   - Settings を開き `Delete All Notes` をクリック
   - 確認ダイアログが表示されること
   - キャンセル → 何も起きないこと
   - OK → 成功メッセージが表示され、サイドバーのノート一覧が空になること
   - 削除直前に開いていたノートがエディタから消え、再読込しても復元されないこと（キャッシュクリアの確認）

## 設計の補足

### `UseNoteSingle.reset` を公開した理由

既存の `destroy` メソッドは「対象 ID が現在開いているノートと一致するときのみ」インラインで同等の処理を行っていた。リセット機能では「現在開いていたノートが deleteAll で消えた」状態をストア層に反映する必要があり、対象 ID を知らなくても呼べるエントリが必要だったため、同じ処理を `reset` として公開 API に昇格させた。

### 確認ダイアログに `window.confirm` を採用した理由

アプリ内で確認 UI 用のモーダルコンポーネントはまだ存在しないため、独自モーダルの追加はスコープ外とし、ブラウザ標準の `window.confirm` を利用した。将来モーダル UI を導入する場合は `SettingsReset.vue` の `handleReset` の 1 箇所を差し替えるだけで済む。

## 重要なファイルパス

### 新規作成するファイル

- `src/components/Settings/SettingsReset.vue` — リセット設定セクション
- `src/components/Settings/use/UseNoteReset.ts` — リセット機能のロジック
- `src/__tests__/components/UseNoteReset.spec.ts` — テスト

### 修正するファイル

- `src/repository/NoteRepository.d.ts` — `deleteAll` 追加
- `src/repository/dexie/NoteCollectionDexieRepository.ts` — `deleteAll` 実装
- `src/repository/mock/NoteCollectionMockRepository.ts` — `deleteAll` 実装
- `src/store/UseNoteCollection.ts` — `deleteAll` 追加
- `src/store/UseNoteSingle.ts` — `reset` 公開
- `src/components/Settings/SettingsView.vue` — `SettingsReset` を配置
- `src/__tests__/store/UseNoteCollection.spec.ts` — `deleteAll` テスト追加
- `src/__tests__/store/UseNoteSingle.spec.ts` — `reset` テスト追加

## 関連ドキュメント

- [IndexedDB 全ノートバックアップ機能 実装計画](./backup-feature-plan.md) — 対称となるエクスポート機能
- [ローカル Markdown ファイル インポート機能 実装計画](./import-feature-plan.md) — 対称となるインポート機能
- [設定ビュー実装ガイド](./settings-view-plan.md) — `SettingsView` の構成と新規セクション追加手順
