import React from 'react';
import styled from '@emotion/styled';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 16px;
`;

export const PageContainerTestId = 'page-container';
export const GreetingTestId = 'greeting-text';

export default function App() {
  return (
    <PageContainer data-testid={PageContainerTestId}>
      <h1 data-testid={GreetingTestId}>Hello, StarWars!</h1>
    </PageContainer>
  );
}
