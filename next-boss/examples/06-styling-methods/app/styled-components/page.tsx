'use client';

import styled, { ThemeProvider, createGlobalStyle, keyframes, css } from 'styled-components';
import { useState } from 'react';

// テーマ定義
const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      600: '#4b5563',
      800: '#1f2937',
      900: '#111827',
    },
    white: '#ffffff',
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
};

// グローバルスタイル
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

// アニメーション定義
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// スタイル付きコンポーネント
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.lg} 0;
  border-bottom: 2px solid ${props => props.theme.colors.gray[200]};
  animation: ${fadeIn} 0.6s ease-out;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.gray[600]};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled.section<{ $delay?: string }>`
  margin-bottom: ${props => props.theme.spacing.xl};
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;
`;

const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: ${props => props.theme.spacing.md};
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray[300]};
`;

// 動的スタイリングボタン
const DynamicButton = styled.button<{ 
  $variant?: 'primary' | 'secondary' | 'danger';
  $size?: 'small' | 'medium' | 'large';
  $isLoading?: boolean;
}>`
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  /* サイズ */
  ${props => {
    switch (props.$size) {
      case 'small':
        return `
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
        `;
      case 'large':
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1.125rem;
        `;
      default:
        return `
          padding: 0.625rem 1rem;
          font-size: 1rem;
        `;
    }
  }}
  
  /* カラー */
  ${props => {
    switch (props.$variant) {
      case 'secondary':
        return `
          background-color: ${props.theme.colors.secondary};
          color: ${props.theme.colors.white};
          &:hover:not(:disabled) {
            background-color: #059669;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          }
        `;
      case 'danger':
        return `
          background-color: ${props.theme.colors.danger};
          color: ${props.theme.colors.white};
          &:hover:not(:disabled) {
            background-color: #dc2626;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
          }
        `;
      default:
        return `
          background-color: ${props.theme.colors.primary};
          color: ${props.theme.colors.white};
          &:hover:not(:disabled) {
            background-color: #2563eb;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          }
        `;
    }
  }}
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.gray[300]};
    color: ${props => props.theme.colors.gray[600]};
    cursor: not-allowed;
  }
  
  ${props => props.$isLoading && css`
    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: ${spin} 1s linear infinite;
    }
  `}
`;

const Card = styled.div<{ $variant?: 'default' | 'highlighted' | 'warning' }>`
  background: ${props => props.theme.colors.white};
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid ${props => props.theme.colors.gray[200]};
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  ${props => {
    switch (props.$variant) {
      case 'highlighted':
        return `
          border-left: 4px solid ${props.theme.colors.secondary};
          background: linear-gradient(135deg, ${props.theme.colors.white} 0%, #f0fdf4 100%);
        `;
      case 'warning':
        return `
          border-left: 4px solid ${props.theme.colors.warning};
          background: linear-gradient(135deg, ${props.theme.colors.white} 0%, #fffbeb 100%);
        `;
      default:
        return '';
    }
  }}
`;

const CardHeader = styled.div`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} 0;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.gray[900]};
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
`;

const CardContent = styled.div`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md} ${props => props.theme.spacing.md};
`;

const CardText = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  margin: 0;
`;

const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const CodeBlock = styled.pre`
  background: ${props => props.theme.colors.gray[900]};
  color: ${props => props.theme.colors.gray[50]};
  padding: ${props => props.theme.spacing.md};
  border-radius: 0.5rem;
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: ${props => props.theme.spacing.sm} 0;
`;

const AnimatedBox = styled.div<{ $isVisible?: boolean }>`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md};
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.$isVisible && css`
    animation: ${pulse} 2s infinite;
  `}
  
  &:hover {
    transform: scale(1.05);
    background: #2563eb;
  }
`;

/**
 * styled-components例のページコンポーネント
 * 
 * styled-componentsの特徴を示します：
 * - CSS-in-JSによる動的スタイリング
 * - テーマシステムの活用
 * - プロップスベースのスタイル変更
 * - アニメーションとキーフレーム
 */
export default function StyledComponentsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Header>
          <Title>styled-components例</Title>
          <Description>
            CSS-in-JSライブラリを使用した動的スタイリングの実装例です。
            JavaScriptの中でCSSを書き、プロップスに基づいて動的にスタイルを変更できます。
          </Description>
        </Header>

        <Section $delay="0.2s">
          <SectionTitle>動的ボタンコンポーネント</SectionTitle>
          <ButtonGroup>
            <DynamicButton $variant="primary" $size="small">
              小さなボタン
            </DynamicButton>
            <DynamicButton $variant="primary" $size="medium">
              中サイズボタン
            </DynamicButton>
            <DynamicButton $variant="primary" $size="large">
              大きなボタン
            </DynamicButton>
          </ButtonGroup>
          <ButtonGroup>
            <DynamicButton $variant="secondary" $size="medium">
              セカンダリボタン
            </DynamicButton>
            <DynamicButton $variant="danger" $size="medium">
              危険なボタン
            </DynamicButton>
            <DynamicButton 
              $variant="primary" 
              $size="medium" 
              $isLoading={isLoading}
              onClick={handleLoadingClick}
            >
              {isLoading ? 'ローディング中...' : 'ローディングテスト'}
            </DynamicButton>
          </ButtonGroup>
        </Section>

        <Section $delay="0.4s">
          <SectionTitle>テーマ対応カード</SectionTitle>
          <Grid>
            <Card $variant="default">
              <CardHeader>
                <CardTitle>基本カード</CardTitle>
              </CardHeader>
              <CardContent>
                <CardText>
                  styled-componentsで作成した基本的なカードです。
                  テーマシステムを活用してスタイリングされています。
                </CardText>
              </CardContent>
            </Card>

            <Card $variant="highlighted">
              <CardHeader>
                <CardTitle>強調カード</CardTitle>
              </CardHeader>
              <CardContent>
                <CardText>
                  プロップスに基づいて異なるスタイルが適用される
                  強調されたカードの例です。
                </CardText>
              </CardContent>
            </Card>

            <Card $variant="warning">
              <CardHeader>
                <CardTitle>警告カード</CardTitle>
              </CardHeader>
              <CardContent>
                <CardText>
                  注意が必要な情報を表示するための
                  警告スタイルのカードです。
                </CardText>
              </CardContent>
            </Card>
          </Grid>
        </Section>

        <Section $delay="0.6s">
          <SectionTitle>アニメーション例</SectionTitle>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <AnimatedBox 
              $isVisible={isAnimated}
              onClick={() => setIsAnimated(!isAnimated)}
            >
              クリックしてアニメーションを切り替え
            </AnimatedBox>
          </div>
        </Section>

        <Section $delay="0.8s">
          <SectionTitle>styled-componentsの特徴</SectionTitle>
          <Grid>
            <Card>
              <CardHeader>
                <CardTitle>CSS-in-JS</CardTitle>
              </CardHeader>
              <CardContent>
                <CardText>
                  JavaScriptの中でCSSを書くことで、
                  動的なスタイリングが簡単に実現できます。
                </CardText>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>テーマシステム</CardTitle>
              </CardHeader>
              <CardContent>
                <CardText>
                  ThemeProviderを使用して、
                  アプリケーション全体で一貫したデザインシステムを構築できます。
                </CardText>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>動的スタイリング</CardTitle>
              </CardHeader>
              <CardContent>
                <CardText>
                  プロップスや状態に基づいて、
                  リアルタイムでスタイルを変更できます。
                </CardText>
              </CardContent>
            </Card>
          </Grid>
        </Section>

        <Section $delay="1s">
          <SectionTitle>実装例</SectionTitle>
          <Card>
            <CardHeader>
              <CardTitle>動的ボタンの実装</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock>
{`const DynamicButton = styled.button<{ 
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}>\`
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  /* プロップスに基づくサイズ変更 */
  \${props => {
    switch (props.size) {
      case 'small':
        return \`padding: 0.5rem 0.75rem; font-size: 0.875rem;\`;
      case 'large':
        return \`padding: 0.75rem 1.5rem; font-size: 1.125rem;\`;
      default:
        return \`padding: 0.625rem 1rem; font-size: 1rem;\`;
    }
  }}
  
  /* プロップスに基づくカラー変更 */
  \${props => {
    switch (props.variant) {
      case 'secondary':
        return \`background-color: \${props.theme.colors.secondary};\`;
      case 'danger':
        return \`background-color: \${props.theme.colors.danger};\`;
      default:
        return \`background-color: \${props.theme.colors.primary};\`;
    }
  }}
\`;`}
              </CodeBlock>
            </CardContent>
          </Card>
        </Section>
      </Container>
    </ThemeProvider>
  );
}