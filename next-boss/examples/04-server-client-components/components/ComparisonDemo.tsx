'use client'

import { useState } from 'react'

/**
 * Server ComponentとClient Componentの比較デモ
 * 
 * このコンポーネントは、同じ機能をServer ComponentとClient Componentで
 * 実装した場合の違いを視覚的に比較するためのデモです。
 */

interface ComparisonItem {
  feature: string
  serverComponent: {
    available: boolean
    description: string
    example?: string
  }
  clientComponent: {
    available: boolean
    description: string
    example?: string
  }
}

const comparisonData: ComparisonItem[] = [
  {
    feature: 'React Hooks',
    serverComponent: {
      available: false,
      description: '使用不可 - サーバーサイドでは状態管理ができない',
      example: '❌ useState, useEffect, useContext等'
    },
    clientComponent: {
      available: true,
      description: '使用可能 - 動的な状態管理とライフサイクル制御',
      example: '✅ useState, useEffect, useContext等'
    }
  },
  {
    feature: 'データフェッチング',
    serverComponent: {
      available: true,
      description: 'ビルド時/リクエスト時に実行 - 高速な初期表示',
      example: '✅ await fetch(), データベース直接アクセス'
    },
    clientComponent: {
      available: true,
      description: 'ユーザー操作時に実行 - 動的なデータ更新',
      example: '✅ useEffect + fetch(), リアルタイム更新'
    }
  },
  {
    feature: 'イベントハンドリング',
    serverComponent: {
      available: false,
      description: '使用不可 - ユーザーインタラクションに応答できない',
      example: '❌ onClick, onChange, onSubmit等'
    },
    clientComponent: {
      available: true,
      description: '使用可能 - ユーザーインタラクションに即座に応答',
      example: '✅ onClick, onChange, onSubmit等'
    }
  },
  {
    feature: 'ブラウザAPI',
    serverComponent: {
      available: false,
      description: '使用不可 - サーバー環境にはブラウザAPIが存在しない',
      example: '❌ localStorage, sessionStorage, window等'
    },
    clientComponent: {
      available: true,
      description: '使用可能 - ブラウザの全機能にアクセス可能',
      example: '✅ localStorage, sessionStorage, window等'
    }
  },
  {
    feature: 'SEO対応',
    serverComponent: {
      available: true,
      description: '優秀 - 初期HTMLにコンテンツが含まれる',
      example: '✅ 検索エンジンがコンテンツを認識'
    },
    clientComponent: {
      available: false,
      description: '制限あり - 初期HTMLは空、JSで後から描画',
      example: '⚠️ 検索エンジンの認識に制限'
    }
  },
  {
    feature: 'バンドルサイズ',
    serverComponent: {
      available: true,
      description: '軽量 - クライアントサイドのJSに含まれない',
      example: '✅ 0KB（クライアントサイド）'
    },
    clientComponent: {
      available: false,
      description: '重い - 全てのコードがクライアントサイドに送信',
      example: '⚠️ コンポーネントサイズ分増加'
    }
  },
  {
    feature: '初期表示速度',
    serverComponent: {
      available: true,
      description: '高速 - サーバーで事前レンダリング済み',
      example: '✅ 即座にコンテンツ表示'
    },
    clientComponent: {
      available: false,
      description: '遅い - JSダウンロード後にレンダリング',
      example: '⚠️ ローディング状態が必要'
    }
  },
  {
    feature: 'リアルタイム更新',
    serverComponent: {
      available: false,
      description: '不可 - 静的なコンテンツのみ',
      example: '❌ ページリロードが必要'
    },
    clientComponent: {
      available: true,
      description: '可能 - 動的なコンテンツ更新',
      example: '✅ リアルタイム更新、アニメーション'
    }
  }
]

