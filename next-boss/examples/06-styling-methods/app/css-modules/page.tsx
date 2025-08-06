import styles from './page.module.css';
import Card from '@/components/css-modules/Card';
import Button from '@/components/css-modules/Button';
import Navigation from '@/components/css-modules/Navigation';

/**
 * CSS Modules例のページコンポーネント
 * 
 * CSS Modulesの基本的な使用方法を示します：
 * - クラス名のスコープ化
 * - 複数クラスの組み合わせ
 * - 条件付きスタイリング
 * - コンポーネント間でのスタイル共有
 */
export default function CSSModulesPage() {
  return (
    <div className={styles.container}>
      {/* ページヘッダー */}
      <div className={styles.header}>
        <h1 className={styles.title}>CSS Modules例</h1>
        <p className={styles.description}>
          CSS Modulesを使用したスタイリングの実装例です。
          クラス名が自動的にハッシュ化され、スコープが限定されます。
        </p>
      </div>

      {/* ナビゲーション例 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ナビゲーションコンポーネント</h2>
        <Navigation />
      </section>

      {/* ボタン例 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ボタンコンポーネント</h2>
        <div className={styles.buttonGroup}>
          <Button variant="primary" size="small">
            小さなボタン
          </Button>
          <Button variant="primary" size="medium">
            中サイズボタン
          </Button>
          <Button variant="primary" size="large">
            大きなボタン
          </Button>
        </div>
        <div className={styles.buttonGroup}>
          <Button variant="secondary" size="medium">
            セカンダリボタン
          </Button>
          <Button variant="danger" size="medium">
            危険なボタン
          </Button>
          <Button variant="primary" size="medium" disabled>
            無効なボタン
          </Button>
        </div>
      </section>

      {/* カード例 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>カードコンポーネント</h2>
        <div className={styles.cardGrid}>
          <Card
            title="基本カード"
            content="これは基本的なカードコンポーネントです。CSS Modulesを使用してスタイリングされています。"
            variant="default"
          />
          <Card
            title="強調カード"
            content="重要な情報を表示するための強調されたカードです。"
            variant="highlighted"
          />
          <Card
            title="警告カード"
            content="注意が必要な情報を表示するための警告カードです。"
            variant="warning"
          />
        </div>
      </section>

      {/* CSS Modulesの特徴説明 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>CSS Modulesの特徴</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>スコープ化</h3>
            <p className={styles.featureDescription}>
              クラス名が自動的にハッシュ化され、他のコンポーネントとの衝突を防ぎます。
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>従来のCSS記法</h3>
            <p className={styles.featureDescription}>
              既存のCSS知識をそのまま活用でき、学習コストが低いです。
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>TypeScript対応</h3>
            <p className={styles.featureDescription}>
              型定義ファイルを生成することで、クラス名の補完とエラーチェックが可能です。
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>ビルド時最適化</h3>
            <p className={styles.featureDescription}>
              未使用のCSSは自動的に削除され、バンドルサイズが最適化されます。
            </p>
          </div>
        </div>
      </section>

      {/* コード例 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>実装例</h2>
        <div className={styles.codeExample}>
          <h3 className={styles.codeTitle}>CSS Module ファイル (page.module.css)</h3>
          <pre className={styles.codeBlock}>
{`.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
}

.section {
  margin-bottom: 3rem;
}`}
          </pre>
        </div>
        <div className={styles.codeExample}>
          <h3 className={styles.codeTitle}>React コンポーネント</h3>
          <pre className={styles.codeBlock}>
{`import styles from './page.module.css';

export default function Component() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>タイトル</h1>
    </div>
  );
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}