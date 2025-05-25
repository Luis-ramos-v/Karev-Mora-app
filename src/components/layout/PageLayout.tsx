import { memo, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useImage } from '../../utils/assetManager';
import { Button } from '../common/Button';
import { Icon } from '../common/Icon';
import { MobileMenu } from './MobileMenu';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = styled.div<{ $backgroundImage?: string }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${({ $backgroundImage }) => $backgroundImage ? `url(${$backgroundImage})` : 'none'};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.1;
    z-index: -1;
    transition: opacity 0.3s ease;
  }
`;

const Header = styled.header`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary}80;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary}40;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileMenuButton = styled(Button)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Footer = styled.footer`
  padding: 1rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.primary}80;
  backdrop-filter: blur(10px);
  border-top: 1px solid ${({ theme }) => theme.colors.secondary}40;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text}80;
`;

const getBackgroundImage = (pathname: string): string | undefined => {
  switch (pathname) {
    case '/':
      return 'background-default';
    case '/links':
      return 'background-links';
    case '/about':
      return 'background-about';
    case '/projects':
      return 'background-projects';
    case '/contact':
      return 'background-contact';
    default:
      return 'background-default';
  }
};

export const PageLayout = memo(({ children, className }: PageLayoutProps) => {
  const { pathname } = useLocation();
  const backgroundImage = useImage(getBackgroundImage(pathname));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenMobileMenu = () => setIsMobileMenuOpen(true);
  const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <Layout className={className} $backgroundImage={backgroundImage?.src}>
      <Header>
        <Logo>
          <Icon name="logo" size={32} />
          Karev Mora
        </Logo>
        <Nav>
          <Button variant="ghost" as="a" href="/">Home</Button>
          <Button variant="ghost" as="a" href="/links">Links</Button>
          <Button variant="ghost" as="a" href="/about">About</Button>
          <Button variant="ghost" as="a" href="/projects">Projects</Button>
          <Button variant="ghost" as="a" href="/contact">Contact</Button>
        </Nav>
        <MobileMenuButton 
          variant="ghost" 
          leftIcon="menu"
          onClick={handleOpenMobileMenu}
        >
          Menu
        </MobileMenuButton>
      </Header>
      <Main>
        {children}
      </Main>
      <Footer>
        © {new Date().getFullYear()} Karev Mora. All rights reserved.
      </Footer>
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={handleCloseMobileMenu} 
      />
    </Layout>
  );
});

PageLayout.displayName = 'PageLayout'; 