export function ComparisonDemo() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  // 機能選択時の処理
  const handleFeatureSelect = (feature: string) => {
    if (selectedFeature === feature) {
      setSelectedFeature(null)
    } else {
      setSelectedFeature(feature)
    }
  }

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      border: '2px solid #666',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '2rem'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '1rem' 
      }}>
        <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>⚖️</span>
        <h3 style={{ margin: 0, color: '#333' }}>
          Server Component vs Client Component 比較
        </h3>
      </div>

      <p style={{ 
        color: '#555', 
        fontSize: '0.875rem',
        marginBottom: '1.5rem',
        backgroundColor: '#e0e0e0',
        padding: '0.75rem',
        borderRadius: '4px'
      }}>
        💡 各機能をクリックすると詳細が表示されます。どちらのコンポーネントタイプを選ぶべきかの参考にしてください。
      </p>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '200px 1fr 1fr',
        gap: '1px',
        backgroundColor: '#ccc',
        borderRadius: '6px',
        overflow: 'hidden'
      }}>
        {/* ヘッダー */}
        <div style={{
          backgroundColor: '#333',
          color: 'white',
          padding: '1rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          機能
        </div>
        <div style={{
          backgroundColor: '#0277bd',
          color: 'white',
          padding: '1rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          🔵 Server Component
        </div>
        <div style={{
          backgroundColor: '#f57c00',
          color: 'white',
          padding: '1rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          🟡 Client Component
        </div>

        {/* データ行 */}
        {comparisonData.map((item, index) => [
          /* 機能名 */
          <div
            key={`feature-${index}`}
            onClick={() => handleFeatureSelect(item.feature)}
            style={{
              backgroundColor: selectedFeature === item.feature ? '#fff3e0' : 'white',
              padding: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#333',
              transition: 'background-color 0.2s',
              borderLeft: selectedFeature === item.feature ? '4px solid #ff9800' : '4px solid transparent'
            }}
          >
            {item.feature}
          </div>,

          /* Server Component */
          <div
            key={`server-${index}`}
            style={{
              backgroundColor: selectedFeature === item.feature ? '#e3f2fd' : 'white',
              padding: '1rem',
              transition: 'background-color 0.2s'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ 
                fontSize: '1.2rem', 
                marginRight: '0.5rem',
                color: item.serverComponent.available ? '#4caf50' : '#f44336'
              }}>
                {item.serverComponent.available ? '✅' : '❌'}
              </span>
              <span style={{ 
                fontWeight: 'bold',
                color: item.serverComponent.available ? '#2e7d32' : '#c62828'
              }}>
                {item.serverComponent.available ? '対応' : '非対応'}
              </span>
            </div>
            <p style={{ 
              margin: 0, 
              fontSize: '0.875rem', 
              color: '#666',
              lineHeight: '1.4'
            }}>
              {item.serverComponent.description}
            </p>
            {selectedFeature === item.feature && item.serverComponent.example && (
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                fontSize: '0.75rem', 
                color: '#0277bd',
                backgroundColor: '#e3f2fd',
                padding: '0.25rem',
                borderRadius: '2px',
                fontFamily: 'monospace'
              }}>
                {item.serverComponent.example}
              </p>
            )}
          </div>,

          /* Client Component */
          <div
            key={`client-${index}`}
            style={{
              backgroundColor: selectedFeature === item.feature ? '#fff8e1' : 'white',
              padding: '1rem',
              transition: 'background-color 0.2s'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ 
                fontSize: '1.2rem', 
                marginRight: '0.5rem',
                color: item.clientComponent.available ? '#4caf50' : '#f44336'
              }}>
                {item.clientComponent.available ? '✅' : '❌'}
              </span>
              <span style={{ 
                fontWeight: 'bold',
                color: item.clientComponent.available ? '#2e7d32' : '#c62828'
              }}>
                {item.clientComponent.available ? '対応' : '非対応'}
              </span>
            </div>
            <p style={{ 
              margin: 0, 
              fontSize: '0.875rem', 
              color: '#666',
              lineHeight: '1.4'
            }}>
              {item.clientComponent.description}
            </p>
            {selectedFeature === item.feature && item.clientComponent.example && (
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                fontSize: '0.75rem', 
                color: '#f57c00',
                backgroundColor: '#fff8e1',
                padding: '0.25rem',
                borderRadius: '2px',
                fontFamily: 'monospace'
              }}>
                {item.clientComponent.example}
              </p>
            )}
          </div>
        ]).flat()}
      </div>

      {/* 選択された機能の詳細説明 */}
      {selectedFeature && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#fff3e0',
          border: '2px solid #ff9800',
          borderRadius: '6px'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#e65100' }}>
            📋 {selectedFeature} の詳細
          </h4>
          <p style={{ margin: 0, color: '#bf360c', lineHeight: '1.5' }}>
            この機能を使用する際は、Server ComponentとClient Componentの特性を理解して
            適切な選択をすることが重要です。一般的に、静的なコンテンツや初期データの表示には
            Server Componentを、ユーザーインタラクションや動的な更新にはClient Componentを使用します。
          </p>
        </div>
      )}

      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: '#e8f5e8',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#2e7d32'
      }}>
        <strong>💡 選択の指針：</strong>
        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
          <li><strong>Server Component</strong>: 静的コンテンツ、初期データ表示、SEO重視の場合</li>
          <li><strong>Client Component</strong>: ユーザーインタラクション、動的更新、ブラウザAPI使用の場合</li>
          <li><strong>ハイブリッド</strong>: Server ComponentにClient Componentを組み込んで最適化</li>
        </ul>
      </div>
    </div>
  )
}