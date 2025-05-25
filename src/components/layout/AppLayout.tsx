import { ReactNode } from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { Footer } from './Footer';
import { BackgroundManager } from './BackgroundManager';

interface AppLayoutProps {
  children: ReactNode;
}

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 120px); // Account for header and footer
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: 2;
`;

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <BackgroundManager />
      <Header />
      <Main>
        <Container>{children}</Container>
      </Main>
      <Footer />
    </>
  );
} 