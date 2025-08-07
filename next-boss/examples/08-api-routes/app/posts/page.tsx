/**
 * Posts Management Page
 * 
 * ブログ投稿管理ページです。
 * API Routesを使用して投稿の一覧表示、作成、更新、削除を行います。
 */

'use client';

import { useState, useEffect } from 'react';
import { Post, User, CreatePostRequest, UpdatePostRequest, ApiResponse } from '@/types';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  // 投稿一覧を取得
  const fetchPosts = async () => {
    try {
      setLoading(true);
      let url = '/api/posts';
      if (filter === 'published') url += '?published=true';
      if (filter === 'draft') url += '?published=false';
      
      const response = await fetch(url);
      const data: ApiResponse<Post[]> = await response.json();
      
      if (data.success && data.data) {
        setPosts(data.data);
      } else {
        setError(data.error || '投稿の取得に失敗しました');
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // ユーザー一覧を取得
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data: ApiResponse<User[]> = await response.json();
      
      if (data.success && data.data) {
        setUsers(data.data);
      }
    } catch (err) {
      console.error('ユーザー取得エラー:', err);
    }
  };

  // 投稿を作成
  const createPost = async (postData: CreatePostRequest) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      const data: ApiResponse<Post> = await response.json();
      
      if (data.success && data.data) {
        setPosts(prev => [data.data!, ...prev]);
        setShowCreateForm(false);
        alert('投稿が作成されました');
      } else {
        alert(data.error || '投稿の作成に失敗しました');
      }
    } catch (err) {
      alert('ネットワークエラーが発生しました');
    }
  };

  // 投稿を更新
  const updatePost = async (id: string, postData: UpdatePostRequest) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      const data: ApiResponse<Post> = await response.json();
      
      if (data.success && data.data) {
        setPosts(prev => prev.map(post => 
          post.id === id ? data.data! : post
        ));
        setEditingPost(null);
        alert('投稿が更新されました');
      } else {
        alert(data.error || '投稿の更新に失敗しました');
      }
    } catch (err) {
      alert('ネットワークエラーが発生しました');
    }
  };

  // 投稿を削除
  const deletePost = async (id: string) => {
    if (!confirm('本当にこの投稿を削除しますか？')) return;
    
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setPosts(prev => prev.filter(post => post.id !== id));
        alert('投稿が削除されました');
      } else {
        alert(data.error || '投稿の削除に失敗しました');
      }
    } catch (err) {
      alert('ネットワークエラーが発生しました');
    }
  };

  // 著者名を取得
  const getAuthorName = (authorId: string) => {
    const author = users.find(user => user.id === authorId);
    return author ? author.name : '不明';
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>読み込み中...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
        エラー: {error}
        <br />
        <button onClick={fetchPosts} style={{ marginTop: '1rem' }}>
          再試行
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>投稿管理</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* フィルター */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'published' | 'draft')}
            style={{
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="all">すべて</option>
            <option value="published">公開済み</option>
            <option value="draft">下書き</option>
          </select>
          
          <button
            onClick={() => setShowCreateForm(true)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            新規投稿作成
          </button>
        </div>
      </div>

      {/* 作成フォーム */}
      {showCreateForm && (
        <CreatePostForm
          users={users}
          onSubmit={createPost}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {/* 編集フォーム */}
      {editingPost && (
        <EditPostForm
          post={editingPost}
          users={users}
          onSubmit={(postData) => updatePost(editingPost.id, postData)}
          onCancel={() => setEditingPost(null)}
        />
      )}

      {/* 投稿一覧 */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: post.published ? '2px solid #28a745' : '2px solid #ffc107'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{post.title}</h3>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                  <span>著者: {getAuthorName(post.authorId)}</span>
                  <span>作成: {new Date(post.createdAt).toLocaleDateString('ja-JP')}</span>
                  <span style={{ 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '4px', 
                    backgroundColor: post.published ? '#d4edda' : '#fff3cd',
                    color: post.published ? '#155724' : '#856404'
                  }}>
                    {post.published ? '公開済み' : '下書き'}
                  </span>
                </div>
                <p style={{ margin: '0.5rem 0', lineHeight: 1.6, color: '#555' }}>
                  {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                <button
                  onClick={() => setEditingPost(post)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  編集
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          投稿がありません
        </div>
      )}
    </div>
  );
}

// 投稿作成フォームコンポーネント
function CreatePostForm({ 
  users,
  onSubmit, 
  onCancel 
}: { 
  users: User[];
  onSubmit: (data: CreatePostRequest) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [published, setPublished] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim() && authorId) {
      onSubmit({ 
        title: title.trim(), 
        content: content.trim(), 
        authorId,
        published 
      });
      setTitle('');
      setContent('');
      setAuthorId('');
      setPublished(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '1.5rem', 
      borderRadius: '8px', 
      marginBottom: '2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>新規投稿作成</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>タイトル:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>内容:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical'
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>著者:</label>
          <select
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="">著者を選択してください</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            公開する
          </label>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            作成
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}

// 投稿編集フォームコンポーネント
function EditPostForm({ 
  post,
  users,
  onSubmit, 
  onCancel 
}: { 
  post: Post;
  users: User[];
  onSubmit: (data: UpdatePostRequest) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [published, setPublished] = useState(post.published);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updates: UpdatePostRequest = {};
    if (title.trim() !== post.title) updates.title = title.trim();
    if (content.trim() !== post.content) updates.content = content.trim();
    if (published !== post.published) updates.published = published;
    
    if (Object.keys(updates).length > 0) {
      onSubmit(updates);
    } else {
      onCancel();
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '1.5rem', 
      borderRadius: '8px', 
      marginBottom: '2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>投稿編集 (ID: {post.id})</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>タイトル:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>内容:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical'
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            公開する
          </label>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            更新
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}