# CLAUDE.md

このファイルは、このリポジトリで作業する際に Claude Code (claude.ai/code) に対してガイダンスを提供します。

## 言語設定

**このプロジェクトでは日本語を使用してください。** コメント、コミットメッセージ、ユーザーとのコミュニケーションは全て日本語で行ってください。

## プロジェクト概要

Note は Vue 3 と Vite で構築された PWA ノートアプリケーションです。IndexedDB（Dexie経由）を使用した永続化ストレージを備え、完全にブラウザ内で動作するデスクトップ PWA です。@toast-ui/editor を使用した Markdown エディタと UML ダイアグラムのサポートが特徴です。

## よく使うコマンド

### 開発

```bash
npm run dev                # 開発サーバーを起動（ホットリロード有効）
npm run preview            # 本番ビルドをローカルでプレビュー（ポート 4173）
```

### ビルド

```bash
npm run build-only         # 本番用にビルド（dist/に出力）
npm run type-check         # TypeScript の型チェックを実行
```

### テスト

```bash
npm run test:unit          # Vitest でユニットテストを実行（ウォッチモードなし）
npm run test:e2e           # Cypress E2E テストを対話的に実行
npm run test:e2e:ci        # Cypress E2E テストをヘッドレスモードで実行
```

### コード品質

```bash
npm run lint               # ESLint を自動修正付きで実行
```

### 環境設定

`.env.copy` を `.env.local` にコピーして以下を設定：

- `VITE_PLANTUML_URL`: PlantUML サーバーの URL（@toast-ui/editor-plugin-uml で使用）

## アーキテクチャ

### リポジトリパターン

このアプリケーションは **Repository Pattern（リポジトリパターン）** と依存性注入を使用してデータ永続化を抽象化しています。これにより、ビジネスロジックを変更することなく、異なるストレージバックエンドを切り替えることができます。

**主要なファイル:**

- `src/repository/NoteRepository.d.ts`: リポジトリのインターフェース定義
- `src/repository/NoteRepositoryProvider.ts`: 設定に基づいてリポジトリインスタンスを提供
- `src/repository/NoteRepositoryMap.ts`: リポジトリ名と実装のマッピング
- `src/main.ts:11`: リポジトリプロバイダーを `'dexie'` または `'mock'` で初期化

**リポジトリの種類:**

- **NoteCollectionRepository**: 全ノートの取得、新規ノートの追加
- **NoteSingleRepository**: 個別ノートの読み込み、更新、削除
- **NoteSingleCacheRepository**: 最後に開いたノート ID を localStorage にキャッシュ

**実装:**

- `repository/dexie/*`: Dexie（IndexedDB）を使用した本番実装
- `repository/mock/*`: テスト用のモック実装
- `repository/localStorage/*`: 最後のノート ID をキャッシュするための LocalStorage 実装

ストレージバックエンドを変更するには、`src/main.ts` の `initRepositoryProvider('dexie')` を修正してください。

### 状態管理

Vuex/Pinia の代わりに **Vue 3 Composition API** の provide/inject を使用して依存性注入を行っています。

**ストアのコンポーザブル:**

- `src/store/UseNoteCollection.ts`: ノート一覧の状態と操作を管理
- `src/store/UseNoteSingle.ts`: 単一ノートの編集状態を管理

**パターン:**

```typescript
// アプリレベルで提供
provideUseNoteCollection()

// コンポーネントで注入
const { notes, fetch, add } = injectUseNoteCollection()
```

### コンポーネント構造

- `components/Layout/`: ヘッダーとナビゲーションコンポーネント
- `components/NoteList/`: ノート一覧、検索、メニューコンポーネント
- `components/NoteEdit/`: ノートエディタコンポーネント（@toast-ui/editor を使用）
- `components/NoteSidebar/`: サイドバーナビゲーション
- `components/Common/`: 再利用可能なコンポーネント（例: SvgIcon）
- `components/Note.vue`: メインノート表示コンポーネント

### エンティティモデル

- `src/entity/Note.ts`: コアとなる Note 型の定義（フィールド: id, title, content, createdAt, updatedAt）

### パスエイリアス

プロジェクトでは `@/` を `src/` のエイリアスとして使用しています（vite.config.ts で設定）。

## 主要技術

- **Vue 3**: Composition API と TypeScript を使用
- **Vite**: ビルドツールと開発サーバー
- **Dexie**: データ永続化のための IndexedDB ラッパー
- **@toast-ui/editor**: UML プラグイン付き WYSIWYG Markdown エディタ
- **Tailwind CSS**: ユーティリティファースト CSS フレームワーク
- **Vitest**: ユニットテスト（jsdom 環境で実行、ウォッチモード無効）
- **Cypress**: E2E テスト
- **vite-plugin-pwa**: Workbox を使用した PWA 生成

## PWA 設定

PWA マニフェストとサービスワーカーの設定は `vite.config.ts` にあります。アプリは日本語（`lang: 'ja'`）で設定されており、Android 用のマスカブルアイコンが含まれています。
