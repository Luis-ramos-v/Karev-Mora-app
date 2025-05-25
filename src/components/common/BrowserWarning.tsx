import { memo, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Icon } from './Icon';
import { detectBrowser, getBrowserWarning } from '../../utils/browserDetection';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const WarningContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.text};
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
  animation: ${({ $isVisible }) => ($isVisible ? slideIn : slideOut)} 0.3s ease-in-out forwards;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const Message = styled.p`
  margin: 0;
  font-size: 0.9em;
  text-align: center;
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity ${({ theme }) => theme.transitions.default};

  &:hover {
    opacity: 1;
  }
`;

export const BrowserWarning = memo(() => {
  const [isVisible, setIsVisible] = useState(true);
  const [warning, setWarning] = useState<string | null>(null);

  useEffect(() => {
    const browserInfo = detectBrowser();
    const warningMessage = getBrowserWarning(browserInfo);
    setWarning(warningMessage);

    // If there's no warning, hide the component
    if (!warningMessage) {
      setIsVisible(false);
    }
  }, []);

  if (!warning) return null;

  return (
    <WarningContainer $isVisible={isVisible}>
      <Icon name="refresh" size={20} />
      <Message>{warning}</Message>
      <CloseButton onClick={() => setIsVisible(false)} aria-label="Close warning">
        <Icon name="close" size={20} />
      </CloseButton>
    </WarningContainer>
  );
});

BrowserWarning.displayName = 'BrowserWarning'; 