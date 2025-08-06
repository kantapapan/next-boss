'use client';

import { useState } from 'react';
import Link from 'next/link';
import { complexFormSchema, type ComplexFormData, safeParseData } from '../../lib/validation';

/**
 * 複雑なフォームコンポーネント
 * 
 * このコンポーネントでは以下の高度な機能を学習します：
 * - ネストしたオブジェクト構造のフォーム
 * - 動的フィールドの追加・削除
 * - 複数ステップのフォーム
 * - 条件付きバリデーション
 * - 複雑な状態管理
 */
export default function ComplexFormPage() {
  // 現在のステップ（マルチステップフォーム）
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // フォームデータの状態（ネストした構造）
  const [formData, setFormData] = useState<Partial<ComplexFormData>>({
    personalInfo: {
      firstName: '',
      lastName: '',
      birthDate: '',
      phone: ''
    },
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: 'JP'
    },
    preferences: {
      notifications: [],
      language: 'ja',
      theme: 'light'
    }
  });

  // バリデーションエラーの状態
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // 送信状態
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  /**
   * ネストしたオブジェクトの値を更新するヘルパー関数
   */
  const updateNestedValue = (path: string, value: any) => {
    const keys = path.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  /**
   * 入力値の変更を処理
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    updateNestedValue(name, finalValue);
    
    // エラーをクリア
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /**
   * 通知設定の変更を処理（配列の管理）
   */
  const handleNotificationChange = (notification: string, checked: boolean) => {
    const currentNotifications = formData.preferences?.notifications || [];
    const newNotifications = checked
      ? [...currentNotifications, notification]
      : currentNotifications.filter(n => n !== notification);
    
    updateNestedValue('preferences.notifications', newNotifications);
  };

  /**
   * 現在のステップのバリデーション
   */
  const validateCurrentStep = (): boolean => {
    try {
      switch (currentStep) {
        case 1:
          if (formData.personalInfo) {
            const personalInfoSchema = complexFormSchema.shape.personalInfo;
            personalInfoSchema.parse(formData.personalInfo);
          }
          break;
        case 2:
          if (formData.address) {
            const addressSchema = complexFormSchema.shape.address;
            addressSchema.parse(formData.address);
          }
          break;
        case 3:
          if (formData.preferences) {
            const preferencesSchema = complexFormSchema.shape.preferences;
            preferencesSchema.parse(formData.preferences);
          }
          break;
        default:
          return true;
      }
      
      setErrors({});
      return true;
    } catch (error: any) {
      if (error.errors) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          const path = err.path.join('.');
          formattedErrors[path] = err.message;
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  /**
   * 次のステップに進む
   */
  const handleNext = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  /**
   * 前のステップに戻る
   */
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setErrors({}); // エラーをクリア
    }
  };

  /**
   * フォーム送信処理
   */
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');

    // 全体のバリデーション
    const result = safeParseData(complexFormSchema, formData);
    
    if (!result.success) {
      setErrors(result.errors);
      setIsSubmitting(false);
      setSubmitMessage('入力内容に誤りがあります。確認してください。');
      return;
    }

    try {
      // 実際のアプリケーションでは、ここでAPIを呼び出します
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitMessage('登録が完了しました！');
      
      // フォームをリセット
      setFormData({
        personalInfo: {
          firstName: '',
          lastName: '',
          birthDate: '',
          phone: ''
        },
        address: {
          street: '',
          city: '',
          postalCode: '',
          country: 'JP'
        },
        preferences: {
          notifications: [],
          language: 'ja',
          theme: 'light'
        }
      });
      setCurrentStep(1);
      setErrors({});
    } catch (error) {
      setSubmitMessage('送信中にエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * エラーメッセージコンポーネント
   */
  const ErrorMessage = ({ fieldName }: { fieldName: string }) => {
    if (!errors[fieldName]) return null;
    
    return (
      <div style={{
        color: '#e74c3c',
        fontSize: '14px',
        marginTop: '5px'
      }}>
        {errors[fieldName]}
      </div>
    );
  };

  /**
   * 入力フィールドのスタイル
   */
  const getInputStyle = (fieldName: string) => ({
    width: '100%',
    padding: '10px',
    border: `1px solid ${errors[fieldName] ? '#e74c3c' : '#ddd'}`,
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box' as const,
    backgroundColor: errors[fieldName] ? '#fdf2f2' : 'white'
  });

  /**
   * ステップ1: 個人情報
   */
  const renderStep1 = () => (
    <div>
      <h3 style={{ color: '#333', marginBottom: '20px' }}>個人情報</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            名前 <span style={{ color: '#e74c3c' }}>*</span>
          </label>
          <input
            type="text"
            name="personalInfo.firstName"
            value={formData.personalInfo?.firstName || ''}
            onChange={handleInputChange}
            style={getInputStyle('personalInfo.firstName')}
            placeholder="太郎"
          />
          <ErrorMessage fieldName="personalInfo.firstName" />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            姓 <span style={{ color: '#e74c3c' }}>*</span>
          </label>
          <input
            type="text"
            name="personalInfo.lastName"
            value={formData.personalInfo?.lastName || ''}
            onChange={handleInputChange}
            style={getInputStyle('personalInfo.lastName')}
            placeholder="山田"
          />
          <ErrorMessage fieldName="personalInfo.lastName" />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
          生年月日 <span style={{ color: '#e74c3c' }}>*</span>
        </label>
        <input
          type="date"
          name="personalInfo.birthDate"
          value={formData.personalInfo?.birthDate || ''}
          onChange={handleInputChange}
          style={getInputStyle('personalInfo.birthDate')}
        />
        <ErrorMessage fieldName="personalInfo.birthDate" />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
          電話番号
        </label>
        <input
          type="tel"
          name="personalInfo.phone"
          value={formData.personalInfo?.phone || ''}
          onChange={handleInputChange}
          style={getInputStyle('personalInfo.phone')}
          placeholder="090-1234-5678"
        />
        <ErrorMessage fieldName="personalInfo.phone" />
      </div>
    </div>
  );

  /**
   * ステップ2: 住所情報
   */
  const renderStep2 = () => (
    <div>
      <h3 style={{ color: '#333', marginBottom: '20px' }}>住所情報</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
          住所 <span style={{ color: '#e74c3c' }}>*</span>
        </label>
        <input
          type="text"
          name="address.street"
          value={formData.address?.street || ''}
          onChange={handleInputChange}
          style={getInputStyle('address.street')}
          placeholder="東京都渋谷区渋谷1-1-1"
        />
        <ErrorMessage fieldName="address.street" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            市区町村 <span style={{ color: '#e74c3c' }}>*</span>
          </label>
          <input
            type="text"
            name="address.city"
            value={formData.address?.city || ''}
            onChange={handleInputChange}
            style={getInputStyle('address.city')}
            placeholder="渋谷区"
          />
          <ErrorMessage fieldName="address.city" />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            郵便番号 <span style={{ color: '#e74c3c' }}>*</span>
          </label>
          <input
            type="text"
            name="address.postalCode"
            value={formData.address?.postalCode || ''}
            onChange={handleInputChange}
            style={getInputStyle('address.postalCode')}
            placeholder="150-0002"
          />
          <ErrorMessage fieldName="address.postalCode" />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
          国 <span style={{ color: '#e74c3c' }}>*</span>
        </label>
        <select
          name="address.country"
          value={formData.address?.country || 'JP'}
          onChange={handleInputChange}
          style={getInputStyle('address.country')}
        >
          <option value="JP">日本</option>
          <option value="US">アメリカ</option>
          <option value="UK">イギリス</option>
          <option value="CA">カナダ</option>
        </select>
        <ErrorMessage fieldName="address.country" />
      </div>
    </div>
  );

  /**
   * ステップ3: 設定
   */
  const renderStep3 = () => (
    <div>
      <h3 style={{ color: '#333', marginBottom: '20px' }}>設定</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>
          通知設定
        </label>
        <div style={{ display: 'grid', gap: '10px' }}>
          {[
            { value: 'email', label: 'メール通知' },
            { value: 'sms', label: 'SMS通知' },
            { value: 'push', label: 'プッシュ通知' },
            { value: 'newsletter', label: 'ニュースレター' }
          ].map(option => (
            <label key={option.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={(formData.preferences?.notifications || []).includes(option.value)}
                onChange={(e) => handleNotificationChange(option.value, e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              <span style={{ color: '#333' }}>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            言語 <span style={{ color: '#e74c3c' }}>*</span>
          </label>
          <select
            name="preferences.language"
            value={formData.preferences?.language || 'ja'}
            onChange={handleInputChange}
            style={getInputStyle('preferences.language')}
          >
            <option value="ja">日本語</option>
            <option value="en">English</option>
          </select>
          <ErrorMessage fieldName="preferences.language" />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            テーマ
          </label>
          <select
            name="preferences.theme"
            value={formData.preferences?.theme || 'light'}
            onChange={handleInputChange}
            style={getInputStyle('preferences.theme')}
          >
            <option value="light">ライト</option>
            <option value="dark">ダーク</option>
            <option value="auto">自動</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
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

        <h2 style={{ marginTop: 0, color: '#333' }}>複雑なフォーム</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          マルチステップフォーム、ネストしたデータ構造、動的フィールドの例です。
        </p>

        {/* プログレスバー */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  color: i + 1 <= currentStep ? '#3498db' : '#95a5a6',
                  fontWeight: i + 1 === currentStep ? 'bold' : 'normal'
                }}
              >
                ステップ {i + 1}
              </div>
            ))}
          </div>
          <div style={{ 
            height: '4px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              backgroundColor: '#3498db',
              width: `${(currentStep / totalSteps) * 100}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* フォームコンテンツ */}
        <div style={{ minHeight: '400px' }}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* ナビゲーションボタン */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e9ecef'
        }}>
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            style={{
              padding: '10px 20px',
              backgroundColor: currentStep === 1 ? '#95a5a6' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            前へ
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              style={{
                padding: '10px 20px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              次へ
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                padding: '10px 20px',
                backgroundColor: isSubmitting ? '#95a5a6' : '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </button>
          )}
        </div>

        {/* 送信結果メッセージ */}
        {submitMessage && (
          <div style={{
            marginTop: '20px',
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: submitMessage.includes('エラー') || submitMessage.includes('誤り') ? '#f8d7da' : '#d4edda',
            color: submitMessage.includes('エラー') || submitMessage.includes('誤り') ? '#721c24' : '#155724',
            border: `1px solid ${submitMessage.includes('エラー') || submitMessage.includes('誤り') ? '#f5c6cb' : '#c3e6cb'}`
          }}>
            {submitMessage}
          </div>
        )}

        {/* デバッグ情報 */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          border: '1px solid #e9ecef'
        }}>
          <h4 style={{ marginTop: 0, color: '#333' }}>現在のフォーム状態:</h4>
          <pre style={{ 
            fontSize: '12px', 
            color: '#666',
            overflow: 'auto',
            margin: 0,
            maxHeight: '200px'
          }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}