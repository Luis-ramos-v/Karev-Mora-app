import { memo } from 'react';
import styled, { keyframes } from 'styled-components';
import { PageLayout } from '../components/layout/PageLayout';
import { LinkCard } from '../components/common/LinkCard';
import type { IconName } from '../generated/asset-manifest';

interface Link {
  id: string;
  url: string;
  icon: IconName;
  text: string;
  subtext?: string;
}

const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const links: Link[] = [
  {
    id: "link1",
    url: "https://onlyfans.com/karev.mora",
    icon: "circle-user",
    text: "Onlyfans"
  },
  {
    id: "link2",
    url: "https://onlyfans.com/mora_xxx",
    icon: "crown",
    text: "Onlyfans VIP"
  },
  {
    id: "link3",
    url: "https://www.instagram.com/karevmora",
    icon: "instagram",
    text: "Instagram"
  },
  {
    id: "link4",
    url: "https://x.com/karev_mora",
    icon: "twitter",
    text: "X"
  },
  {
    id: "link5",
    url: "https://www.amazon.com.mx/hz/wishlist/ls/Q3CH9U2XF5LT",
    icon: "gift",
    text: "Amazon Wishlist",
    subtext: "Make me happy"
  },
  {
    id: "link6",
    url: "https://www.paypal.com/donate?hosted_button_id=C2J3HEW2T9GPU",
    icon: "paypal",
    text: "Paypal",
    subtext: "Spoil Me"
  }
];

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.55);
  z-index: ${({ theme }) => theme.zIndex.background};
  pointer-events: none;
`;

const Container = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.container};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding-top: env(safe-area-inset-top, 0);
  padding-bottom: env(safe-area-inset-bottom, 0);
  padding-left: calc(env(safe-area-inset-left, 0) + 10vw);
  padding-right: calc(env(safe-area-inset-right, 0) + 10vw);
  margin-left: calc(env(safe-area-inset-left, 0) + 10vw);
  margin-right: calc(env(safe-area-inset-right, 0) + 10vw);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100vw;
    min-height: 100vh;
    padding: 0 0.5em;
    gap: 12px;
    justify-content: center;
  }
`;

const Header = styled.header`
  margin-top: ${({ theme }) => theme.spacing.headerMargin};
  text-align: center;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 5vh;
  }
`;

const Title = styled.h1`
  font-size: 3.2em;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: ${({ theme }) => theme.shadows.text};
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.title};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.1em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.3em;
  }
`;

const Description = styled.p`
  font-size: 1.6em;
  opacity: 0.95;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.subtitle};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.9em;
  }
`;

const LinksGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.linkGap};
  width: 100%;
  flex: 1 1 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 5vh;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 8px;
  }
`;

export const Links = memo(() => {
  return (
    <PageLayout>
      <BackgroundOverlay />
      <Container>
        <Header>
          <Title>Karev Mora</Title>
          <Description>Welcome to my secret lair</Description>
        </Header>
        <LinksGrid>
          {links.map((link, index) => (
            <LinkCard
              key={link.id}
              url={link.url}
              icon={link.icon}
              text={link.text}
              subtext={link.subtext}
              isExternal
              index={index}
            />
          ))}
        </LinksGrid>
      </Container>
    </PageLayout>
  );
});

Links.displayName = 'Links'; 