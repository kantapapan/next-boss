'use client'

import Button from '@/components/Button'
import Card, { ProductCard } from '@/components/Card'
import { BlogPost, Product } from '@/types'

/**
 * ホームページコンポーネント
 * 
 * このページでは、作成した再利用可能なコンポーネントの使用例を
 * 実際に確認できます。様々なPropsを渡して、コンポーネントの
 * 柔軟性と再利用性を体験できます。
 */
export default function HomePage() {
  // サンプルブログ記事データ
  const sampleBlogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Next.jsコンポーネント設計の基本',
      excerpt: '再利用可能なコンポーネントを作成するための基本的な考え方とベストプラクティスを解説します。',
      content: '...',
      author: {
        id: '1',
        name: '山田太郎',
        email: 'yamada@example.com',
        role: 'admin',
        createdAt: '2024-01-01',
      },
      publishedAt: '2024-01-15',
      tags: ['Next.js', 'React', 'コンポーネント'],
      featured: true,
      imageUrl: 'https://picsum.photos/400/200?random=1',
    },
    {
      id: '2',
      title: 'TypeScriptでProps型定義',
      excerpt: 'TypeScriptを使用してコンポーネントのPropsを型安全に定義する方法を学びます。',
      content: '...',
      author: {
        id: '2',
        name: '佐藤花子',
        email: 'sato@example.com',
        role: 'user',
        createdAt: '2024-01-01',
      },
      publishedAt: '2024-01-20',
      tags: ['TypeScript', 'Props', '型安全性'],
      featured: false,
      imageUrl: 'https://picsum.photos/400/200?random=2',
    },
    {
      id: '3',
      title: 'コンポーネントの合成パターン',
      excerpt: 'Reactのコンポーネント合成パターンを使用して、柔軟で拡張可能なUIを構築する方法を紹介します。',
      content: '...',
      author: {
        id: '3',
        name: '田中一郎',
        email: 'tanaka@example.com',
        role: 'user',
        createdAt: '2024-01-01',
      },
      publishedAt: '2024-01-25',
      tags: ['React', 'コンポーネント合成', 'パターン'],
      featured: true,
      imageUrl: 'https://picsum.photos/400/200?random=3',
    },
  ]

  // サンプル商品データ
  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Next.js完全ガイド',
      description: 'Next.jsの基本から応用まで、実践的なプロジェクトを通じて学べる包括的なガイドブックです。',
      price: 3980,
      imageUrl: 'https://picsum.photos/300/300?random=4',
      category: '書籍',
      inStock: true,
      rating: 4.5,
      reviewCount: 128,
    },
    {
      id: '2',
      name: 'React Hooks マスターコース',
      description: 'React Hooksを使いこなすための実践的なコースです。カスタムフックの作成方法も学べます。',
      price: 5980,
      imageUrl: 'https://picsum.photos/300/300?random=5',
      category: 'コース',
      inStock: true,
      rating: 4.8,
      reviewCount: 89,
    },
    {
      id: '3',
      name: 'TypeScript実践入門',
      description: 'TypeScriptの基本文法から実際のプロジェクトでの活用方法まで、段階的に学習できます。',
      price: 4500,
      imageUrl: 'https://picsum.photos/300/300?random=6',
      category: '書籍',
      inStock: false,
      rating: 4.2,
      reviewCount: 67,
    },
  ]

  // ボタンクリックハンドラー（デモ用）
  const handleButtonClick = (message: string) => {
    alert(`${message}がクリックされました！`)
  }

  // カードクリックハンドラー（デモ用）
  const handleCardClick = (title: string) => {
    alert(`「${title}」がクリックされました！`)
  }

  // 商品アクションハンドラー（デモ用）
  const handleAddToCart = (productName: string) => {
    alert(`「${productName}」をカートに追加しました！`)
  }

  const handleViewDetails = (productName: string) => {
    alert(`「${productName}」の詳細を表示します！`)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* ページタイトル */}
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          🧩 コンポーネントとProps
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#6b7280',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          再利用可能なコンポーネントの作成とPropsの活用方法を実際の例で学習しましょう
        </p>
      </header>

      {/* 学習内容の説明 */}
      <section style={{ marginBottom: '4rem' }}>
        <Card
          title="📚 この例で学べること"
          className="mb-8"
        >
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            <li style={{ 
              padding: '1rem', 
              backgroundColor: '#f0f9ff', 
              borderRadius: '8px',
              border: '1px solid #e0f2fe'
            }}>
              <strong style={{ color: '#0369a1' }}>🔧 コンポーネント設計</strong>
              <br />
              再利用可能で拡張性の高いコンポーネントの作成方法
            </li>
            <li style={{ 
              padding: '1rem', 
              backgroundColor: '#f0fdf4', 
              borderRadius: '8px',
              border: '1px solid #dcfce7'
            }}>
              <strong style={{ color: '#166534' }}>⚙️ Props活用</strong>
              <br />
              TypeScriptを使用した型安全なProps定義と使用方法
            </li>
            <li style={{ 
              padding: '1rem', 
              backgroundColor: '#fefce8', 
              borderRadius: '8px',
              border: '1px solid #fef3c7'
            }}>
              <strong style={{ color: '#a16207' }}>🎨 バリアント対応</strong>
              <br />
              様々なスタイルと状態に対応したコンポーネント設計
            </li>
            <li style={{ 
              padding: '1rem', 
              backgroundColor: '#fdf2f8', 
              borderRadius: '8px',
              border: '1px solid #fce7f3'
            }}>
              <strong style={{ color: '#be185d' }}>🔄 イベント処理</strong>
              <br />
              コンポーネント間でのイベントハンドリングとデータの受け渡し
            </li>
          </ul>
        </Card>
      </section>

      {/* Buttonコンポーネントの例 */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#1f2937',
          marginBottom: '2rem'
        }}>
          🔘 Buttonコンポーネントの例
        </h2>
        
        <Card title="様々なButtonバリアント">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h4 style={{ marginBottom: '1rem', color: '#374151' }}>基本バリアント</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Button 
                  variant="primary" 
                  onClick={() => handleButtonClick('Primary Button')}
                >
                  Primary
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => handleButtonClick('Secondary Button')}
                >
                  Secondary
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleButtonClick('Outline Button')}
                >
                  Outline
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => handleButtonClick('Ghost Button')}
                >
                  Ghost
                </Button>
                <Button 
                  variant="danger"
                  onClick={() => handleButtonClick('Danger Button')}
                >
                  Danger
                </Button>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: '1rem', color: '#374151' }}>サイズバリエーション</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Button size="sm">Small Button</Button>
                <Button size="md">Medium Button</Button>
                <Button size="lg">Large Button</Button>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: '1rem', color: '#374151' }}>状態とオプション</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Button disabled>Disabled Button</Button>
                <Button loading>Loading Button</Button>
                <Button fullWidth>Full Width Button</Button>
                <Button 
                  leftIcon="🚀"
                  onClick={() => handleButtonClick('Icon Button')}
                >
                  With Icon
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Cardコンポーネントの例 */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#1f2937',
          marginBottom: '2rem'
        }}>
          🃏 Cardコンポーネントの例
        </h2>

        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'semibold', 
            color: '#374151',
            marginBottom: '1.5rem'
          }}>
            ブログ記事カード
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {sampleBlogPosts.map((post) => (
              <Card
                key={post.id}
                title={post.title}
                description={post.excerpt}
                imageUrl={post.imageUrl}
                imageAlt={post.title}
                hoverable
                onClick={() => handleCardClick(post.title)}
                footer={
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                  }}>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      <span>📅 {post.publishedAt}</span>
                      <span style={{ margin: '0 0.5rem' }}>•</span>
                      <span>✍️ {post.author.name}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      読む
                    </Button>
                  </div>
                }
              >
                <div style={{ marginBottom: '1rem' }}>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        marginRight: '0.5rem',
                        marginBottom: '0.25rem',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'semibold', 
            color: '#374151',
            marginBottom: '1.5rem'
          }}>
            商品カード（ProductCard拡張版）
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {sampleProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                rating={product.rating}
                reviewCount={product.reviewCount}
                inStock={product.inStock}
                onAddToCart={() => handleAddToCart(product.name)}
                onViewDetails={() => handleViewDetails(product.name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* コンポーネント設計のポイント */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#1f2937',
          marginBottom: '2rem'
        }}>
          💡 コンポーネント設計のポイント
        </h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <Card
            title="🔧 単一責任の原則"
            description="各コンポーネントは一つの明確な責任を持つべきです。"
          >
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#6b7280' }}>
              <li>Buttonは「クリック可能な要素」の責任のみ</li>
              <li>Cardは「コンテンツの整理表示」の責任のみ</li>
              <li>複雑な機能は複数のコンポーネントに分割</li>
            </ul>
          </Card>

          <Card
            title="⚙️ Props設計"
            description="柔軟性と型安全性を両立したProps設計が重要です。"
          >
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#6b7280' }}>
              <li>TypeScriptで型定義を明確に</li>
              <li>デフォルト値で使いやすさを向上</li>
              <li>オプショナルなPropsで柔軟性を確保</li>
            </ul>
          </Card>

          <Card
            title="🎨 バリアント対応"
            description="様々な見た目や状態に対応できる設計にします。"
          >
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#6b7280' }}>
              <li>variant propで見た目のバリエーション</li>
              <li>size propでサイズのバリエーション</li>
              <li>disabled, loading等の状態管理</li>
            </ul>
          </Card>

          <Card
            title="🔄 合成可能性"
            description="他のコンポーネントと組み合わせやすい設計にします。"
          >
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#6b7280' }}>
              <li>children propで内容をカスタマイズ可能</li>
              <li>className propでスタイル拡張可能</li>
              <li>イベントハンドラーで親コンポーネントと連携</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* 次のステップ */}
      <section>
        <Card
          title="🎯 次のステップ"
          className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
        >
          <p style={{ marginBottom: '2rem', color: '#6b7280', lineHeight: '1.6' }}>
            コンポーネントとPropsの基本を理解したら、次は以下のトピックに進みましょう：
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <Button 
              variant="primary" 
              fullWidth
              onClick={() => handleButtonClick('Server/Client Components')}
            >
              Server/Client Components →
            </Button>
            <Button 
              variant="outline" 
              fullWidth
              onClick={() => handleButtonClick('データフェッチング')}
            >
              データフェッチング →
            </Button>
            <Button 
              variant="outline" 
              fullWidth
              onClick={() => handleButtonClick('スタイリング手法')}
            >
              スタイリング手法 →
            </Button>
          </div>
        </Card>
      </section>
    </div>
  )
}