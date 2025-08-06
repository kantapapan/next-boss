'use client'

/**
 * Client Componentでのデータフェッチング例
 * 
 * これらのコンポーネントはクライアントサイド（ブラウザ）で実行され、
 * ユーザーのインタラクションに応じてデータを取得・更新します。
 * 
 * 🟡 Client Componentの特徴：
 * - ブラウザで実行される
 * - React Hooks（useState、useEffect）が使用可能
 * - ユーザーインタラクションに即座に応答
 * - リアルタイムデータの更新が可能
 * - ローディング状態とエラー処理が必要
 */

import { useState, useEffect, useCallback } from 'react'
import { fetchPhotos, fetchAlbums, fetchTodos, fetchRealTimeData, searchPosts } from '@/lib/api'
import { Photo, Album, Todo, RealTimeData, Post, LoadingState } from '@/types'

/**
 * 写真ギャラリーComponent（Client Component）
 * 
 * ユーザーの操作に応じて写真を動的に読み込みます。
 * ローディング状態とエラー処理を含む完全な例です。
 */
export function PhotoGalleryClient() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null)
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    error: null
  })
  const [lastUpdated, setLastUpdated] = useState<string>('')

  // アルバム一覧を取得
  useEffect(() => {
    const loadAlbums = async () => {
      setLoading({ isLoading: true, error: null })
      try {
        const albumData = await fetchAlbums()
        setAlbums(albumData.slice(0, 10)) // 最初の10件のみ
      } catch (error) {
        setLoading({ isLoading: false, error: 'アルバムの読み込みに失敗しました' })
      } finally {
        setLoading(prev => ({ ...prev, isLoading: false }))
      }
    }

    loadAlbums()
  }, [])

  // 写真を読み込む関数
  const loadPhotos = useCallback(async (albumId?: number) => {
    setLoading({ isLoading: true, error: null })
    try {
      const photoData = await fetchPhotos(albumId, 12)
      setPhotos(photoData)
      setSelectedAlbum(albumId || null)
      setLastUpdated(new Date().toLocaleString('ja-JP'))
    } catch (error) {
      setLoading({ isLoading: false, error: '写真の読み込みに失敗しました' })
    } finally {
      setLoading(prev => ({ ...prev, isLoading: false }))
    }
  }, [])

  // 初期読み込み
  useEffect(() => {
    loadPhotos()
    setLastUpdated(new Date().toLocaleString('ja-JP'))
  }, [loadPhotos])

  return (
    <div style={{
      backgroundColor: '#fce4ec',
      border: '2px solid #e91e63',
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
        <h3 style={{ margin: 0, color: '#e91e63' }}>
          Client Component - 写真ギャラリー
        </h3>
      </div>

      <div style={{ 
        marginBottom: '1.5rem',
        padding: '0.75rem',
        backgroundColor: '#f8bbd9',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#880e4f'
      }}>
        <strong>🎯 Client Componentの利点：</strong>
        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
          <li>ユーザーの操作に応じた動的なデータ読み込み</li>
          <li>ローディング状態とエラー処理の実装</li>
          <li>インタラクティブなUI体験の提供</li>
          <li>リアルタイムでのコンテンツ更新</li>
        </ul>
      </div>

      {/* アルバム選択 */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '0.5rem',
          color: '#e91e63',
          fontWeight: 'bold'
        }}>
          📁 アルバムを選択:
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => loadPhotos()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: selectedAlbum === null ? '#e91e63' : 'white',
              color: selectedAlbum === null ? 'white' : '#e91e63',
              border: '1px solid #e91e63',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            すべて
          </button>
          {albums.map(album => (
            <button
              key={album.id}
              onClick={() => loadPhotos(album.id)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: selectedAlbum === album.id ? '#e91e63' : 'white',
                color: selectedAlbum === album.id ? 'white' : '#e91e63',
                border: '1px solid #e91e63',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              {album.title.slice(0, 20)}...
            </button>
          ))}
        </div>
      </div>

      {/* ローディング状態 */}
      {loading.isLoading && (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: '6px',
          border: '1px solid #f8bbd9'
        }}>
          <div style={{ 
            fontSize: '2rem', 
            marginBottom: '0.5rem',
            animation: 'spin 1s linear infinite'
          }}>⏳</div>
          <p style={{ margin: 0, color: '#e91e63' }}>
            写真を読み込み中...
          </p>
        </div>
      )}

      {/* エラー状態 */}
      {loading.error && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '6px',
          border: '1px solid #ef5350',
          marginBottom: '1rem'
        }}>
          ❌ {loading.error}
          <button
            onClick={() => loadPhotos(selectedAlbum || undefined)}
            style={{
              marginLeft: '1rem',
              padding: '0.25rem 0.5rem',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.75rem'
            }}
          >
            再試行
          </button>
        </div>
      )}

      {/* 写真グリッド */}
      {!loading.isLoading && !loading.error && photos.length > 0 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem' 
        }}>
          {photos.map((photo) => (
            <div
              key={photo.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid #f8bbd9',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '0.75rem' }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.75rem',
                  color: '#333',
                  lineHeight: '1.3'
                }}>
                  {photo.title}
                </p>
                <p style={{ 
                  margin: '0.25rem 0 0 0', 
                  fontSize: '0.625rem',
                  color: '#999'
                }}>
                  ID: {photo.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{
        marginTop: '1rem',
        padding: '0.5rem',
        backgroundColor: '#fce4ec',
        borderRadius: '4px',
        fontSize: '0.75rem',
        color: '#880e4f',
        textAlign: 'center'
      }}>
        最終更新: {lastUpdated || '読み込み中...'} (クライアントサイド)
      </div>
    </div>
  )
}

