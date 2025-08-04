# Next Boss 🚀

Next.jsを段階的に学習するための包括的な学習リポジトリです。初心者から中級者まで、実践的なサンプルコードと詳細な説明を通じて、Next.jsの全体像を効率的に把握できます。

## 🎯 学習目標

このリポジトリを通じて以下のスキルを習得できます：

- Next.js 15.4.5とApp Routerの基本概念
- TypeScriptを使用したモダンなReact開発
- Server ComponentsとClient Componentsの使い分け
- 効果的なデータフェッチング手法
- 複数のスタイリング手法の比較と実装
- フォーム処理とバリデーション
- API Routesの設計と実装
- 実際のプロジェクトに応用できる統合的な知識

## 📚 学習の進め方

### 推奨学習順序

1. **基本セットアップ** (`examples/01-basic-setup/`)
   - Next.jsプロジェクトの作成と基本構造の理解
   - 開発環境のセットアップ

2. **ページとルーティング** (`examples/02-pages-and-routing/`)
   - App Routerの仕組み
   - 静的ルートと動的ルートの作成

3. **コンポーネントとProps** (`examples/03-components-and-props/`)
   - 再利用可能なコンポーネントの作成
   - Propsを使用したデータの受け渡し

4. **Server/Client Components** (`examples/04-server-client-components/`)
   - Server ComponentsとClient Componentsの違い
   - 適切な使い分けの方法

5. **データフェッチング** (`examples/05-data-fetching/`)
   - 各種データフェッチング手法
   - パフォーマンスを考慮した実装

6. **スタイリング手法** (`examples/06-styling-methods/`)
   - CSS Modules、Tailwind CSSの比較
   - 実際のプロジェクトでの使い分け

7. **フォームとバリデーション** (`examples/07-forms-and-validation/`)
   - フォーム処理の実装
   - バリデーション機能の追加

8. **API Routes** (`examples/08-api-routes/`)
   - RESTful APIの設計
   - データベース操作の基本

9. **完全なアプリケーション例** (`examples/09-full-app-example/`)
   - 学習内容を統合したブログアプリケーション
   - 実際のプロジェクトでの応用方法

## 🗂️ プロジェクト構造

```
next-boss/
├── README.md                    # このファイル
├── docs/                        # 詳細な学習ドキュメント
│   ├── 01-getting-started.md   # Next.jsの概要とセットアップ
│   ├── 02-routing.md           # App Routerの詳細説明
│   ├── 03-components.md        # コンポーネントの作成と使用
│   ├── 04-data-fetching.md     # データフェッチングの各手法
│   ├── 05-styling.md           # スタイリング手法の比較
│   └── 06-deployment.md        # デプロイメント方法
├── examples/                    # 段階別学習例
│   ├── 01-basic-setup/
│   ├── 02-pages-and-routing/
│   ├── 03-components-and-props/
│   ├── 04-server-client-components/
│   ├── 05-data-fetching/
│   ├── 06-styling-methods/
│   ├── 07-forms-and-validation/
│   ├── 08-api-routes/
│   └── 09-full-app-example/
├── exercises/                   # 実践課題
│   ├── exercise-01/            # 基本課題
│   ├── exercise-02/            # 中級課題
│   └── exercise-03/            # 応用課題
└── src/app/                    # メインアプリケーション
    ├── layout.tsx              # ルートレイアウト
    └── page.tsx                # ホームページ
```

## 🚀 クイックスタート

### 前提条件

- Node.js 18.0以上
- npm または yarn
- 基本的なReactの知識

### セットアップ

1. リポジトリをクローン
```bash
git clone <repository-url>
cd next-boss
```

2. 依存関係をインストール
```bash
npm install
```

3. 開発サーバーを起動
```bash
npm run dev
```

4. ブラウザで http://localhost:3000 を開く

## 📖 学習方法

### 1. 段階的学習

各 `examples/` ディレクトリには独立したNext.jsアプリケーションが含まれています：

```bash
cd examples/01-basic-setup
npm install
npm run dev
```

### 2. ドキュメント参照

`docs/` ディレクトリには各トピックの詳細な説明があります。コードを読む前に該当するドキュメントを確認することをお勧めします。

### 3. 実践課題

`exercises/` ディレクトリには実践的な課題があります：

- `starter/` - 開始用のテンプレート
- `solution/` - 解答例
- `hints.md` - ヒント

## ✅ 学習進捗チェックリスト

### 基礎レベル
- [ ] Next.jsプロジェクトを作成できる
- [ ] App Routerの基本的な仕組みを理解している
- [ ] 基本的なコンポーネントを作成できる
- [ ] Propsを使用してデータを受け渡しできる

### 中級レベル
- [ ] Server ComponentsとClient Componentsの違いを理解している
- [ ] 適切なデータフェッチング手法を選択できる
- [ ] CSS ModulesまたはTailwind CSSを使用してスタイリングできる
- [ ] フォーム処理とバリデーションを実装できる

### 上級レベル
- [ ] API Routesを設計・実装できる
- [ ] 複数の機能を統合したアプリケーションを構築できる
- [ ] パフォーマンスを考慮した実装ができる
- [ ] 実際のプロジェクトに学習内容を応用できる

## 🤝 学習のコツ

1. **順序を守る**: 推奨順序に従って学習することで、段階的に理解を深められます
2. **実際に動かす**: 各例を実際に動かして、動作を確認しながら学習しましょう
3. **コードを読む**: サンプルコードには詳細なコメントが含まれています
4. **課題に挑戦**: 理解度を確認するために実践課題に取り組みましょう
5. **応用する**: 学習した内容を自分のプロジェクトに応用してみましょう

## 📚 参考資料

- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [React公式ドキュメント](https://react.dev/)
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs/)
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)

## 🐛 トラブルシューティング

よくある問題と解決方法については、各例のREADMEファイルまたは `docs/` ディレクトリの該当ドキュメントを参照してください。

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

---

**Happy Learning! 🎉**

Next.jsの世界へようこそ。このリポジトリがあなたの学習の助けになることを願っています。