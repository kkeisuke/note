---
name: conventions
description: ディレクトリ構造・命名・UI テキストに関する規約
---

# Conventions

## ディレクトリ構造

- 目的に合わせて適切にパッケージを分ける（例: `formatter/` (フォーマット関数), `validator/` (バリデーション), `parser/` (パース処理) など）
- `src/utils/` は作成しない。汎用的な `utils` ディレクトリを作るとカオスになるため、必ず目的を明確にしたディレクトリ名を使用する

## 命名規則

このリポジトリの命名規則は、一般則よりも優先する。

- **フォーマッター関数**: Composition API パターンを使用し、`Use` プレフィックスを付ける
  - 例: `UseDateFormatter`, `UseFilenameFormatter`
  - パターン: `export const UseXxxFormatter = (): { method: (...) => ... } => { ... }`
  - 既存の `UseDateFormatter` と同じパターンに従う

## UI テキスト

- **UI 上に表示される全てのテキストは英語で記載する**
  - タイトル、ボタンラベル、メッセージ、説明文など
  - コード内のコメントは日本語で書く
  - 例:
    - OK: `<h2>Settings</h2>`
    - OK: `<button>Backup Notes</button>`
    - OK: `message.value = 'Backup completed successfully'`
    - NG: `<h2>設定</h2>`
    - NG: `<button>バックアップを実行</button>`
