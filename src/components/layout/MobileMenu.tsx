import { memo, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from '../common/Button';
import { Icon } from '../common/Icon';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Backdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  animation: ${({ $isOpen }) => ($isOpen ? fadeIn : fadeOut)} 0.3s ease forwards;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const MenuContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: ${({ theme }) => theme.colors.primary};
  border-left: 1px solid ${({ theme }) => theme.colors.secondary}40;
  z-index: 1001;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  animation: ${({ $isOpen }) => ($isOpen ? slideIn : slideOut)} 0.3s ease forwards;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary}40;
  margin-bottom: 1rem;
`;

const MenuTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.accent};
  margin: 0;
`;

const CloseButton = styled(Button)`
  padding: 0.5rem;
  min-width: auto;
`;

const MenuNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const MenuLink = styled(Button)`
  justify-content: flex-start;
  padding: 1rem;
  font-size: 1.125rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary}40;
  }
`;

const MenuFooter = styled.div`
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.secondary}40;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text}80;
  text-align: center;
`;

const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/links', label: 'Links' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
];

export const MobileMenu = memo(({ isOpen, onClose }: MobileMenuProps) => {
  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Close menu when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <Backdrop $isOpen={isOpen} onClick={handleBackdropClick} />
      <MenuContainer $isOpen={isOpen}>
        <MenuHeader>
          <MenuTitle>Menu</MenuTitle>
          <CloseButton variant="ghost" onClick={onClose} leftIcon="close">
            Close
          </CloseButton>
        </MenuHeader>
        <MenuNav>
          {menuItems.map(item => (
            <MenuLink key={item.path} variant="ghost" as="a" href={item.path} onClick={onClose}>
              {item.label}
            </MenuLink>
          ))}
        </MenuNav>
        <MenuFooter>© {new Date().getFullYear()} Karev Mora</MenuFooter>
      </MenuContainer>
    </>
  );
});

MobileMenu.displayName = 'MobileMenu';
