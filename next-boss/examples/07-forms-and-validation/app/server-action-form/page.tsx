import Link from 'next/link';
import { contactFormSchema, safeParseData } from '../../lib/validation';
import { redirect } from 'next/navigation';

/**
 * Server Actionsを使用したフォーム処理
 * 
 * Server Actionsは、Next.js 13.4以降で導入された機能で、
 * サーバーサイドでフォーム処理を行うことができます。
 * 
 * 利点：
 * - JavaScriptが無効でも動作する
 * - SEOに優しい
 * - セキュリティが向上
 * - サーバーサイドでのバリデーションが可能
 */

/**
 * Server Action: フォームデータを処理する関数
 * 
 * この関数はサーバーサイドで実行され、フォームの送信を処理します。
 * 'use server'ディレクティブにより、この関数がServer Actionであることを示します。
 */
async function submitContactForm(formData: FormData) {
  'use server';
  
  // FormDataからオブジェクトに変換
  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
    priority: formData.get('priority') as string,
    attachments: formData.getAll('attachments') as string[]
  };

  // サーバーサイドでのバリデーション
  const validationResult = safeParseData(contactFormSchema, rawData);
  
  if (!validationResult.success) {
    // バリデーションエラーがある場合
    console.error('Validation errors:', validationResult.errors);
    // 実際のアプリケーションでは、エラー情報をクライアントに返す仕組みが必要
    throw new Error('バリデーションエラーが発生しました');
  }

  try {
    // 実際のアプリケーションでは、ここでデータベースへの保存やメール送信を行います
    console.log('Contact form submitted:', validationResult.data);
    
    // 処理の遅延をシミュレート
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 成功後のリダイレクト
    redirect('/server-action-form?success=true');
  } catch (error) {
    console.error('Error processing form:', error);
    throw new Error('フォームの処理中にエラーが発生しました');
  }
}

/**
 * Server Action Form Page Component
 */
export default async function ServerActionFormPage({
  searchParams
}: {
  searchParams: Promise<{ success?: string }>
}) {
  const params = await searchParams;
  const isSuccess = params.success === 'true';

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <Link href="/" style={{ color: '#0066cc', textDecoration: 'none' }}>
            ← 戻る
          </Link>
        </div>

        <h2 style={{ marginTop: 0, color: '#333' }}>Server Actions フォーム</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Next.js Server Actionsを使用したサーバーサイドフォーム処理の例です。
          JavaScriptが無効でも動作し、SEOに優しい実装です。
        </p>

        {isSuccess ? (
          // 成功メッセージ
          <div style={{
            padding: '20px',
            backgroundColor: '#d4edda',
            color: '#155724',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>送信完了</h3>
            <p style={{ margin: 0 }}>
              お問い合わせを受け付けました。ご連絡いただきありがとうございます。
            </p>
          </div>
        ) : (
          // フォーム
          <form action={submitContactForm}>
            {/* 名前入力フィールド */}
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="name"
                style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  fontWeight: 'bold',
                  color: '#333'
                }}
              >
                お名前 <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="山田太郎"
              />
            </div>

            {/* メールアドレス入力フィールド */}
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="email"
                style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  fontWeight: 'bold',
                  color: '#333'
                }}
              >
                メールアドレス <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="example@email.com"
              />
            </div>

            {/* 件名入力フィールド */}
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="subject"
                style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  fontWeight: 'bold',
                  color: '#333'
                }}
              >
                件名 <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="お問い合わせの件名"
              />
            </div>

            {/* 優先度選択フィールド */}
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="priority"
                style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  fontWeight: 'bold',
                  color: '#333'
                }}
              >
                優先度 <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <select
                id="priority"
                name="priority"
                required
                defaultValue="medium"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              >
                <option value="low">低</option>
                <option value="medium">中</option>
                <option value="high">高</option>
              </select>
            </div>

            {/* メッセージ入力フィールド */}
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="message"
                style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  fontWeight: 'bold',
                  color: '#333'
                }}
              >
                メッセージ <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
                placeholder="お問い合わせ内容を詳しくお書きください（10文字以上2000文字以内）"
              />
            </div>

            {/* 送信ボタン */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}

            >
              送信する
            </button>
          </form>
        )}

        {/* Server Actionsの説明 */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          border: '1px solid #e9ecef'
        }}>
          <h4 style={{ marginTop: 0, color: '#333' }}>Server Actionsの特徴:</h4>
          <ul style={{ color: '#666', paddingLeft: '20px', margin: '10px 0' }}>
            <li><strong>プログレッシブエンハンスメント:</strong> JavaScriptが無効でも動作</li>
            <li><strong>サーバーサイド処理:</strong> セキュアなデータ処理</li>
            <li><strong>型安全性:</strong> TypeScriptとの完全な統合</li>
            <li><strong>自動的なCSRF保護:</strong> セキュリティが組み込まれている</li>
            <li><strong>リダイレクト対応:</strong> 処理後の画面遷移が簡単</li>
          </ul>
          
          <h4 style={{ color: '#333', marginBottom: '10px' }}>実装のポイント:</h4>
          <ul style={{ color: '#666', paddingLeft: '20px', margin: 0 }}>
            <li>関数に 'use server' ディレクティブを追加</li>
            <li>FormData を使用してフォームデータを取得</li>
            <li>サーバーサイドでバリデーションを実行</li>
            <li>エラーハンドリングとリダイレクトを適切に処理</li>
          </ul>
        </div>
      </div>
    </div>
  );
}