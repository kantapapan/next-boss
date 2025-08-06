'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

/**
 * CSS Modulesを使用したナビゲーションコンポーネント
 * 
 * 特徴:
 * - アクティブ状態の管理
 * - ホバーエフェクト
 * - レスポンシブデザイン
 * - 条件付きクラスの適用
 */

const navigationItems = [
  { href: '/', label: 'ホーム' },
  { href: '/css-modules', label: 'CSS Modules' },
  { href: '/tailwind', label: 'Tailwind CSS' },
  { href: '/styled-components', label: 'Styled Components' },
];

export default function Navigation() {
  // 現在のパスを取得（Next.js 13+ App Router）
  const pathname = usePathname();

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <ul className={styles.list}>
          {navigationItems.map((item) => {
            // アクティブ状態の判定
            const isActive = pathname === item.href;
            
            // 条件付きクラスの組み合わせ
            const linkClasses = [
              styles.link,
              isActive ? styles.active : '',
            ].filter(Boolean).join(' ');

            return (
              <li key={item.href} className={styles.item}>
                <Link href={item.href} className={linkClasses}>
                  {item.label}
                  {/* アクティブインジケーター */}
                  {isActive && <span className={styles.indicator} />}
                </Link>
              </li>
            );
          })}
        </ul>
        
        {/* モバイル用ハンバーガーメニュー（簡易版） */}
        <div className={styles.mobileMenu}>
          <button className={styles.menuButton}>
            <span className={styles.menuIcon}></span>
            <span className={styles.menuIcon}></span>
            <span className={styles.menuIcon}></span>
          </button>
        </div>
      </div>
    </nav>
  );
}