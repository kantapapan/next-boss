import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Server vs Client Components - Next.js学習',
  description: 'Next.jsのServer ComponentsとClient Componentsの違いと使い分けを学習',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: '#f8f9fa',
        color: '#333',
        lineHeight: 1.6
      }}>
        <header style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e0e0e0',
          padding: '1rem 2rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <h1 style={{
              margin: 0,
              fontSize: '1.5rem',
              color: '#333'
            }}>
              🔵🟡 Server vs Client Components
            </h1>
            <span style={{
              backgroundColor: '#e3f2fd',
              color: '#0277bd',
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '0.875rem',
              fontWeight: 'bold'
            }}>
              Next.js 15.4.5
            </span>
          </div>
        </header>
        
        <main style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          {children}
        </main>
        
        <footer style={{
          marginTop: '4rem',
          padding: '2rem',
          textAlign: 'center',
          color: '#666',
          fontSize: '0.875rem',
          borderTop: '1px solid #e0e0e0'
        }}>
          <p style={{ margin: 0 }}>
            Next.js学習用リポジトリ - Server ComponentsとClient Componentsの実践例
          </p>
        </footer>
      </body>
    </html>
  )
}