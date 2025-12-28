# 設定ビュー実装ガイド

## 概要

バックアップ機能を含む設定画面の実装。今後も設定項目を追加できる拡張性のある設計。

## アーキテクチャ

### UI 表示方式

**条件付きレンダリング（v-if / v-else）**

- `Note.vue` で `UseSettingsView` composable を使って状態管理
- ヘッダーの設定アイコンをクリックして全画面表示
- メインビューと設定ビューを切り替え

**採用理由**:
- Vue Router を使わないシンプルな設計に適合
- 既存の Grid レイアウトをそのまま活用
- 実装がシンプルで拡張が容易

### 状態管理パターン

**`UseSettingsView` composable**
- `showSettings` 状態を管理（computed で返却し読み取り専用化）
- `toggleSettings()` メソッドで表示/非表示を切り替え
- `Note.vue` で利用

### コンポーネント構成

```
src/components/
├── Settings/
│   ├── SettingsView.vue          # 設定画面メインコンテナ
│   ├── SettingsBackup.vue        # バックアップ設定セクション
│   └── use/
│       └── UseSettingsView.ts    # 設定表示状態管理
├── Common/
│   ├── Card.vue                  # カード UI コンポーネント
│   └── BaseButton.vue            # ボタン UI コンポーネント
├── Layout/
│   ├── NoteHeader.vue            # toggle-settings イベント伝搬
│   └── NoteHeaderSubMenu.vue     # 設定アイコンボタン
└── Note.vue                      # メイン/設定ビュー切り替え
```

## 実装されたコンポーネント

### 1. 共通コンポーネント

#### `Card.vue`
- 白背景、ボーダー、角丸、パディング、シャドウのカードデザイン
- slot でコンテンツを受け取る
- 設定セクションの共通レイアウトとして利用

#### `BaseButton.vue`
- `disabled` prop: ボタン無効化
- `loading` prop: 処理中状態
- `loadingText` prop: 処理中のテキスト
- slot でボタンテキストを受け取る
- ホバーアニメーション付き

### 2. 設定画面コンポーネント

#### `SettingsView.vue`
- 設定セクション（SettingsBackup など）を配置するコンテナ
- シンプルな構造で拡張性を確保
- 各セクションを gap で間隔を空けて配置
- イベントは持たず、純粋な表示用コンテナ
- 設定画面の開閉はヘッダーの設定アイコンで制御

#### `SettingsBackup.vue`
- `Card` コンポーネントでラップ
- `BaseButton` コンポーネントを使用
- `UseNoteBackup` から `backup()`, `isProcessing`, `backupResult` を取得
- 結果メッセージを `backupResult` の値に応じて条件付きレンダリング

### 3. 状態管理

#### `UseSettingsView.ts`
- `showSettings` ref を内部で管理
- `computed` で読み取り専用として公開
- `toggleSettings()`: 表示/非表示を切り替え

### 4. イベントフロー

**設定画面の開閉（toggle）**

```
NoteHeaderSubMenu (設定アイコンクリック)
  ↓ @toggle-settings emit
NoteHeader
  ↓ @toggle-settings emit
Note.vue
  ↓ toggleSettings() 実行
UseSettingsView (showSettings を toggle)
```

設定画面を開く時も閉じる時も、同じ設定アイコンをクリックして `toggleSettings()` を実行します。

## UI テキスト規約

**全ての UI テキストは英語で記載**
- ボタンラベル、メッセージ、タイトルなど
- コード内のコメントは日本語でも可

## 新しい設定セクションの追加方法

### 1. コンポーネント作成

```bash
# 新しい設定セクションコンポーネントを作成
touch src/components/Settings/SettingsExample.vue
```

### 2. Card と BaseButton を活用

- セクション全体を `Card` でラップ
- アクション実行ボタンは `BaseButton` を使用
- 処理中状態は composable で管理し、`loading` prop に渡す

### 3. SettingsView に追加

```vue
<template>
  <div class="SettingsView ...">
    <SettingsBackup />
    <SettingsExample />  <!-- 新規追加 -->
  </div>
</template>

<script>
import SettingsExample from './SettingsExample.vue'
// components に登録
</script>
```

## 設計の利点

### 拡張性
- 各設定セクションは独立したコンポーネント
- `Card` と `BaseButton` で UI の一貫性を保証
- 新しいセクション追加時のコード変更が最小限

### 保守性
- 責務が明確に分離されている
- 共通 UI コンポーネントで重複を削減
- composable パターンでロジックを再利用

### 一貫性
- 共通コンポーネントで統一されたデザイン
- 処理中状態の表示パターンが統一
- メッセージ表示パターンが統一

## 参考ファイルパス

実装の詳細は以下のファイルを参照：

- `/src/components/Settings/SettingsView.vue`
- `/src/components/Settings/SettingsBackup.vue`
- `/src/components/Settings/use/UseSettingsView.ts`
- `/src/components/Common/Card.vue`
- `/src/components/Common/BaseButton.vue`
- `/src/components/Note.vue`
- `/src/components/Layout/NoteHeader.vue`
- `/src/components/Layout/NoteHeaderSubMenu.vue`
