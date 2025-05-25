import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import config from '@/config';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.background.primary};
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.secondary};
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.accent : theme.colors.text)};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.md};
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  transition: transform ${({ theme }) => theme.transitions.default};
  z-index: ${({ theme }) => theme.zIndex.dropdown};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
  }
`;

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/" onClick={closeMobileMenu}>
          {config.brand.name}
        </Logo>

        <NavLinks>
          <NavLink to="/" $isActive={location.pathname === '/'}>
            Home
          </NavLink>
          <NavLink to="/links" $isActive={location.pathname === '/links'}>
            Links
          </NavLink>
        </NavLinks>

        <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Nav>

      <MobileMenu $isOpen={isMobileMenuOpen}>
        <NavLink to="/" $isActive={location.pathname === '/'} onClick={closeMobileMenu}>
          Home
        </NavLink>
        <NavLink to="/links" $isActive={location.pathname === '/links'} onClick={closeMobileMenu}>
          Links
        </NavLink>
      </MobileMenu>
    </HeaderContainer>
  );
}
