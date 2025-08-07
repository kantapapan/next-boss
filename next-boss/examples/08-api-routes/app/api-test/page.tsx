/**
 * API Test Page
 * 
 * API Routesをテストするためのページです。
 * 各エンドポイントに対してHTTPリクエストを送信し、レスポンスを確認できます。
 */

'use client';

import { useState } from 'react';

interface TestResult {
  method: string;
  url: string;
  status: number;
  response: any;
  error?: string;
  timestamp: string;
}

export default function ApiTestPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);

  // APIテストを実行
  const runTest = async (method: string, url: string, body?: any) => {
    setLoading(true);
    const timestamp = new Date().toLocaleTimeString('ja-JP');
    
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      if (body && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      const data = await response.json();
      
      const result: TestResult = {
        method,
        url,
        status: response.status,
        response: data,
        timestamp,
      };
      
      setResults(prev => [result, ...prev]);
    } catch (error) {
      const result: TestResult = {
        method,
        url,
        status: 0,
        response: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp,
      };
      
      setResults(prev => [result, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  // 結果をクリア
  const clearResults = () => {
    setResults([]);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>API テスト</h2>
        <button
          onClick={clearResults}
          disabled={results.length === 0}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: results.length === 0 ? 'not-allowed' : 'pointer',
            opacity: results.length === 0 ? 0.5 : 1
          }}
        >
          結果をクリア
        </button>
      </div>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
        {/* テストボタン */}
        <div>
          <h3 style={{ marginBottom: '1rem' }}>テスト実行</h3>
          
          {/* Health Check */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#0070f3' }}>Health Check</h4>
            <button
              onClick={() => runTest('GET', '/api/health')}
              disabled={loading}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1
              }}
            >
              GET /api/health
            </button>
          </div>

          {/* Users API */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#0070f3' }}>Users API</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button
                onClick={() => runTest('GET', '/api/users')}
                disabled={loading}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                GET /api/users
              </button>
              <button
                onClick={() => runTest('POST', '/api/users', {
                  name: 'テストユーザー',
                  email: `test${Date.now()}@example.com`
                })}
                disabled={loading}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#0070f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                POST /api/users
              </button>
              <button
                onClick={() => runTest('GET', '/api/users/1')}
                disabled={loading}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                GET /api/users/1
              </button>
              <button
                onClick={() => runTest('PUT', '/api/users/1', {
                  name: '更新されたユーザー'
                })}
                disabled={loading}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ffc107',
                  color: 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                PUT /api/users/1
              </button>
            </div>
          </div>

          {/* Posts API */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#0070f3' }}>Posts API</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button
                onClick={() => runTest('GET', '/api/posts')}
                disabled={loading}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                GET /api/posts
              </button>
              <button
                onClick={() => runTest('GET', '/api/posts?published=true')}
                disabled={loading}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                GET /api/posts?published=true
              </button>
              <button
                onClick={() => runTest('POST', '/api/posts', {
                  title: 'テスト投稿',
                  content: 'これはテスト用の投稿です。',
                  authorId: '1',
                  published: true
                })}
                disabled={loading}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#0070f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                POST /api/posts
              </button>
              <button
                onClick={() => runTest('GET', '/api/posts/1')}
                disabled={loading}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                GET /api/posts/1
              </button>
            </div>
          </div>

          {/* Error Tests */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#dc3545' }}>エラーテスト</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button
                onClick={() => runTest('GET', '/api/users/999')}
                disabled={loading}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                404エラー (存在しないユーザー)
              </button>
              <button
                onClick={() => runTest('POST', '/api/users', {
                  name: '',
                  email: 'invalid-email'
                })}
                disabled={loading}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                バリデーションエラー
              </button>
              <button
                onClick={() => runTest('PATCH', '/api/users')}
                disabled={loading}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                405エラー (許可されていないメソッド)
              </button>
            </div>
          </div>
        </div>

        {/* テスト結果 */}
        <div>
          <h3 style={{ marginBottom: '1rem' }}>テスト結果</h3>
          
          {loading && (
            <div style={{ 
              backgroundColor: '#fff3cd', 
              padding: '1rem', 
              borderRadius: '8px', 
              marginBottom: '1rem',
              color: '#856404'
            }}>
              テスト実行中...
            </div>
          )}

          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {results.map((result, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: `2px solid ${getStatusColor(result.status)}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: getMethodColor(result.method),
                      color: 'white',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {result.method}
                    </span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                      {result.url}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: getStatusColor(result.status),
                      color: 'white',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {result.status || 'ERROR'}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>
                      {result.timestamp}
                    </span>
                  </div>
                </div>
                
                {result.error ? (
                  <div style={{ 
                    backgroundColor: '#f8d7da', 
                    color: '#721c24', 
                    padding: '0.5rem', 
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem'
                  }}>
                    エラー: {result.error}
                  </div>
                ) : (
                  <pre style={{
                    backgroundColor: '#f8f9fa',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    overflow: 'auto',
                    margin: 0
                  }}>
                    {JSON.stringify(result.response, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>

          {results.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              color: '#666',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              テスト結果がここに表示されます
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// HTTPメソッドに応じた色を取得
function getMethodColor(method: string): string {
  switch (method) {
    case 'GET': return '#28a745';
    case 'POST': return '#0070f3';
    case 'PUT': return '#ffc107';
    case 'DELETE': return '#dc3545';
    case 'PATCH': return '#6f42c1';
    default: return '#6c757d';
  }
}

// HTTPステータスコードに応じた色を取得
function getStatusColor(status: number): string {
  if (status >= 200 && status < 300) return '#28a745';
  if (status >= 300 && status < 400) return '#17a2b8';
  if (status >= 400 && status < 500) return '#ffc107';
  if (status >= 500) return '#dc3545';
  return '#6c757d';
}