import React from 'react';
import styled from '@emotion/styled';
import AgLogo from '../components/ag-logo';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 16px;
`;

const LogoContainer = styled.div`
  margin-right: 16px;
`;

const BannerContainer = styled.div`
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const UnderConstructionBanner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #f3c07d;
  color: #6b390b;
  font-size: 14px;
  padding: 0 8px;
`;

const GitHubLink = styled.a`
  color: #6b390b;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  margin: 0 2px;
`;

export const ConstructionBannerTestId = 'construction-banner';
export const GreetingTestId = 'greeting-text';

export default function App() {
  return (
    <PageContainer>
      <UnderConstructionBanner data-testid={ConstructionBannerTestId}>
        <span>
          I am currently in the process of re-writing my portfolio site. In the meantime
          checkout my open source projects on{' '}
          <GitHubLink href="https://github.com/andrewgrewell/open-source">
            <strong>GitHub</strong>
          </GitHubLink>
        </span>
      </UnderConstructionBanner>
      <BannerContainer>
        <LogoContainer>
          <AgLogo />
        </LogoContainer>
        <h2 data-testid={GreetingTestId}>
          Software Engineer /<br /> Designer /<br /> Builder
        </h2>
      </BannerContainer>
    </PageContainer>
  );
}