/**
 * リアルタイムダッシュボードComponent（Client Component）
 * 
 * 定期的にデータを更新し、リアルタイムな情報を表示します。
 */
export function RealTimeDashboard() {
  const [data, setData] = useState<RealTimeData | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [updateCount, setUpdateCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  // データ更新関数
  const updateData = useCallback(async () => {
    try {
      const newData = await fetchRealTimeData()
      setData(newData)
      setUpdateCount(prev => prev + 1)
    } catch (error) {
      console.error('リアルタイムデータの取得に失敗:', error)
    }
  }, [])

  // 自動更新の制御
  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(updateData, 3000) // 3秒ごとに更新

    return () => clearInterval(interval)
  }, [isActive, updateData])

  // 初回データ取得とマウント状態の設定
  useEffect(() => {
    setMounted(true)
    updateData()
  }, [updateData])

  return (
    <div style={{
      backgroundColor: '#f3e5f5',
      border: '2px solid #9c27b0',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '2rem'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '1rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🟡</span>
          <h3 style={{ margin: 0, color: '#9c27b0' }}>
            Client Component - リアルタイムダッシュボード
          </h3>
        </div>
        
        <button
          onClick={() => setIsActive(!isActive)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: isActive ? '#f44336' : '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 'bold'
          }}
        >
          {isActive ? '⏸️ 停止' : '▶️ 開始'}
        </button>
      </div>

      <div style={{ 
        marginBottom: '1.5rem',
        padding: '0.75rem',
        backgroundColor: '#e1bee7',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#4a148c'
      }}>
        <strong>⚡ リアルタイム機能：</strong>
        useEffectとsetIntervalを使用して3秒ごとにデータを自動更新。
        実際のプロジェクトではWebSocketやServer-Sent Eventsを使用します。
      </div>

      {data && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {/* ステータス */}
          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #e1bee7',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#9c27b0' }}>
              📊 ステータス
            </h4>
            <div style={{
              fontSize: '2rem',
              margin: '0.5rem 0',
              color: data.status === 'online' ? '#4caf50' : '#f44336'
            }}>
              {data.status === 'online' ? '🟢' : '🔴'}
            </div>
            <p style={{ 
              margin: 0, 
              fontSize: '1rem',
              fontWeight: 'bold',
              color: data.status === 'online' ? '#4caf50' : '#f44336'
            }}>
              {data.status === 'online' ? 'オンライン' : 'オフライン'}
            </p>
          </div>

          {/* 値 */}
          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #e1bee7',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#9c27b0' }}>
              📈 現在値
            </h4>
            <p style={{ 
              margin: 0, 
              fontSize: '2rem', 
              fontWeight: 'bold',
              color: '#9c27b0',
              fontFamily: 'monospace'
            }}>
              {data.value}
            </p>
          </div>

          {/* CPU使用率 */}
          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #e1bee7'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#9c27b0' }}>
              💻 CPU使用率
            </h4>
            <div style={{
              backgroundColor: '#f5f5f5',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '0.5rem'
            }}>
              <div style={{
                width: `${data.metrics.cpu}%`,
                height: '20px',
                backgroundColor: data.metrics.cpu > 80 ? '#f44336' : 
                               data.metrics.cpu > 60 ? '#ff9800' : '#4caf50',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>
              {data.metrics.cpu}%
            </p>
          </div>

          {/* メモリ使用率 */}
          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #e1bee7'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#9c27b0' }}>
              🧠 メモリ使用率
            </h4>
            <div style={{
              backgroundColor: '#f5f5f5',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '0.5rem'
            }}>
              <div style={{
                width: `${data.metrics.memory}%`,
                height: '20px',
                backgroundColor: data.metrics.memory > 80 ? '#f44336' : 
                               data.metrics.memory > 60 ? '#ff9800' : '#4caf50',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>
              {data.metrics.memory}%
            </p>
          </div>
        </div>
      )}

      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: 'white',
        borderRadius: '4px',
        border: '1px solid #e1bee7',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.875rem',
        color: '#666'
      }}>
        <span>
          最終更新: {mounted && data ? new Date(data.timestamp).toLocaleTimeString('ja-JP') : '未取得'}
        </span>
        <span>
          更新回数: {updateCount}回
        </span>
        <span style={{
          padding: '0.25rem 0.5rem',
          backgroundColor: isActive ? '#4caf50' : '#9e9e9e',
          color: 'white',
          borderRadius: '12px',
          fontSize: '0.75rem'
        }}>
          {isActive ? '自動更新中' : '停止中'}
        </span>
      </div>
    </div>
  )
}

/**
 * 投稿検索Component（Client Component）
 * 
 * ユーザーの入力に応じてリアルタイムで検索を実行します。
 */
export function PostSearchClient() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [searchCount, setSearchCount] = useState(0)

  // 検索実行関数
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const searchResults = await searchPosts(searchQuery)
      setResults(searchResults)
      setSearchCount(prev => prev + 1)
    } catch (error) {
      console.error('検索エラー:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  // デバウンス処理付きの検索
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query)
    }, 500) // 500ms後に検索実行

    return () => clearTimeout(timeoutId)
  }, [query, performSearch])

  return (
    <div style={{
      backgroundColor: '#e0f2f1',
      border: '2px solid #00796b',
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
        <h3 style={{ margin: 0, color: '#00796b' }}>
          Client Component - 投稿検索
        </h3>
      </div>

      <div style={{ 
        marginBottom: '1.5rem',
        padding: '0.75rem',
        backgroundColor: '#b2dfdb',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#004d40'
      }}>
        <strong>🔍 リアルタイム検索：</strong>
        useEffectとsetTimeoutを使用したデバウンス処理で、
        ユーザーの入力に応じてリアルタイムで検索を実行します。
      </div>

      {/* 検索フォーム */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '0.5rem',
          color: '#00796b',
          fontWeight: 'bold'
        }}>
          🔍 投稿を検索:
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="タイトルまたは本文で検索..."
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '4px',
            border: '1px solid #b2dfdb',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }}
        />
        <div style={{
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: '#666',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>検索回数: {searchCount}回</span>
          {loading && <span>🔍 検索中...</span>}
        </div>
      </div>

      {/* 検索結果 */}
      {query && !loading && (
        <div>
          <h4 style={{ 
            margin: '0 0 1rem 0', 
            color: '#00796b',
            fontSize: '1.1rem'
          }}>
            📝 検索結果 ({results.length}件)
          </h4>
          
          {results.length === 0 ? (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              backgroundColor: 'white',
              borderRadius: '6px',
              border: '1px solid #b2dfdb',
              color: '#666'
            }}>
              「{query}」に一致する投稿が見つかりませんでした。
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {results.slice(0, 5).map((post) => (
                <div
                  key={post.id}
                  style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '6px',
                    border: '1px solid #b2dfdb',
                    borderLeft: '4px solid #00796b'
                  }}
                >
                  <h5 style={{ 
                    margin: '0 0 0.5rem 0', 
                    color: '#00796b',
                    fontSize: '1rem'
                  }}>
                    {post.title}
                  </h5>
                  <p style={{ 
                    margin: '0 0 0.5rem 0', 
                    color: '#333',
                    lineHeight: '1.4',
                    fontSize: '0.9rem'
                  }}>
                    {post.body}
                  </p>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: '#666',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span>投稿ID: {post.id}</span>
                    <span>ユーザーID: {post.userId}</span>
                  </div>
                </div>
              ))}
              
              {results.length > 5 && (
                <div style={{
                  textAlign: 'center',
                  padding: '1rem',
                  color: '#666',
                  fontSize: '0.875rem',
                  fontStyle: 'italic'
                }}>
                  ... さらに {results.length - 5} 件の結果があります
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}