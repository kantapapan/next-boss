/**
 * Users Management Page
 * 
 * ユーザー管理ページです。
 * API Routesを使用してユーザーの一覧表示、作成、更新、削除を行います。
 */

'use client';

import { useState, useEffect } from 'react';
import { User, CreateUserRequest, UpdateUserRequest, ApiResponse } from '@/types';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // ユーザー一覧を取得
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      const data: ApiResponse<User[]> = await response.json();
      
      if (data.success && data.data) {
        setUsers(data.data);
      } else {
        setError(data.error || 'ユーザーの取得に失敗しました');
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // ユーザーを作成
  const createUser = async (userData: CreateUserRequest) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data: ApiResponse<User> = await response.json();
      
      if (data.success && data.data) {
        setUsers(prev => [...prev, data.data!]);
        setShowCreateForm(false);
        alert('ユーザーが作成されました');
      } else {
        alert(data.error || 'ユーザーの作成に失敗しました');
      }
    } catch (err) {
      alert('ネットワークエラーが発生しました');
    }
  };

  // ユーザーを更新
  const updateUser = async (id: string, userData: UpdateUserRequest) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data: ApiResponse<User> = await response.json();
      
      if (data.success && data.data) {
        setUsers(prev => prev.map(user => 
          user.id === id ? data.data! : user
        ));
        setEditingUser(null);
        alert('ユーザー情報が更新されました');
      } else {
        alert(data.error || 'ユーザーの更新に失敗しました');
      }
    } catch (err) {
      alert('ネットワークエラーが発生しました');
    }
  };

  // ユーザーを削除
  const deleteUser = async (id: string) => {
    if (!confirm('本当にこのユーザーを削除しますか？')) return;
    
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setUsers(prev => prev.filter(user => user.id !== id));
        alert('ユーザーが削除されました');
      } else {
        alert(data.error || 'ユーザーの削除に失敗しました');
      }
    } catch (err) {
      alert('ネットワークエラーが発生しました');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>読み込み中...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
        エラー: {error}
        <br />
        <button onClick={fetchUsers} style={{ marginTop: '1rem' }}>
          再試行
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>ユーザー管理</h2>
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
          新規ユーザー作成
        </button>
      </div>

      {/* 作成フォーム */}
      {showCreateForm && (
        <CreateUserForm
          onSubmit={createUser}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {/* 編集フォーム */}
      {editingUser && (
        <EditUserForm
          user={editingUser}
          onSubmit={(userData) => updateUser(editingUser.id, userData)}
          onCancel={() => setEditingUser(null)}
        />
      )}

      {/* ユーザー一覧 */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>ID</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>名前</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>メール</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>作成日</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{user.id}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{user.name}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{user.email}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                  {new Date(user.createdAt).toLocaleDateString('ja-JP')}
                </td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                  <button
                    onClick={() => setEditingUser(user)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '0.5rem'
                    }}
                  >
                    編集
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ユーザー作成フォームコンポーネント
function CreateUserForm({ 
  onSubmit, 
  onCancel 
}: { 
  onSubmit: (data: CreateUserRequest) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onSubmit({ name: name.trim(), email: email.trim() });
      setName('');
      setEmail('');
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
      <h3 style={{ margin: '0 0 1rem 0' }}>新規ユーザー作成</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>名前:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>メール:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
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

// ユーザー編集フォームコンポーネント
function EditUserForm({ 
  user, 
  onSubmit, 
  onCancel 
}: { 
  user: User;
  onSubmit: (data: UpdateUserRequest) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updates: UpdateUserRequest = {};
    if (name.trim() !== user.name) updates.name = name.trim();
    if (email.trim() !== user.email) updates.email = email.trim();
    
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
      <h3 style={{ margin: '0 0 1rem 0' }}>ユーザー編集 (ID: {user.id})</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>名前:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>メール:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
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