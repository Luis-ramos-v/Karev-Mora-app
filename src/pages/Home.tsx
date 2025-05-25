import { memo } from 'react';
import styled from 'styled-components';
import { PageLayout } from '../components/layout/PageLayout';
import { Button } from '../components/common/Button';
import { Icon } from '../components/common/Icon';
import { useImage } from '../utils/assetManager';

const Hero = styled.section`
  text-align: center;
  padding: 4rem 1rem;
  margin: -2rem -2rem 2rem;
  background: ${({ theme }) => theme.colors.primary}40;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary}40;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.text}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text}cc;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.colors.accent};
  box-shadow: 0 0 20px ${({ theme }) => theme.colors.accent}40;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const FeaturedSection = styled.section`
  margin-top: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.accent};
  text-align: center;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeaturedCard = styled.div`
  background: ${({ theme }) => theme.colors.primary}40;
  border: 1px solid ${({ theme }) => theme.colors.secondary}40;
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary}40;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.text}cc;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export const Home = memo(() => {
  const avatar = useImage('avatar');

  return (
    <PageLayout>
      <Hero>
        {avatar && (
          <Avatar>
            <img src={avatar.src} alt="Karev Mora" />
          </Avatar>
        )}
        <Title>Welcome to My Digital Lair</Title>
        <Subtitle>
          Developer, creator, and digital explorer. Building the future one line of code at a time.
        </Subtitle>
        <SocialLinks>
          <Button
            variant="ghost"
            as="a"
            href="https://github.com/karevmora"
            target="_blank"
            rel="noopener noreferrer"
            leftIcon="github"
          >
            GitHub
          </Button>
          <Button
            variant="ghost"
            as="a"
            href="https://twitter.com/karevmora"
            target="_blank"
            rel="noopener noreferrer"
            leftIcon="twitter"
          >
            Twitter
          </Button>
          <Button
            variant="ghost"
            as="a"
            href="https://linkedin.com/in/karevmora"
            target="_blank"
            rel="noopener noreferrer"
            leftIcon="linkedin"
          >
            LinkedIn
          </Button>
        </SocialLinks>
        <Button as="a" href="/links" variant="accent" size="large">
          Explore My Links
        </Button>
      </Hero>

      <FeaturedSection>
        <SectionTitle>Featured Content</SectionTitle>
        <FeaturedGrid>
          <FeaturedCard>
            <CardTitle>Latest Projects</CardTitle>
            <CardDescription>
              Check out my latest coding projects and experiments. From web apps to creative coding,
              there's always something new to explore.
            </CardDescription>
            <Button as="a" href="/projects" variant="secondary">
              View Projects
            </Button>
          </FeaturedCard>

          <FeaturedCard>
            <CardTitle>About Me</CardTitle>
            <CardDescription>
              Learn more about my journey, skills, and what drives me to create amazing digital
              experiences.
            </CardDescription>
            <Button as="a" href="/about" variant="secondary">
              Read More
            </Button>
          </FeaturedCard>

          <FeaturedCard>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>
              Have a project in mind or want to collaborate? I'm always open to new opportunities
              and connections.
            </CardDescription>
            <Button as="a" href="/contact" variant="secondary">
              Contact Me
            </Button>
          </FeaturedCard>
        </FeaturedGrid>
      </FeaturedSection>
    </PageLayout>
  );
});

Home.displayName = 'Home';
