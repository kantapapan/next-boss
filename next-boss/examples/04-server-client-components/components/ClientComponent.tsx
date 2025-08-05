'use client'

import { useState, useEffect } from 'react'
import { getComments, getRealTimeData, localStorage, Comment } from '@/lib/data'

/**
 * Client Componentの例
 * 
 * このコンポーネントはクライアントサイド（ブラウザ）で実行されます。
 * 以下の特徴があります：
 * 
 * ✅ できること：
 * - React Hooks（useState、useEffect等）の使用
 * - ブラウザ専用API（localStorage、sessionStorage等）へのアクセス
 * - イベントハンドラー（onClick、onChange等）の使用
 * - ユーザーインタラクション
 * - リアルタイムデータの更新
 * - 動的なUI状態管理
 * 
 * ❌ できないこと：
 * - サーバーサイドでの事前レンダリング
 * - データベースへの直接アクセス
 * - サーバー環境変数やシークレットへのアクセス
 * - 初期HTMLにコンテンツが含まれない（SEOに不利）
 */

/**
 * インタラクティブなカウンターComponent
 */
export function InteractiveCounter() {
  // useState Hook - Client Componentでのみ使用可能
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')

  // useEffect Hook - Client Componentでのみ使用可能
  useEffect(() => {
    // ローカルストレージからカウント値を復元
    const savedCount = localStorage.get('counter')
    if (savedCount) {
      setCount(parseInt(savedCount, 10))
    }
  }, [])

  // カウント値をローカルストレージに保存
  useEffect(() => {
    localStorage.set('counter', count.toString())
  }, [count])

  // イベントハンドラー - Client Componentでのみ使用可能
  const handleIncrement = () => {
    setCount(prev => prev + 1)
    setMessage('カウントが増加しました！')
    setTimeout(() => setMessage(''), 2000)
  }

  const handleDecrement = () => {
    setCount(prev => Math.max(0, prev - 1))
    setMessage('カウントが減少しました！')
    setTimeout(() => setMessage(''), 2000)
  }

  const handleReset = () => {
    setCount(0)
    setMessage('カウントがリセットされました！')
    setTimeout(() => setMessage(''), 2000)
  }

  return (
    <div style={{
      backgroundColor: '#fce4ec',
      border: '2px solid #c2185b',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '2rem'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '1rem' 
      }}>
        <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🟡</span>
        <h3 style={{ margin: 0, color: '#c2185b' }}>
          Client Component - インタラクティブカウンター
        </h3>
      </div>

      <p style={{ 
        color: '#880e4f', 
        fontSize: '0.875rem',
        marginBottom: '1rem',
        backgroundColor: '#f8bbd9',
        padding: '0.5rem',
        borderRadius: '4px'
      }}>
        💡 このコンポーネントはブラウザで実行され、ユーザーのインタラクションに応答します。
      </p>

      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '6px',
        border: '1px solid #f8bbd9',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold',
            color: '#c2185b',
            fontFamily: 'monospace'
          }}>
            {count}
          </span>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          <button
            onClick={handleDecrement}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            − 減らす
          </button>
          
          <button
            onClick={handleReset}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#9e9e9e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            リセット
          </button>
          
          <button
            onClick={handleIncrement}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            + 増やす
          </button>
        </div>

        {message && (
          <div style={{
            padding: '0.5rem',
            backgroundColor: '#e1f5fe',
            color: '#0277bd',
            borderRadius: '4px',
            fontSize: '0.875rem',
            fontWeight: 'bold'
          }}>
            {message}
          </div>
        )}
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#f8bbd9',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#880e4f'
      }}>
        <strong>Client Componentの特徴：</strong>
        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
          <li>React Hooks（useState、useEffect）が使用可能</li>
          <li>ユーザーのインタラクションに即座に応答</li>
          <li>ローカルストレージなどのブラウザAPIにアクセス可能</li>
          <li>動的な状態管理とリアルタイム更新</li>
        </ul>
      </div>
    </div>
  )
}

/**
 * 動的コメント読み込みComponent
 */
