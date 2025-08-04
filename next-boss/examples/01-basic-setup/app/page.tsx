/**
 * ホームページコンポーネント
 * 
 * これはNext.jsアプリケーションのメインページです。
 * app/page.tsx ファイルは自動的に "/" ルートにマッピングされます。
 * 
 * Next.js 13以降のApp Routerでは、ファイルベースのルーティングを使用し、
 * 各ディレクトリの page.tsx ファイルがそのルートのページになります。
 */
export default function HomePage() {
  return (
    <div>
      {/* ページタイトル */}
      <h1 style={{ color: '#333', marginBottom: '2rem' }}>
        🚀 Next.js基本セットアップへようこそ！
      </h1>

      {/* 学習内容の説明 */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>📚 この例で学べること</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>Next.jsプロジェクトの基本構造</strong> - ファイルとディレクトリの役割</li>
          <li><strong>App Routerの基本</strong> - layout.tsx と page.tsx の関係</li>
          <li><strong>TypeScriptの設定</strong> - tsconfig.json の基本設定</li>
          <li><strong>メタデータの設定</strong> - SEO対応の基本</li>
        </ul>
      </section>

      {/* プロジェクト構造の説明 */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>🗂️ プロジェクト構造</h2>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '1rem', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
{`01-basic-setup/
├── app/
│   ├── layout.tsx    # ルートレイアウト（全ページ共通）
│   └── page.tsx      # ホームページ（このファイル）
├── next.config.ts    # Next.js設定ファイル
├── tsconfig.json     # TypeScript設定ファイル
└── package.json      # プロジェクト設定と依存関係`}
        </pre>
      </section>

      {/* 重要なポイント */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>💡 重要なポイント</h2>
        <div style={{ 
          backgroundColor: '#e8f4fd', 
          padding: '1rem', 
          borderRadius: '4px',
          border: '1px solid #bee5eb'
        }}>
          <h3>1. App Router</h3>
          <p>Next.js 13以降では、App Routerが推奨されています。従来のPages Routerと比べて、より柔軟なレイアウト管理が可能です。</p>
          
          <h3>2. Server Components</h3>
          <p>デフォルトでは、全てのコンポーネントがServer Componentとして動作します。これにより、初期ページロードが高速化されます。</p>
          
          <h3>3. TypeScript</h3>
          <p>TypeScriptを使用することで、開発時の型安全性が向上し、バグを早期に発見できます。</p>
        </div>
      </section>

      {/* 次のステップ */}
      <section>
        <h2>🎯 次のステップ</h2>
        <p>この基本構造を理解したら、次は <strong>02-pages-and-routing</strong> でルーティングについて学びましょう！</p>
        
        <div style={{ marginTop: '1rem' }}>
          <h3>試してみよう：</h3>
          <ol style={{ lineHeight: '1.8' }}>
            <li>開発サーバーを起動: <code>npm run dev</code></li>
            <li>ブラウザで http://localhost:3001 を開く</li>
            <li>layout.tsx のスタイルを変更してみる</li>
            <li>page.tsx にコンテンツを追加してみる</li>
          </ol>
        </div>
      </section>
    </div>
  )
}