---
name: code-quality
description: コード修正後に必須で実行するコマンドと ESLint 運用ルール
---

# Code Quality

コードを作成・修正した際は、必ず以下を実行して警告やエラーを修正する:

1. `npm run lint` - ESLint の警告・エラーを修正
2. `npm run type-check` - TypeScript の型エラーを修正

lint エラーや型エラーが残った状態でタスクを完了させない。

## 禁止事項

- `eslint-disable-next-line` や `eslint-disable` を使用しない
- ESLint の警告は無視せず、コードを修正して解決する