export function DynamicComments() {
  const [postId, setPostId] = useState(1)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // コメントを読み込む関数
  const loadComments = async (id: number) => {
    setLoading(true)
    setError(null)
    
    try {
      const fetchedComments = await getComments(id)
      setComments(fetchedComments)
    } catch {
      setError('コメントの読み込みに失敗しました')
    } finally {
      setLoading(false)
    }
  }

  // 投稿IDが変更されたときにコメントを読み込む
  useEffect(() => {
    loadComments(postId)
  }, [postId])

  return (
    <div style={{
      backgroundColor: '#f3e5f5',
      border: '2px solid #7b1fa2',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '2rem'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '1rem' 
      }}>
        <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🟡</span>
        <h3 style={{ margin: 0, color: '#7b1fa2' }}>
          Client Component - 動的コメント読み込み
        </h3>
      </div>

      <p style={{ 
        color: '#4a148c', 
        fontSize: '0.875rem',
        marginBottom: '1rem',
        backgroundColor: '#e1bee7',
        padding: '0.5rem',
        borderRadius: '4px'
      }}>
        💡 ユーザーの操作に応じて動的にデータを取得し、UIを更新します。
      </p>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '0.5rem',
          color: '#7b1fa2',
          fontWeight: 'bold'
        }}>
          投稿ID を選択:
        </label>
        <select
          value={postId}
          onChange={(e) => setPostId(parseInt(e.target.value, 10))}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ce93d8',
            fontSize: '1rem',
            minWidth: '100px'
          }}
        >
          {[1, 2, 3, 4, 5].map(id => (
            <option key={id} value={id}>投稿 {id}</option>
          ))}
        </select>
      </div>

      {loading && (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: '6px',
          border: '1px solid #e1bee7'
        }}>
          <div style={{ 
            fontSize: '1.5rem', 
            marginBottom: '0.5rem' 
          }}>⏳</div>
          <p style={{ margin: 0, color: '#7b1fa2' }}>
            コメントを読み込み中...
          </p>
        </div>
      )}

      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '6px',
          border: '1px solid #ef5350'
        }}>
          ❌ {error}
        </div>
      )}

      {!loading && !error && comments.length > 0 && (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem' 
        }}>
          {comments.slice(0, 3).map((comment) => (
            <div
              key={comment.id}
              style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '6px',
                border: '1px solid #e1bee7'
              }}
            >
              <h4 style={{ 
                margin: '0 0 0.5rem 0', 
                color: '#7b1fa2',
                fontSize: '1rem'
              }}>
                {comment.name}
              </h4>
              <p style={{ 
                margin: '0 0 0.5rem 0', 
                fontSize: '0.875rem',
                color: '#666'
              }}>
                📧 {comment.email}
              </p>
              <p style={{ 
                margin: 0, 
                color: '#333',
                lineHeight: '1.4'
              }}>
                {comment.body}
              </p>
            </div>
          ))}
        </div>
      )}

      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#e1bee7',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#4a148c'
      }}>
        <strong>動的データ読み込みの特徴：</strong>
        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
          <li>ユーザーの操作に応じてAPIからデータを取得</li>
          <li>ローディング状態とエラー状態を管理</li>
          <li>非同期処理とstate更新の組み合わせ</li>
          <li>インタラクティブなユーザー体験を提供</li>
        </ul>
      </div>
    </div>
  )
}

/**
 * リアルタイム時刻表示Component
 */
export function RealTimeDisplay() {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [realTimeData, setRealTimeData] = useState<{
    timestamp: string
    randomValue: number
  } | null>(null)

  // 現在時刻を更新する関数
  const updateTime = () => {
    const now = new Date().toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    setCurrentTime(now)
  }

  // リアルタイムデータを更新する関数
  const updateRealTimeData = async () => {
    const data = await getRealTimeData()
    setRealTimeData(data)
  }

  // コンポーネントマウント時とタイマー設定
  useEffect(() => {
    updateTime()
    updateRealTimeData()

    // 1秒ごとに時刻を更新
    const timeInterval = setInterval(updateTime, 1000)
    
    // 3秒ごとにリアルタイムデータを更新
    const dataInterval = setInterval(updateRealTimeData, 3000)

    // クリーンアップ
    return () => {
      clearInterval(timeInterval)
      clearInterval(dataInterval)
    }
  }, [])

  return (
    <div style={{
      backgroundColor: '#e8f5e8',
      border: '2px solid #388e3c',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '2rem'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '1rem' 
      }}>
        <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🟡</span>
        <h3 style={{ margin: 0, color: '#388e3c' }}>
          Client Component - リアルタイム表示
        </h3>
      </div>

      <p style={{ 
        color: '#1b5e20', 
        fontSize: '0.875rem',
        marginBottom: '1rem',
        backgroundColor: '#c8e6c9',
        padding: '0.5rem',
        borderRadius: '4px'
      }}>
        💡 このコンポーネントはクライアントサイドでリアルタイムに更新されます。
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem'
      }}>
        {/* リアルタイム時刻 */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '6px',
          border: '1px solid #c8e6c9',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#388e3c' }}>
            🕐 現在時刻
          </h4>
          <p style={{ 
            margin: 0, 
            fontSize: '1.2rem', 
            fontWeight: 'bold',
            color: '#2e7d32',
            fontFamily: 'monospace'
          }}>
            {currentTime}
          </p>
          <p style={{ 
            margin: '0.5rem 0 0 0', 
            fontSize: '0.75rem', 
            color: '#666'
          }}>
            1秒ごとに自動更新
          </p>
        </div>

        {/* リアルタイムデータ */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '6px',
          border: '1px solid #c8e6c9',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#388e3c' }}>
            📊 ランダムデータ
          </h4>
          {realTimeData && (
            <>
              <p style={{ 
                margin: '0 0 0.5rem 0', 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                color: '#2e7d32',
                fontFamily: 'monospace'
              }}>
                {realTimeData.randomValue}
              </p>
              <p style={{ 
                margin: 0, 
                fontSize: '0.75rem', 
                color: '#666'
              }}>
                最終更新: {new Date(realTimeData.timestamp).toLocaleTimeString('ja-JP')}
              </p>
            </>
          )}
          <p style={{ 
            margin: '0.5rem 0 0 0', 
            fontSize: '0.75rem', 
            color: '#666'
          }}>
            3秒ごとに自動更新
          </p>
        </div>
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#c8e6c9',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#1b5e20'
      }}>
        <strong>リアルタイム更新の特徴：</strong>
        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
          <li>setIntervalを使用した定期的な更新</li>
          <li>useEffectでのタイマー管理とクリーンアップ</li>
          <li>非同期データ取得とstate更新</li>
          <li>ユーザーがページを見ている間の継続的な更新</li>
        </ul>
      </div>
    </div>
  )
}