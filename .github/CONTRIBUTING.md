# 🤝 Contributing to Next Boss

Next Bossへの貢献をありがとうございます！このガイドでは、プロジェクトへの貢献方法について説明します。

## 📋 目次

- [🎯 貢献の種類](#-貢献の種類)
- [🚀 はじめに](#-はじめに)
- [💻 開発環境のセットアップ](#-開発環境のセットアップ)
- [🔄 貢献のワークフロー](#-貢献のワークフロー)
- [📝 コーディング規約](#-コーディング規約)
- [📚 学習コンテンツのガイドライン](#-学習コンテンツのガイドライン)
- [🧪 テスト](#-テスト)
- [📖 ドキュメント](#-ドキュメント)
- [❓ 質問・サポート](#-質問サポート)

## 🎯 貢献の種類

Next Bossでは以下のような貢献を歓迎しています：

### 📚 学習コンテンツ
- 新しい学習例の追加
- 既存の学習例の改善
- より分かりやすい説明の追加
- 実践的な課題の作成

### 📖 ドキュメント
- README、ガイドの改善
- コードコメントの充実
- 翻訳・多言語対応
- FAQ、トラブルシューティング

### 🐛 バグ修正
- 動作しないコードの修正
- リンク切れの修正
- 環境依存の問題解決

### ✨ 新機能
- 学習体験を向上させる機能
- 開発者体験の改善
- パフォーマンス最適化

### 🧪 品質向上
- テストの追加
- CI/CDの改善
- セキュリティ強化

## 🚀 はじめに

### 前提条件

- Node.js 18以上
- npm 9以上
- Git
- GitHub アカウント

### 推奨ツール

- Visual Studio Code
- Git GUI ツール（SourceTree、GitHub Desktop など）

## 💻 開発環境のセットアップ

### 1. リポジトリのフォーク

```bash
# GitHubでリポジトリをフォーク後
git clone https://github.com/YOUR_USERNAME/next-boss.git
cd next-boss
```

### 2. 依存関係のインストール

```bash
# メインプロジェクト
cd next-boss
npm install

# 特定の学習例（例：01-basic-setup）
cd examples/01-basic-setup
npm install
```

### 3. 開発サーバーの起動

```bash
# 学習例の開発サーバー
cd examples/01-basic-setup
npm run dev
```

### 4. リモートリポジトリの設定

```bash
git remote add upstream https://github.com/kantapapan/next-boss.git
```

## 🔄 貢献のワークフロー

### 1. Issue の確認・作成

- 既存のIssueを確認
- 新しい機能やバグ修正の場合はIssueを作成
- 作業前にコメントで作業意思を表明

### 2. ブランチの作成

```bash
# 最新のmainブランチを取得
git checkout main
git pull upstream main

# 機能ブランチを作成
git checkout -b feature/your-feature-name
# または
git checkout -b fix/bug-description
```

### 3. 開発・テスト

```bash
# 変更を加える
# ...

# コードの品質チェック
npm run lint
npm run type-check

# ビルドテスト
npm run build
```

### 4. コミット

```bash
git add .
git commit -m "feat: add new learning example for authentication"

# または
git commit -m "fix: resolve routing issue in example 02"
git commit -m "docs: update README with new installation steps"
```

#### コミットメッセージの規約

```
<type>: <description>

Types:
- feat: 新機能
- fix: バグ修正
- docs: ドキュメント
- style: スタイル・フォーマット
- refactor: リファクタリング
- test: テスト
- chore: その他の変更
```

### 5. プッシュとプルリクエスト

```bash
git push origin feature/your-feature-name
```

GitHubでプルリクエストを作成し、テンプレートに従って情報を記入してください。

## 📝 コーディング規約

### TypeScript/JavaScript

```typescript
// ✅ 良い例
interface UserProps {
  id: string;
  name: string;
  email: string;
}

const UserCard: React.FC<UserProps> = ({ id, name, email }) => {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};

// ❌ 悪い例
const UserCard = (props: any) => {
  return <div>{props.name}</div>;
};
```

### ファイル命名規則

```
components/
├── UserCard.tsx          # PascalCase for components
├── user-utils.ts         # kebab-case for utilities
└── index.ts              # lowercase for index files

pages/
├── about.tsx             # lowercase for pages
├── user-profile.tsx      # kebab-case for multi-word pages
```

### CSS/スタイリング

```css
/* CSS Modules */
.userCard {
  padding: 1rem;
  border-radius: 8px;
  background-color: white;
}

.userCard__title {
  font-size: 1.2rem;
  font-weight: bold;
}
```

```tsx
// Tailwind CSS
<div className="p-4 rounded-lg bg-white shadow-md">
  <h3 className="text-lg font-bold">User Name</h3>
</div>
```

## 📚 学習コンテンツのガイドライン

### 学習例の構造

```
examples/XX-example-name/
├── README.md             # 学習目標、手順、解説
├── USAGE_GUIDE.md        # 実践での活用方法
├── package.json          # 依存関係
├── next.config.ts        # Next.js設定
├── tsconfig.json         # TypeScript設定
├── app/                  # App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/           # コンポーネント
├── lib/                  # ユーティリティ
└── types/                # 型定義
```

### README.md テンプレート

```markdown
# XX. Example Name

## 🎯 学習目標

この例では以下を学習します：

- 目標1
- 目標2
- 目標3

## 🚀 セットアップ

\`\`\`bash
npm install
npm run dev
\`\`\`

## 📚 学習内容

### 1. 基本概念

### 2. 実装方法

### 3. 応用例

## 🔍 重要なポイント

## 🎯 次のステップ

## 📖 参考資料
```

### コードコメントのガイドライン

```typescript
/**
 * ユーザー情報を表示するカード コンポーネント
 * 
 * このコンポーネントは学習者がPropsの使い方を理解するための例です。
 * 実際のプロジェクトでは、より複雑なバリデーションや
 * エラーハンドリングが必要になります。
 */
interface UserCardProps {
  /** ユーザーの一意識別子 */
  id: string;
  /** 表示名 */
  name: string;
  /** メールアドレス */
  email: string;
  /** プロフィール画像のURL（オプション） */
  avatar?: string;
}

const UserCard: React.FC<UserCardProps> = ({ id, name, email, avatar }) => {
  // 🎯 学習ポイント: 条件付きレンダリング
  // avatarが存在する場合のみ画像を表示
  return (
    <div className="user-card">
      {avatar && (
        <img 
          src={avatar} 
          alt={`${name}のプロフィール画像`}
          className="avatar"
        />
      )}
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};
```

### 学習の難易度設定

- ⭐ **初級**: HTML/CSS/JSの基本知識があれば理解できる
- ⭐⭐ **初中級**: Reactの基本概念を理解している
- ⭐⭐⭐ **中級**: Next.jsの基本機能を理解している
- ⭐⭐⭐⭐ **中上級**: 複数の技術を組み合わせて使える
- ⭐⭐⭐⭐⭐ **上級**: 実際のプロダクション開発レベル

## 🧪 テスト

### 動作確認

```bash
# 学習例のビルドテスト
cd examples/XX-example-name
npm run build

# 開発サーバーでの動作確認
npm run dev
```

### 品質チェック

```bash
# ESLint
npm run lint

# TypeScript型チェック
npx tsc --noEmit

# Prettier（推奨）
npx prettier --check "**/*.{js,jsx,ts,tsx,json,md}"
```

## 📖 ドキュメント

### ドキュメント更新のポイント

1. **正確性**: コード例が実際に動作することを確認
2. **分かりやすさ**: 初心者でも理解できる説明
3. **完全性**: 必要な情報が漏れていないか
4. **最新性**: 使用している技術の最新バージョンに対応

### 日本語の書き方

- 敬語は使わず、丁寧語で統一
- 技術用語は適切に日本語化（例：コンポーネント、プロパティ）
- 英語併記が有効な場合は併記（例：プロパティ（Props））

## ❓ 質問・サポート

### 質問する前に

1. [既存のIssue](https://github.com/kantapapan/next-boss/issues)を検索
2. [Discussions](https://github.com/kantapapan/next-boss/discussions)を確認
3. 関連するドキュメントを読む

### 質問の仕方

- 具体的な問題を記載
- 環境情報を含める
- 試したことを説明
- 期待する結果を明記

### サポートチャンネル

- 🐛 **バグ報告**: [Issues](https://github.com/kantapapan/next-boss/issues/new?template=bug_report.yml)
- ✨ **機能提案**: [Issues](https://github.com/kantapapan/next-boss/issues/new?template=feature_request.yml)
- ❓ **質問**: [Issues](https://github.com/kantapapan/next-boss/issues/new?template=question.yml) または [Discussions](https://github.com/kantapapan/next-boss/discussions)

## 🎉 貢献者への感謝

Next Bossは多くの貢献者の皆様によって支えられています。あなたの貢献も、多くの学習者の役に立ちます。

### 貢献者として記載されるには

- 意味のあるプルリクエストがマージされた場合
- 継続的にIssueの報告やディスカッションに参加している場合
- ドキュメントの改善に貢献した場合

---

**ありがとうございます！あなたの貢献がNext Bossをより良い学習リソースにします。** 🚀