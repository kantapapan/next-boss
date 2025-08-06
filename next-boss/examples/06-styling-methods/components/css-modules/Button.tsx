import styles from './Button.module.css';

/**
 * CSS Modulesを使用したボタンコンポーネント
 * 
 * 特徴:
 * - バリアント（primary, secondary, danger）による見た目の変更
 * - サイズ（small, medium, large）による大きさの変更
 * - 無効状態（disabled）の対応
 * - クラス名の組み合わせによる柔軟なスタイリング
 */

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  onClick 
}: ButtonProps) {
  // 複数のクラスを組み合わせる例
  // CSS Modulesでは、複数のクラスを配列で結合できます
  const buttonClasses = [
    styles.button,           // 基本スタイル
    styles[variant],         // バリアント別スタイル
    styles[size],           // サイズ別スタイル
    disabled ? styles.disabled : '', // 条件付きスタイル
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}